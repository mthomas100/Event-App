import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import VenuesList from "../components/VenuesList";
import VenuesHeader from "../components/VenuesHeader";

export default function VenuesScreen() {

	const [city, setCity] = useState('Savannah');

	return (
		<>
		<VenuesHeader city={city} setCity={setCity} />
		<VenuesList city={city}/>
		</>
	);
}
