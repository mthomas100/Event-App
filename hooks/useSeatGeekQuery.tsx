import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useReduxDispatch, useReduxSelector } from "../redux";
import { setCityVenues } from "../redux/slices/cityVenues";
import { MetaParams } from "../types/meta";
import { Venues } from "../types/venues";

export type useSeatGeekQueryTypes = (
    resource: 'venues' | 'performers' | 'events',
    params: {
        [key: string]: any;
    },
    ) => {
    loading: boolean;
    error: AxiosError | null;
    data: unknown;
};

const useSeatGeekQuery : useSeatGeekQueryTypes = (resource, params) => {
    const dispatch = useReduxDispatch()
    // const value = useReduxSelector(state => state.)

    const [data, setData] = useState<unknown[]>([]);
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
            // Get totalpages by first by obtaining meta data value of total results and dividing by results per page (and rounding up)
            try {
            const res = await fetchData()
            .then (res => {
                const totalResults = res.data.meta.total;
                totalPages = Math.ceil(totalResults / res.data.meta.per_page);
            });
            // Get data for all pages and combine into one array
            const allData = await Promise.all(
                Array.from({ length: totalPages }, (_, i) => fetchData({ page: i + 1 }))
            );
            // Get the resource data from each page and combine into one array
            const allDataFlattened = allData.reduce((acc, item) => [...acc, ...item.data[resource]], [] as unknown[]);
            // Set the data state
            setData(allDataFlattened);

            // If resource is venues....
            dispatch(setCityVenues({city : params.city, venues : allDataFlattened as Venues[]}));

            // If resource is events....
            
            // If resource is performers....
            } catch (err) {
                const error = err as AxiosError;
                setError(error);
            } finally {
                setLoading(false);
            }
        }
        fetchAllData();
    },[params]); // When city changes (which is a param), trigger effect

    // When new data is fetched, add data to redux store
    useEffect(() => {

    },[]);


    return {
        loading,
        error,
        data,
    }
}

export default useSeatGeekQuery;