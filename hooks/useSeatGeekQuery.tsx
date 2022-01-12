import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export type useSeatGeekQueryTypes = (
    resource: 'venues' | 'performers' | 'events',
    params : object,
    effectDeps?: any[],
    ) => {
    loading: boolean;
    error: string;
    data: unknown;
};


const useSeatGeekQuery : useSeatGeekQueryTypes = (resource, params = {}, effectDeps = []) => {
    console.log('useSeatGeekQuery', resource, params);
    const [data, setData] = useState<unknown[]>([]);
    const [error, setError] = useState<string>('');
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
            } catch (error) {
                setError(error.message);
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    },[...effectDeps]);
    
    return {
        loading,
        error,
        data
    }
}

export default useSeatGeekQuery;