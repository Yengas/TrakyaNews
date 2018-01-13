import React from 'react';
import { StackNavigator } from 'react-navigation';
import ListingPage from './src/components/ListingPage';
import DetailPage from './src/components/DetailPage';

const Router = StackNavigator({
  Listing: { screen: ListingPage, navigationOptions: () => ({ title: 'Listing'}) },
  Detail: { screen: DetailPage, navigationOptions: () => ({ title: 'Details'}) },
});

export default Router;
