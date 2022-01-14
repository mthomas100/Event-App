import { AxiosError } from 'axios'
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import tw from 'twrnc'

type ErrorProps = {
    error: AxiosError;
}

const Error: React.FC <ErrorProps> = ({error}) => {
    console.log('Error', error.message);
    return (
		<View style={styles.container}>
            <Text style={[styles.textStyles, tw`font-bold`]}>Error</Text>
			<Text style={styles.textStyles}>{error.message}</Text>
		</View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
        padding: 25,
    },
    textStyles : {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 10
    }
})


export default Error
