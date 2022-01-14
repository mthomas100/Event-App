import { Button, Text, StyleSheet } from 'react-native'
import React from 'react'
import { decrement, increment } from '../../redux/slices/examples/counter'
import { useReduxDispatch, useReduxSelector } from '../../redux'

const Counter = (): React.ReactElement => {
    const value = useReduxSelector(state => state.counter)
    const dispatch = useReduxDispatch()

    return (
        <>
            <Text style={styles.counterText}>{value}</Text>
            <Button title="increment" onPress={() => dispatch(increment(1))}>
                +1
            </Button>
            <Button title="decrement" onPress={() => dispatch(decrement(1))}>
                -1
            </Button>
        </>
    )
}

const styles = StyleSheet.create({
    counterText : {
        fontSize : 30,
        color: 'white',
    }
})


export default Counter