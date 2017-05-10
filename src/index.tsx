import React, { Component } from 'react'
import { observable, useStrict } from 'mobx';
import { Provider, observer } from 'mobx-react';
import { Text, View } from 'react-native';

import { StackNavigator, TabNavigator, DrawerNavigator } from 'react-navigation';
import ScenesIndex from './scenes';
import goodsStore from './stores/goodsStore';
import fruitlistStore from './stores/fruitlistStore';

useStrict(true);

const stores = {
    goodsStore,
    fruitlistStore
}
class App extends Component<any, any> {
    render() {
        return (
            <Provider {...stores}><ScenesIndex /></Provider>

        )
    }
}

export default App;