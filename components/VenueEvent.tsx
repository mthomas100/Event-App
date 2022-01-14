import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Events } from '../types/events'

type EventProps = {
    event: Events;
}

const dateConverter = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toDateString();
}

const VenueEvent:React.FC <EventProps> = ({ event }) => {
    console.log('venue event', event);
    return (
        <View style={styles.wrapperForMargin}>
            <View style={[styles.container]}>
                <Text style={[styles.title]}>{event.title}</Text>
                <Text style={[styles.date]}> 
                {dateConverter(event.datetime_local)}
                </Text>
            </View>
        </View>
    )
}

export default VenueEvent;

const styles = StyleSheet.create({
    wrapperForMargin: {
        marginHorizontal: 20,
        alignSelf: 'stretch',
    },
    container: {
		minWidth: '100%',
        paddingVertical: 20,
		height: 'auto',
		overflow: 'hidden',
        borderBottomWidth: 3,
        borderBottomColor: '#707070',
	},
	title : {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#fff',
        lineHeight: 30,
	},
    date: {
        fontSize: 15,
        color: '#fff',
        marginTop: 10,
    }
})
