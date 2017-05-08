import React, { Component } from 'react'
import { observable, useStrict } from 'mobx';
import { Provider, observer } from 'mobx-react';
import { Text, View } from 'react-native';

import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import RouterIndex from './scenes';
import goodsStore from './stores/goodsStore.js';

useStrict(true);

const stores = { goodsStore }
class App extends Component<any, any> {
    render() {
        return (
            <Provider {...stores}><RouterIndex /></Provider>

        )
    }
}

export default App;