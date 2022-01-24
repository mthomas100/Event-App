import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import VenueScreen from '../screens/VenueScreen'
import BottomTabNavigator from './BottomTabNavigator'

type NO_PARAMS = undefined

type MainStackParamList = {
  Main: NO_PARAMS
  // CompletedScreen: NO_PARAMS
}

const Stack = createStackNavigator<MainStackParamList>()

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={BottomTabNavigator} />
    </Stack.Navigator>
  )
}