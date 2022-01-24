import { AntDesign as Icon } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { StyleSheet } from 'react-native'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import VenueScreen from '../screens/VenueScreen'
import VenuesScreen from '../screens/VenuesScreen'
import { RootTabParamList, VenuesParamList } from '../types/types';

const BottomTab = createBottomTabNavigator<RootTabParamList>()

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme()
  return (
    <BottomTab.Navigator
      initialRouteName="VenuesTab"
      screenOptions={{ tabBarActiveTintColor: Colors[colorScheme].tint, headerShown: false }}
    >
      <BottomTab.Screen
        name="VenuesTab"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  )
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Icon>['name']; color: string }) {
  return <Icon size={25} style={styles.tabBarIcon} {...props} />
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const VenuesStack = createStackNavigator<VenuesParamList>()

function TabOneNavigator() {
  return (
    <VenuesStack.Navigator>
      <VenuesStack.Group
        screenOptions={{
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: Colors.light.white,
        }}
      >
        <VenuesStack.Screen
          name="Venues"
          component={VenuesScreen}
          options={{
            headerTitle: 'Home',
          }}
        />
        <VenuesStack.Screen
          name="Venue"
          component={VenueScreen}
          options={{
            headerBackTitle: 'Back',
            headerTitle: 'Play',
          }}
        />
      </VenuesStack.Group>
    </VenuesStack.Navigator>
  )
}


const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: '600',
    color: Colors.light.white,
    fontSize: 16,
  },
  header: {
    backgroundColor: Colors.light.primary,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
})
