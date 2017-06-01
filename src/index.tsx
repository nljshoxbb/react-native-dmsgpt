import React from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import {createLogger} from 'redux-logger';
import dva from 'dva/mobile';

import { registerModels } from './models'
import Router from './scenes'

const app = dva({
    initialState: {},
    onError(e) {
        console.error('onError', e)
    },
    onAction: createLogger({collapsed:true}),

})
registerModels(app)
app.router(() => <Router />)
const App = app.start()

export default App;