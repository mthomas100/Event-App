import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useReduxDispatch, useReduxSelector } from "../redux";
import { setCityVenues } from "../redux/slices/cityVenues";
import { setVenueEvents } from "../redux/slices/venueEvents";
import { Events } from "../types/events";
import { MetaParams } from "../types/meta";
import { CityVenues, VenueEvents, VenuesData } from "../types/types";
import { getRandomColor } from "../utils/getRandomColor";

export type useSeatGeekQueryTypes = (
    resource: 'venues' | 'performers' | 'events',
    params: {
        [key: string]: any;
    }
    ) => {
    loading: boolean;
    error: AxiosError | null;
    venuesData?: CityVenues;
    eventsData?: VenueEvents;
};

//TODO: If a day has passed between the last time the user visited the app and the current day,
// data from redux store will be cleared, new data will be fetched, and that data will be saved to redux store.
// (Necessary as new events may have changed)

//TODO: Have hook handle data appropriately according to the resource being queried.
// CONSIDER: Separating into separate hooks that use common fetching logic & their own specialized logic. 

const useSeatGeekQuery : useSeatGeekQueryTypes = (resource, params) => {
    const dispatch = useReduxDispatch()

    // Check to see if cityVenues data is in redux store
    const allReduxCityVenues = useReduxSelector(state => state.cityVenues);
    const cityVenuesFromRedux = allReduxCityVenues.find(cityVenue => cityVenue.city === params.city);

    // Check to see if venueEvents data is in redux store
    const allReduxVenueEvents = useReduxSelector(state => state.venueEvents);
    const venueEventsFromRedux = allReduxVenueEvents.find(venueEvent => venueEvent.venueId === params['venue.id']);

    
    
    const [venuesData, setVenuesData ] = useState<CityVenues>({} as CityVenues);
    const [eventsData, setEventsData] = useState<VenueEvents>({} as VenueEvents);
    const [error, setError] = useState<AxiosError | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
    

    const endPointUrl = 'https://api.seatgeek.com/2';
    const authParams = {
        client_id: `${process.env.REACT_APP_SEATGEEK_CLIENT_ID}`,
        client_secret: `${process.env.REACT_APP_SEATGEEK_CLIENT_SECRET}`,
    }

    const fetchData = async (metaParams = {} as MetaParams) => {
        const res = await axios.get(`${endPointUrl}/${resource}`, {
            params : {
                ...authParams,
                ...metaParams,
                ...params
            }
        });
        return res;
    }

    useEffect( () => {
        let totalPages : number; 
        const fetchAllData = async () => {
            let skipFetch = false;

            // DETERMINE IF DATA IS IN REDUX STORE. IF IT IS, SET skipFetch TO TRUE
            switch (resource) {
                case 'venues':
                    if (cityVenuesFromRedux) {
                        setVenuesData(cityVenuesFromRedux);
                        skipFetch = true;
                    }
                    break;
                case 'performers':
                    break;
                case 'events':
                    if (venueEventsFromRedux) {
                        setEventsData(venueEventsFromRedux);
                        skipFetch = true;
                    }
                    break;
                default:
                    throw new Error('Invalid resource');
            } 

            try {
                if (skipFetch) {
                // IF DATA IS IN REDUX STORE, DON'T FETCH DATA
                    console.log('skipping fetch', resource);
                    return
                } else {
                // IF DATA IS NOT IN REDUX STORE, FETCH IT + SET DATA TO REDUX STORE + SET DATA STATE
                const res = await fetchData()
                .then (res => {
                    // Get totalpages by first by obtaining meta data value of total results and dividing by results per page (and rounding up)
                    const totalResults = res.data.meta.total;
                    totalPages = Math.ceil(totalResults / res.data.meta.per_page);
                });
                // Get data for all pages and combine into one array
                const allData = await Promise.all(
                    Array.from({ length: totalPages }, (_, i) => fetchData({ page: i + 1 }))
                );
                // Get the resource data from each page and combine into one array
                const allDataFlattened = allData.reduce((acc, item) => [...acc, ...item.data[resource]], [] as any[]);

                // handle data according to resource type
                switch (resource) {
                    case 'venues':
                        const cityVenuesWithBackground = allDataFlattened.map((venue : VenuesData) => {
                            return {
                                ...venue,
                                backgroundColor: getRandomColor(0.5)
                            }
                        })
                        const newCityVenues = {city : params.city, venues : cityVenuesWithBackground as VenuesData[]};
                        setVenuesData(newCityVenues);
                        dispatch(setCityVenues(newCityVenues));
                        break;
                    // case 'performers':
                    //     break; 
                    case 'events':
                        const newVenueEvents = {venueId: params["venue.id"], events: allDataFlattened as Events[]};
                        setEventsData(newVenueEvents);
                        dispatch(setVenueEvents(newVenueEvents));
                        break;
                    default:
                        throw new Error('Invalid resource type');
                }
            }
            } catch (err) {
                console.error(err);
                const error = err as AxiosError;
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchAllData();
    },[params]); // When city changes (which is a param), trigger effect

    return {
        loading,
        error,
        venuesData,
        eventsData
    }
}

export default useSeatGeekQuery;