import { createAction, NavigationActions } from '../utils'
import {
    login
} from '../services/user';
import { Toast } from 'antd-mobile';

import { AsyncStorage } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';
import { APP_AUTH_KEY } from '../configs/storage.js';


// const APP_AUTH = '@User:App_auth';


import { multiConnect, multiSet, multiRemove } from '../configs/storage.js';
const watcher = fn => [fn, { type: 'watcher' }];
export default {
    namespace: 'purchase',
    state: {

    },
    reducers: {
        loginStart(state, { payload }) {
            return { ...state, ...payload }
        },
        setInputValue(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        *init({ payload }, { call, put, select }) {
            
        }
    },
    subscriptions: {
        setup({ dispatch }) {

        },
    },
}
