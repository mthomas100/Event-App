import React, { useMemo } from 'react'
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
    console.log('VenueEventsList venue', venue);

    const eventsParams = useMemo(() => ({
        "venue.id": venue.id,
    }) , [venue]) as EventsParams;

    const {eventsData, error, loading } = useSeatGeekQuery('events', eventsParams);
    console.log({
        eventsData,
        error,
        loading,
    });

    if (loading) return <Loading />;
    if (error) return <Error message={error.message} />

    return (
        <FlatList
            data={eventsData?.events}
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
