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
    const initialState = {};
    const epicMiddleware = createEpicMiddleware(epics);
    const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(epicMiddleware)));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}
