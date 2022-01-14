import React from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import useSeatGeekQuery from '../hooks/useSeatGeekQuery';
import { Events, EventsParams } from '../types/events';
import { VenuesData } from '../types/types';
import Error from './Error';
import Loading from './Loading';
import VenueEvent from './VenueEvent';

type VenueEventsListProps = {
    venue: VenuesData;
}

const VenueEventsList:React.FC<VenueEventsListProps> = ({ venue }) => {

    const eventsParams : EventsParams = {
        "venue.id": venue.id,
    };
    const {data, error, loading } = useSeatGeekQuery('events', eventsParams, []) as ReturnType<typeof useSeatGeekQuery> & {data: Events[]};
    if (loading) return <Loading />;
    if (error) return <Error error={error} />

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            // onEndReached={() => setPage(page + 1)}
            // onEndReachedThreshold={0.5}
            renderItem={({ item : event }) => (
                <ScrollView>
                <TouchableOpacity 
                // onPress={() => handleVenuePress(venue)}
                >
                    <VenueEvent event={event} />      
                </TouchableOpacity>
                </ScrollView>
            )}
		/>
    )
}

export default VenueEventsList
