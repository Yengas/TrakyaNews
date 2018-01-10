import React from 'react';
import { StackNavigator } from 'react-navigation';
import ListingPage from './src/components/ListingPage';

const Router = StackNavigator({
  Listing: { screen: ListingPage }
});

export default Router;
