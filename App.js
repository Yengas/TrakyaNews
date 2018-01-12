import React, { Component } from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { Provider } from 'react-redux';
import epics from './src/epics';
import reducers from './src/reducers';
import Router from './Router';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default class App extends Component<{}> {
  render() {
    const initialState = {
      news: {
        loading: false,
        items: {
          'h-tubit-gururla-sundu--bilisim-ve-kariyer-gunleri-2017': { thumb: 'tubit-gururla-sundu--bilisim-ve-kariyer-gunleri-2017', href: 'http://kycubyo.trakya.edu.tr/news/tubit-gururla-sundu--bilisim-ve-kariyer-gunleri-2017', title: 'TÜBİT Gururla Sundu. Bilişim ve Kariyer Günleri 2017', date: '21.12.2017', id: 'h-tubit-gururla-sundu--bilisim-ve-kariyer-gunleri-2017' }
        }
      },
      notices: {
        loading: false,
        items: {
          'd-yemek-yardimi-hakkinda': { thumb: 'yemek-yardimi-hakkinda', href: 'http://kycubyo.trakya.edu.tr/news/yemek-yardimi-hakkinda', title: 'YEMEK YARDIMI HAKKINDA', date: '01.02.2017', id: 'd-yemek-yardimi-hakkinda' },
        }
      },
      listing: { page: 1 }
    };
    const epicMiddleware = createEpicMiddleware(epics);
    const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(epicMiddleware)));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
