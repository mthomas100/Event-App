import React from 'react'
import { View, Text } from 'react-native'
import tw from 'twrnc';

const Loading = () => {
    return (
		<View style={tw`flex-1 flex justify-center items-center`}>
			<Text>Loading...</Text>
		</View>
    )
}

export default Loading
