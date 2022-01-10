import { StyleSheet, Text, View } from "react-native";
import VenuesList from "../components/Venues";
import VenuesHeader from "../components/VenuesHeader";

export default function VenuesScreen() {
  return (
	  <>
	  <VenuesHeader/>
	  <VenuesList/>
	  </>
  );
}

const styles = StyleSheet.create({

});
