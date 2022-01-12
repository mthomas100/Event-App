import { Route, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationOptions, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { RootStackParamList } from '../types/types';

type VenueScreenProps = {
    route: RouteProp<RootStackParamList, 'Venue'>;
};

const VenueScreen: React.FC<VenueScreenProps> = ({ route }) => {
    
    return (
        <View style={styles.container}>
            <Text>VENUE SCREEN</Text>
        </View>
    )
}

export default VenueScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : 'pink',
    }
})
