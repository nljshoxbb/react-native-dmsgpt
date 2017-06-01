import { createAction, NavigationActions } from '../utils'
import {
    login
} from '../services/user';
import { Toast } from 'antd-mobile';

import { AsyncStorage } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';
const IMG_LIST_KEY = '@Goodstore:imglist';
const SCROLL_LIST_KEY = '@Goodstore:scrollList';
const RECOMMEND_LIST_KEY = '@Goodstore:recommendList';
const NATIONAL_LIST_KEY = '@Goodstore:nationalList';
const COUNTRY_FRUIT_LIST_KEY = '@Goodstore:CountryFruitList';

import { multiConnect, multiSet, multiRemove } from '../configs/storage.js';
const watcher = fn => [fn, { type: 'watcher' }];
export default {
    namespace: 'user',
    state: {
        userInfo: {},
        canLogin: false,
        phone: '',
        password: '',
        code: '',
        showLogin: false

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
        *getInputValue({ payload }, { call, put, select }) {
            yield put(createAction('setInputValue')(payload))
        },
        *login({ payload }, { call, put, select }) {
            Toast.loading('正在登陆', 1000);
            const data = yield call(login, payload);
            if (data.data.code === 'SUCCESS') {
                Toast.success(data.data.info);
                yield put(createAction('loginSuccess')());
                yield put(NavigationActions.back());
            } else {
                Toast.fail(data.data.info);
                yield put(createAction('loginFail')())
            }
        },
    },
    subscriptions: {
        setup({ dispatch }) {

        },
    },
}
