import React from 'react';
import { AppRegistry, AsyncStorage } from 'react-native';
import {createLogger} from 'redux-logger';
import dva from 'dva/mobile';
// import { persistStore, autoRehydrate } from 'redux-persist';

import { registerModels } from './models'
import Router from './scenes'

const app = dva({
    initialState: {},
    // extraEnhancers: [autoRehydrate()],
    onError(e) {
        console.log('onError', e)
    },
    onAction: createLogger({collapsed:true}),

})
registerModels(app)
app.router(() => <Router />)
const App = app.start()


// persistStore(app._store, { storage: AsyncStorage })

// AppRegistry.registerComponent('DvaStarter', () => App)
export default App;