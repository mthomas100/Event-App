import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import VenuesList from "../components/VenuesList";
import VenuesHeader from "../components/VenuesHeader";
import { RootStackParamList } from "../types/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type VenuesScreenProps = {
	  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const VenuesScreen: React.FC <VenuesScreenProps> = ({ navigation }) => {

	const [city, setCity] = useState('Savannah');

	useEffect(() => {
		console.log({ 'VenuesScreen': city });
	},[city])

	return (
		<>
		<VenuesHeader city={city} setCity={setCity} />
		<Button
        title="Go to Venue Screen"
        onPress={() => navigation.navigate('Venue', { testParamKey: 'testParamValue' })}
      	/>
		<VenuesList city={city}/>
		</>
	);
}

export default VenuesScreen;