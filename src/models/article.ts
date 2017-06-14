import { createAction, NavigationActions } from '../utils'
import {
    getArticle
} from '../services/article';
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
    namespace: 'article',
    state: {
        loading: true,
        article: {}
    },
    reducers: {
        setArticle(state, { payload }) {
            return {
                ...state,
                ...payload,
                loading: false
            }
        },

    },
    effects: {
        *getArticle({ payload }, { put, call }) {
            const data = yield call(getArticle, payload);
        
            if (data.data.code === 'SUCCESS') {
                yield put(createAction('setArticle')({ article: data.data.data }));
            } else {
                yield put(createAction('requestArticleFail')());
            }


        },
        watch: [
            function* watch({ take, call, put }) {
                while (true) {
                    const payload = yield take('Navigation/SET_PARAMS');

                }
            },
            { type: 'watcher' },
        ]
    },
    subscriptions: {
        setup({ dispatch }) {
            // dispatch(createAction('getList')())

        },
    },
}
