import { createAction, NavigationActions, dataSourceRowInit, delay, indexOf } from '../utils'
import {
    getGoodsList,
    getCategoryList
} from '../services/purchase';

import { AsyncStorage, ListView } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';
import { multiConnect, multiSet, multiRemove } from '../configs/storage.js';
const watcher = fn => [fn, { type: 'watcher' }];

const dataSource = dataSourceRowInit();

export default {
    namespace: 'purchase',
    state: {
        goodsList: [],
        goodsDataSource: dataSource.cloneWithRows([]),
        categoryList: [],
        category_id: '',
        refreshing: true,
        loading: false,
        nation_id: 0,
        purchaseList: [],
        navList: [],
        page: {
            page_count: 0,
            page_index: 1,
            record_count: 0
        }
    },
    reducers: {
        setInputValue(state, { payload }) {
            return { ...state, ...payload }
        },
        getGoodsListRequest(state, { payload }) {
            return { ...state, ...payload };
        },
        getGoodsListSuccess(state, { payload }) {
            return { ...state, ...payload };
        },
        getGoodsListNo_data(state, { payload }) {
            return { ...state, ...payload };
        },
        getCategoryListSuccess(state, { payload }) {
            return { ...state, ...payload };
        },
        setCategoryId(state, { payload }) {
            return { ...state, ...payload };
        },
        setNationId(state, { payload }) {
            return { ...state, ...payload };
        },
        setNavList(state, { payload }) {
            return { ...state, ...payload };
        },
        addPurchaseList(state, { payload }) {
            const { goodsList, nation_id } = state;
            return { ...state, purchaseList: [...state.purchaseList, payload], goodsDataSource: dataSource.cloneWithRows(goodsList[nation_id]) }
        },
        decPurchaseList(state, { payload }) {
            let { purchaseList, goodsList, nation_id } = state;
            let index = indexOf(purchaseList, 'id', payload.id);
            if (index) {
                purchaseList.splice(index, 1);
            }
            return { ...state, purchaseList, goodsDataSource: dataSource.cloneWithRows(goodsList[nation_id]) }
        },

    },
    effects: {
        *getGoodsList({ payload }, { call, put, select }) {
            const { loadType, name } = payload;
            yield put(createAction('getGoodsListRequest')({ refreshing: true, loading: loadType == 'add' ? true : false }));

            try {
                let { nation_id, category_id, navList, goodsList, page } = yield select(state => state.purchase);

                if (goodsList[nation_id] && loadType == 'switch') {
                    yield put(createAction('getGoodsListSuccess')({
                        goodsDataSource: dataSource.cloneWithRows(goodsList[nation_id]),
                        refreshing: false
                    }));
                } else {
                    const data = yield call(getGoodsList, { name, id: category_id, nation_id, page: loadType === 'add' ? page.page_index + 1 : 1 });
                    if (data.data.code === 'SUCCESS') {
                        if (loadType === 'add') {
                            for (let i in goodsList) {
                                if (i == nation_id) {
                                    goodsList[i] = [...goodsList[i], ...data.data.data];
                                }
                            }
                        } else {
                            goodsList[nation_id] = data.data.data;
                        }
                        const postData = {
                            page: data.data.page,
                            goodsList,
                            goodsDataSource: dataSource.cloneWithRows(goodsList[nation_id]),
                            refreshing: false,
                            loading: false
                        }
                        yield put(createAction('getGoodsListSuccess')(postData));
                    } else if (data.data.code === 'NO_DATA') {
                        let refreshing = false;
                        let loading = false;
                        if (loadType == 'add') {
                            yield put(createAction('getGoodsListNo_data')({ refreshing, loading, goodsDataSource: dataSource.cloneWithRows(goodsList[nation_id]) }))
                        } else {
                            yield put(createAction('getGoodsListNo_data')({ refreshing, loading, goodsDataSource: dataSource.cloneWithRows([]) }));
                        }

                    } else if (data.data.code === 'ASK_LOGIN') {
                        yield put(createAction('user/getAskLogin')())
                    }
                }


            } catch (error) {
                console.warn(error)
            }

        },
        *getCategoryList({ payload }, { call, put, select }) {
            const data = yield call(getCategoryList, payload);
            const { categoryList } = yield select(state => state.purchase);

            if (data.data.code === 'SUCCESS' && !(categoryList.length > 0)) {
                let categoryArr = data.data.data;
                categoryArr.unshift({ name: '不限分类', id: '' })
                yield put(createAction('getCategoryListSuccess')({ categoryList: categoryArr }));
            }
        },
        *onRefresh({ payload }, { call, put, select }) {
            const { category_id } = yield select(state => state.purchase);
            yield put(createAction('getGoodsList')({ id: category_id, loadType: 'init' }));
        },
        *getNavList({ payload }, { call, put, select }) {
            let { nationalList } = yield select(state => state.main);
            if (indexOf(nationalList, 'id', 0) == -1) {
                nationalList.unshift({ id: 0, name: '全部' });
            }
            yield put(createAction('setNavList')({ navList: nationalList }));
        },
        *init({ payload }, { call, put, select }) {
            yield put(createAction('getNavList')());
            yield put(createAction('getCategoryList')());
            yield put(createAction('getGoodsList')({ loadType: 'init' }));
        }
    },
    subscriptions: {
        setup({ dispatch }) {

        },
    },
}
