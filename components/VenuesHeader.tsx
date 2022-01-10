import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import tw from 'twrnc';


export default function VenuesHeader() {
    return (
		<View style={[styles.header, tw`bg-red-500`]}>
			<Text style={tw`text-xl text-gray-100 font-bold`}>Venues</Text>
		</View>
    )
}

const styles = StyleSheet.create({
	header : {
		padding: 10,
		color: '#fff',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
