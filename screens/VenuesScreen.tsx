import { useState } from "react";
import VenuesList from "../components/VenuesList";
import VenuesHeader from "../components/VenuesHeader";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";

type VenuesScreenProps = {
	navigation: NativeStackNavigationProp<RootStackParamList>;
}

const VenuesScreen:React.FC<VenuesScreenProps> = ({ navigation }) => {

	const [city, setCity] = useState('Atlanta');

	return (
		<>
		<VenuesHeader city={city} setCity={setCity} />
		<VenuesList city={city} navigation={navigation}/>
		</>
	);
}

export default VenuesScreen;