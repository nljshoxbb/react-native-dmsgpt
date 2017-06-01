import { createAction, NavigationActions } from '../utils'
import {
    getCountryFruitList
} from '../services/goods';
import { Toast } from 'antd-mobile';
import { ListView } from 'react-native';
import { AsyncStorage } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';

const IMG_LIST_KEY = '@Goodstore:imglist';
const SCROLL_LIST_KEY = '@Goodstore:scrollList';
const RECOMMEND_LIST_KEY = '@Goodstore:recommendList';
const NATIONAL_LIST_KEY = '@Goodstore:nationalList';
const COUNTRY_FRUIT_LIST_KEY = '@Goodstore:CountryFruitList';

import { multiConnect, multiSet, multiRemove } from '../configs/storage.js';

const dataSource = new ListView.DataSource({
    rowHasChanged: (row1, row2) => row1 !== row2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
})

export default {
    namespace: 'fruitList',
    state: {
        list: dataSource.cloneWithRowsAndSections([]),
        refreshing: false,
        nation: { id: '', name: '' },
        listType: false,
        animateOpacity: {}
    },
    reducers: {
        getList(state, { payload }) {
            return {
                ...state,
                ...payload,
                refreshing: true
            }
        },
        getListSuccess(state, { payload }) {
            return { ...state, ...payload, }
        },
        setNation(state, { payload }) {
            return { ...state, ...payload, }
        },
        setAnimate(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        *getList({ payload }, { call, put, select }) {
            const postData = { page: 1, len: 30, type: 1, refreshing: 1, nation_id: payload.nation_id };
            const data = yield call(getCountryFruitList, postData);
            if (data.data.code === 'SUCCESS') {
                yield put(createAction('getListSuccess')({ refreshing: false, list: dataSource.cloneWithRowsAndSections([data.data.data]) }));
            } else {
                yield put(createAction('getListFail')())
            }


        },
        *onRefresh({ payload }, { call, put, select }) {
            yield put(createAction('main/onRefresh')());
        },
        *changeListType({ payload }, { call, put, select }) {
            const { listType } = yield select(state => state.fruitList);
            yield put(createAction('setListType')({ listType: !listType }))
        },
        watch: [
            function* watch({ take, call, put }) {
                while (true) {
                    const payload = yield take('Navigation/SET_PARAMS');
                    yield put(createAction('router/apply')(payload))

                }
            },
            { type: 'watcher' },
        ]
    },
    subscriptions: {
        setup({ dispatch }) {

        },
    },
}
