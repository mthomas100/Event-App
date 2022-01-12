import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import tw from 'twrnc'
import Icon from 'react-native-vector-icons/MaterialIcons'

type VenuesHeaderProps = {
    setCity: (city: string) => void
    city: string
}

const VenuesHeader:React.FC<VenuesHeaderProps> = ({ setCity, city }) => {
    const [isEditingCity, setIsEditingCity] = useState(false)

    const handleSubmitEditing = (city : string) => {
        setIsEditingCity(false)
        setCity(city)
    }

    useEffect(() => {
        // console.log({isEditingCity})
    }, [isEditingCity])
    return (
        <TouchableOpacity
        onPress={() => setIsEditingCity(prev => !prev)}
        activeOpacity={0.8}
        >
		<View style={[styles.header, tw`bg-indigo-900`]}>
            <View style={styles.cityContainer}>
            {!isEditingCity ? (
            <>
                <Text style={styles.text}>{city}</Text>
                <Icon
                    name="keyboard-arrow-down"
                    size={24}
                    color="white"
                />
            </>
            ) : (
                <TextInput
                    style={styles.textInput}
                    placeholder="Type name of city here"
                    onSubmitEditing={text => handleSubmitEditing(text.nativeEvent.text)}
                    defaultValue={''}
                />
            )}
            </View>
		</View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
	header : {
        width: '100%',
        height: 100,
        position: 'relative',
	},
    cityContainer : {
        top: 55,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',

    },
    textInput: {
        height: 50,
        borderRadius: 10,
        paddingHorizontal: 10,
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        bottom: 12,
    },
});

export default VenuesHeader;