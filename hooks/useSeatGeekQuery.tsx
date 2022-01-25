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
};

const PER_PAGE_AMOUNT = 100;


const useSeatGeekQuery : useSeatGeekQueryTypes = (resource, params) => {
    const [data, setData] = useState<unknown[]>([]);
    const [error, setError] = useState<AxiosError | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

    // query pagination
    const [totalPages, setTotalPages] = useState<number | undefined>();

    // useEffect triggers on every change to params
    const [ effectTrigger, setEffectTrigger ] = useState<boolean>(true);

    const endPointUrl = 'https://api.seatgeek.com/2';
    const authParams = {
        client_id: `${process.env.REACT_APP_SEATGEEK_CLIENT_ID}`,
        client_secret: `${process.env.REACT_APP_SEATGEEK_CLIENT_SECRET}`,
    }
    
    const metaParams = {
        per_page: PER_PAGE_AMOUNT,
    } as Meta;

    const queryData = async (params : Object, metaParams : MetaParams) => {
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
        console.log('useSeatGeekQuery useEffect PARAMS dep');
        setTotalPages(undefined);
		const fetchMetaData = async () => {
            try {
            const res = await queryData(params, metaParams as MetaParams) as { meta: Meta };
            console.log('res', res);
            setTotalPages(Math.ceil(res.meta.total / res.meta.per_page));
            // console.log('about to trigger effect', effectTrigger);
            setEffectTrigger(prev => !prev);
            } catch {
                console.log('fetchMetaData error');
            }
        };
        fetchMetaData();
    },[params]);

    useEffect(() => {
        // console.log('effect triggered', effectTrigger);
        console.log('useSeatGeekQuery useEffect PARAMS TOTALPAGES dep 2', totalPages);
    },[params, totalPages]);

    useEffect(() => {
        // console.log('useEffect fetchData', {totalPages});
        // if (totalPages) {
        //     const fetchData = async () => {
        //         try {
        //             (async function fetchAllData() {
        //                 if (currentPage <= totalPages) {
        //                     console.log(`fetching page ${currentPage} of ${totalPages}`);
        //                     const result = await queryData(metaParams as MetaParams);
        //                     const resourceResult = result[resource] as unknown[];
        //                     setData(data => [...data, ...resourceResult]);
        //                     setCurrentPage(prev => prev + 1);
        //                 }
        //             }());
        //             console.log('data', data);
        //         } catch (error) {
        //             const err = error as AxiosError;
        //             setError(err);
        //             console.error(err);
        //         }
        //         // setData(data);
        //         // setLoading(false);
        //     };
        //     fetchData();
        // }
    },[params]);


    // useEffect(() => {
	// 	const fetchData = async () => {
	// 		try { 
    //             const { meta } = await queryData(metaParams as MetaParams) as { meta: Meta };
    //             setTotalPages(Math.ceil(meta.total / meta.per_page));
                
    //             // (async function fetchAllData () {
    //             //     if (currentPage <= totalPages) {
    //             //         console.log(`Fetching page ${currentPage} of ${totalPages}`);
    //             //         const result = await queryData(metaParams as MetaParams) as { data: unknown[] };
    //             //         const resultResource = result[resource] as unknown[];
    //             //         setData(prev => [...prev, ...resultResource]);
    //             //         setCurrentPage(prev => prev + 1);
    //             //         fetchAllData();
    //             //     }
    //             // }());

    //             // await queryData();
    //             // setCurrentPage(currentPage + 1);
    //             // await queryData();

    //             // console.log('metaData', data.meta);
    //             // console.log('per_page', PER_PAGE_AMOUNT);
    //             // console.log('pages', Math.ceil(data.meta.total / PER_PAGE_AMOUNT));
                

    //             // setData(data[resource]);
    //             // setMetaData(data.meta);
    //         } catch (error) {
    //             // TODO: check if error is AxiosError, then handle
    //             const err = error as AxiosError;
    //             setError(err);
    //             console.log(err);
    //         } finally {
    //             setLoading(false);
                
    //         }
    //     };
    //     fetchData();
    //     console.log('data all fetched', data);
    // },[params]);

    // useEffect(() => {
    //     console.log(totalPages);
    // }, [totalPages]);
    
    return {
        loading,
        error,
        data,
    }
}

export default useSeatGeekQuery;