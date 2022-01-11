import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Events } from "../types/Events";
import { Performers } from "../types/Performers";
import { Venues } from "../types/Venues";

type useSeatGeekQueryTypes = (
    resource: 'venues' | 'performers' | 'events',
    params : object,
    ) => {
    loading: boolean;
    data: any;
    error: string;
};


const useSeatGeekQuery : useSeatGeekQueryTypes = (resource, params = {}) => {
    const [venues, setVenues] = useState<[] | Venues[]>([]);
    const [performers, setPeformers] = useState<[] | Performers[]>([]);
    const [events, setEvents] = useState<[] | Events[]>([]);

    const [error, setError] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);

    const endPointUrl = 'https://api.seatgeek.com/2';
    const authParams = {
        client_id: `${process.env.REACT_APP_SEATGEEK_CLIENT_ID}`,
        client_secret: `${process.env.REACT_APP_SEATGEEK_CLIENT_SECRET}`,
    }

    useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(`${endPointUrl}/${resource}`, {
					params : {
                        ...authParams,
                        ...params
                    }
				});
                if (resource === 'venues') { setVenues(data.venues)}
                if (resource === 'performers') { setPeformers(data.performers)}
                if (resource === 'events') { setEvents(data.events)}
            } catch (error) {
                setError(error.message);
                console.log(error);
            }
        };
        fetchData();
        setLoading(false);
    },[params]);
    
    return {
        loading,
        data: resource === 'venues' ? venues : resource === 'performers' ? performers : events,
        error,
    }
}

export default useSeatGeekQuery;