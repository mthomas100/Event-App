import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Meta } from "../types/meta";
import { VenuesData } from "../types/types";

export type useSeatGeekQueryTypes = (
    resource: 'venues' | 'performers' | 'events',
    params : object,
    effectDeps?: any[],
    ) => {
    loading: boolean;
    error: AxiosError | null;
    data: unknown;
    metaData : Meta;
};


const useSeatGeekQuery : useSeatGeekQueryTypes = (resource, params = {}, effectDeps = []) => {
    console.log('useSeatGeekQuery', resource, params);
    const [data, setData] = useState<unknown[]>([]);
    const [metaData, setMetaData] = useState<Meta>({} as Meta);
    const [error, setError] = useState<AxiosError | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

    const endPointUrl = 'https://api.seatgeek.com/2';
    const authParams = {
        client_id: `${process.env.REACT_APP_SEATGEEK_CLIENT_ID}`,
        client_secret: `${process.env.REACT_APP_SEATGEEK_CLIENT_SECRET}`,
    }

    useEffect(() => {
        console.log('useSeatGeekQuery useEffect', resource, params);
		const fetchData = async () => {
			try { 
				const { data } = await axios.get(`${endPointUrl}/${resource}`, {
					params : {
                        ...authParams,
                        ...params
                    }
				});

                setData(data[resource]);
                setMetaData(data.meta);
            } catch (error) {
                // TODO: check if error is AxiosError, then handle
                const err = error as AxiosError;
                setError(err);
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    },[...effectDeps]);

    // useEffect(() => {
    //     const incomingData = [] as VenuesData[];
    //     if (resource === 'venues') {
    //         const venuesWithEvents = incomingData.filter(venue => venue.has_upcoming_events === true);
    //         setData(venuesWithEvents);
    //     }
    // }, [data]);
    
    return {
        loading,
        error,
        data,
        metaData
    }
}

export default useSeatGeekQuery;