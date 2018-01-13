import React from 'react';
import { StackNavigator } from 'react-navigation';
import ListingPage from './src/components/ListingPage';
import DetailPage from './src/components/DetailPage';

const Router = StackNavigator({
  Detail: { screen: DetailPage },
  Listing: { screen: ListingPage },
});

export default Router;
