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
    namespace: 'main',
    state: {
        bannerList: [],
        newsList: [],
        recommendList: [],
        countryFruitList: [],
        nationalList: [],
        refreshing: false

    },
    reducers: {
        loginStart(state, { payload }) {
            return { ...state, ...payload, fetching: true }
        },
        setNewsList(state, { payload }) {
            return { ...state, ...payload }
        },
        setBannerList(state, { payload }) {
            return { ...state, ...payload };
        },
        setRecommendList(state, { payload }) {
            return { ...state, ...payload };
        },
        setNationalList(state, { payload }) {
            return { ...state, ...payload };
        },
        setCountryFruitList(state, { payload }) {
            return { ...state, ...payload };
        },
        refreshingStart(state, { payload }) {
            console.log(payload)
            return { ...state, ...payload };
        },
        refreshingEnd(state, { payload }) {
            return { ...state, ...payload };
        },
   
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
        *saveToLocalStorage({ payload }, { put, call, select }) {
            const { bannerList, newsList, recommendList, nationalList } = yield select((state: any) => state.main);
            const storageArr = [
                [IMG_LIST_KEY, JSON.stringify(bannerList)],
                [SCROLL_LIST_KEY, JSON.stringify(newsList)],
                [RECOMMEND_LIST_KEY, JSON.stringify(recommendList)],
                [NATIONAL_LIST_KEY, JSON.stringify(nationalList)],
            ]
            const value = yield call(multiSet, storageArr);
        },
        *init({ payload }, { put, call }) {
            try {
                const value = yield AsyncStorage.getItem(IMG_LIST_KEY);
                if (value !== null) {
                    const stores = yield call(multiConnect, [IMG_LIST_KEY, SCROLL_LIST_KEY, RECOMMEND_LIST_KEY, NATIONAL_LIST_KEY, COUNTRY_FRUIT_LIST_KEY]);
                    for (let i in stores) {
                        const key = stores[i][0];
                        const value = JSON.parse(stores[i][1]);
                        switch (key) {
                            case IMG_LIST_KEY:
                                yield put(createAction('setBannerList')({ bannerList: value }));
                                break;
                            case SCROLL_LIST_KEY:
                                yield put(createAction('setNewsList')({ newsList: value }));
                                break;
                            case RECOMMEND_LIST_KEY:
                                yield put(createAction('setRecommendList')({ recommendList: value }));
                                break;
                            case NATIONAL_LIST_KEY:
                                yield put(createAction('setNationalList')({ nationalList: value }));
                                break;
                            case COUNTRY_FRUIT_LIST_KEY:
                                yield put(createAction('setCountryFruitList')({ countryFruitList: value }))
                                break;
                        }
                    }
                } else {
                    yield put(createAction('onRefresh'));
                }
            } catch (error) {
                console.error(error);
            }
        },
        *onRefresh({ payload }, { put, call, select }) {
            yield put({ type: 'refreshingStart', payload: { refreshing: true } });
            const resultArr = yield call(getAll);
            for (let i in resultArr) {
                const { data } = resultArr[i];
                switch (i) {
                    case "0":
                        data.status === 1 ? yield put(createAction('setBannerList')({ bannerList: data.data })) : yield put(createAction('getbannerListFail')());
                        break;
                    case "1":
                        data.code === "SUCCESS" ? yield put(createAction('setNewsList')({ newsList: data.data })) : yield put(createAction('getnewsListFail')());
                        break;
                    case "2":
                        data.code === "SUCCESS" ? yield put(createAction('setRecommendList')({ recommendList: data.data })) : yield put(createAction('getrecommendListFail')());
                        break;
                    case "3":
                        if (data.code === 'SUCCESS') {
                            yield put(createAction('setNationalList')({ nationalList: data.data }));
                            yield put(createAction('getCountryFruitList')({ nationalList: data.data.slice(0, 3) }));
                            yield put(createAction('refreshingEnd')({ refreshing: false }));
                        } else {
                            yield put(createAction('getNationalListFail')());
                        }
                        break;
                    default:
                        break;
                }
            };
            yield put(createAction('saveToLocalStorage')())
        }
    },
    subscriptions: {
        setup({ dispatch }) {
            dispatch({ type: 'init' })
        },
    },
}
