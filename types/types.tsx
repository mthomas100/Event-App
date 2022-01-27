/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Venues } from './venues';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// GENERAL SCREENS

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

// TABS
export type RootTabParamList = {
  VenuesTab: undefined;
};

// VENUES STACK AKA TabOneNavigator

export type VenuesParamList = {
  Venues : undefined;
  Venue: {
    venueId: number;
    city: string;
  };
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;

//CUSTOM PROP TYPES

export type VenuesData = Venues & {backgroundColor : string};


// OTHER

export type CityVenues = {
  city: string,
  venues: VenuesData[]
}