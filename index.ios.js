/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import App from './build/index.js';
export default class ReactNativeDurian extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <App></App>
      </View>
        

    );
  }
}

AppRegistry.registerComponent('ReactNativeDurian', () => ReactNativeDurian);
