import React, {Component} from 'react';
import firebase from 'react-native-firebase';
import MainNavigation from './App/navigation/MainNavigation';

import {Provider} from 'react-redux';
import {store} from './App/redux/AppRedux';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      database: [],
      filteredData: [],
      displayCategory: '',
      currentUser: null,
    };
  }

  render() {
    return (
      <Provider store={store}>
        {/* <AppProvider> */}
        <MainNavigation />
        {/* </AppProvider> */}
      </Provider>
    );
  }
}
