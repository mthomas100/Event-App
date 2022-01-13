import { RouteProp } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import VenueNameWithBackground from '../components/common/VenueNameWithBackground';
import { RootStackParamList } from '../types/types';

type VenueScreenProps = {
    route: RouteProp<RootStackParamList, 'Venue'>;
};

const VenueScreen: React.FC<VenueScreenProps> = ({ route }) => {
    //TODO: Configure redux in order to get venue data from venues list upon click
    // OR set up API call to https://api.seatgeek.com/2/venues/:id
    // VenueNameWithBackground commented out until this data can be retrieved
    // Must Take into acocunt that the background color property was generated within the app 
    
    return (
        <View style={styles.container}>
            {/* <VenueNameWithBackground venue={venue} /> */}
            <Text style={styles.textStyles}>Venue Screen</Text>
            <Text style={styles.textStyles}>Venue ID: {route.params?.venueId}</Text>
            <Text style={[styles.textStyles, {fontSize: 12}]}>Retrieve venue data using above ID</Text>
        </View>
    )
}

export default VenueScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'flex-start',
        alignItems : 'center',
        paddingTop: 40,
        // backgroundColor : 'pink',
    },
    textStyles : {
        color: 'white',
        fontSize: 20,
        paddingTop: 10,
    }
})
