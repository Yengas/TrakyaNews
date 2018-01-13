import React from 'react';
import { StackNavigator } from 'react-navigation';
import ListingPage from './src/components/ListingPage';
import DetailPage from './src/components/DetailPage';

const Router = StackNavigator({
  Listing: { screen: ListingPage },
  Detail: { screen: DetailPage },
});

export default Router;
