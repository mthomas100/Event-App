import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Meta, MetaParams } from "../types/meta";
import { VenuesData } from "../types/types";

export type useSeatGeekQueryTypes = (
    resource: 'venues' | 'performers' | 'events',
    params: Object,
    ) => {
    loading: boolean;
    error: AxiosError | null;
    data: unknown;
    metaData : Meta;
};

const PER_PAGE_AMOUNT = 100;


const useSeatGeekQuery : useSeatGeekQueryTypes = (resource, params) => {
    const [data, setData] = useState<unknown[]>([]);
    const [metaData, setMetaData] = useState<Meta>({} as Meta);
    const [error, setError] = useState<AxiosError | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

    // query pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);


    const endPointUrl = 'https://api.seatgeek.com/2';
    const authParams = {
        client_id: `${process.env.REACT_APP_SEATGEEK_CLIENT_ID}`,
        client_secret: `${process.env.REACT_APP_SEATGEEK_CLIENT_SECRET}`,
    }
    const metaParams = {
        per_page: PER_PAGE_AMOUNT,
        page: currentPage
    } as Meta;

    const queryData = async (metaParams : MetaParams) => {
        const { data } = await axios.get(`${endPointUrl}/${resource}`, {
            params : {
                ...authParams,
                ...metaParams,
                ...params
            }
        });
        return data;
    }

    useEffect(() => {
		const fetchData = async () => {
			try { 
                const { meta } = await queryData(metaParams as MetaParams) as { meta: Meta };
                setTotalPages(Math.ceil(meta.total / meta.per_page));
                
                // (async function fetchAllData () {
                //     if (currentPage <= totalPages) {
                //         console.log(`Fetching page ${currentPage} of ${totalPages}`);
                //         const result = await queryData(metaParams as MetaParams) as { data: unknown[] };
                //         const resultResource = result[resource] as unknown[];
                //         setData(prev => [...prev, ...resultResource]);
                //         setCurrentPage(prev => prev + 1);
                //         fetchAllData();
                //     }
                // }());

                // await queryData();
                // setCurrentPage(currentPage + 1);
                // await queryData();

                // console.log('metaData', data.meta);
                // console.log('per_page', PER_PAGE_AMOUNT);
                // console.log('pages', Math.ceil(data.meta.total / PER_PAGE_AMOUNT));
                

                // setData(data[resource]);
                // setMetaData(data.meta);
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
        console.log('data all fetched', data);
    },[params]);

    useEffect(() => {
        console.log(totalPages);
    }, [totalPages])

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