import { createAction, NavigationActions } from '../utils'
import {
    getNewsList,
    getBannerList,
    getRecommandList,
    getCountryFruitList,
    getNationalList,
    getAll
} from '../services/goods';
import { AsyncStorage } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';
const IMG_LIST_KEY = '@Goodstore:imglist';
const SCROLL_LIST_KEY = '@Goodstore:scrollList';
const RECOMMEND_LIST_KEY = '@Goodstore:recommendList';
const NATIONAL_LIST_KEY = '@Goodstore:nationalList';
const COUNTRY_FRUIT_LIST_KEY = '@Goodstore:CountryFruitList';

import { multiConnect, multiSet, multiRemove } from '../configs/storage.js';

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
            console.log(payload)
            return { ...state, ...payload }
        }
    },
    effects: {
        *getCountryFruitList({ payload }, { call, put, select }) {
            const { nationalList } = payload;
            let countryFruitList = yield select(state => state.main.countryFruitList);

            for (let i in nationalList) {
                const data = yield call(getCountryFruitList, { page: 1, len: 8, type: 1, nation_id: nationalList[i].id })
                if (data.data.code === 'SUCCESS') {
                    countryFruitList.push(data.data.data);
                }
            }

            yield AsyncStorage.setItem(COUNTRY_FRUIT_LIST_KEY, JSON.stringify(countryFruitList));
            yield put(createAction('setCountryFruitList')({ countryFruitList }))
        },
        *getInputValue({ payload }, { call, put, select }) {
            yield put(createAction('setInputValue')(payload))
        }


    },
    subscriptions: {
        setup({ dispatch }) {

        },
    },
}
