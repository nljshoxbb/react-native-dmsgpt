import { createAction, NavigationActions, setAccessToken } from '../utils'
import {
    login,
    refreshToken
} from '../services/user';
import { Toast } from 'antd-mobile';

import { AsyncStorage } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';
import { APP_AUTH_KEY } from '../configs/storage.js';
import { Alert } from 'react-native';

// const APP_AUTH = '@User:App_auth';


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
        showLogin: false,
        app_auth: {},
        isLogin: false
    },
    reducers: {
        loginStart(state, { payload }) {
            return { ...state, ...payload }
        },
        logout(state, { payload }) {
            return { ...state, ...payload }
        },
        setInputValue(state, { payload }) {
            return { ...state, ...payload }
        },
        getUserInfo(state, { payload }) {
            return { ...state, ...payload };
        },
        loginSuccess(state, { payload }) {
            return { ...state, ...payload };
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
                Toast.success(data.data.info, 1);
                yield put(createAction('loginSuccess')({ userInfo: data.data.data }));
                let app_auth = data.data.data.app_auth;
                setAccessToken(app_auth.access_token)
                yield put(NavigationActions.back());
                app_auth.currentTimestamp = Math.floor(new Date().getTime() / 1000);
                yield AsyncStorage.setItem(APP_AUTH_KEY, JSON.stringify(app_auth));

            } else {
                Toast.fail(data.data.info);
                yield put(createAction('logout')({ userInfo: {} }))
            }
        },
        *refreshToken({ payload }, { call, put }) {
            try {
                const data = yield call(refreshToken, { refresh_token: payload.refresh_token });
                //还在登陆状态
                if (data.data.code === 'SUCCESS') {
                    const app_auth = data.data.data.app_auth;
                    yield put(createAction('getUserInfo')({ userInfo: data.data.data.data, app_auth }));
                    yield AsyncStorage.setItem(APP_AUTH_KEY, JSON.stringify(app_auth));
                    setAccessToken(app_auth.access_token)
                } else {
                    //登出
                    yield put(createAction('logout')({ userInfo: {} }));
                }
            } catch (error) {
                console.error(error);
            }

        },
        *handleLoginStatus({ payload }, { put, call }) {
            try {
                const result = yield AsyncStorage.getItem(APP_AUTH_KEY);
                if (!!result) {
                    const app_auth = JSON.parse(result);
                    const currentTimestamp = Math.floor(new Date().getTime() / 1000);

                    //超过有效时间
                    if (currentTimestamp - app_auth.currentTimestamp > app_auth.access_token_valid_time) {
                        yield put(createAction('refreshToken')({ refresh_token: app_auth.refresh_token }));
                    } else {
                        yield put(createAction('refreshToken')({ refresh_token: app_auth.refresh_token }));
                    }
                } else {

                }

            } catch (error) {
                console.error(error);
            }

        },
        *getAskLogin({ payload }, { put, call }) {
            Alert.alert(
                '系统提示',
                "您还未登录!",
                [
                    { text: '确定', onPress: () => NavigationActions.navigate({ routeName: 'Login' }) },
                ])
            // yield put(NavigationActions.navigate({ routeName: 'Login' }));
            yield put(createAction('logout')({ userInfo: {} }));
        }
    },
    subscriptions: {
        setup({ dispatch }) {
            dispatch({ type: 'handleLoginStatus' })
        },
    },
}
