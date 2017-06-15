import { createAction, NavigationActions, dataSourceRowInit, delay, indexOf, isEmptyObj } from '../utils'
import {
    getGoodsList,
    getCategoryList,
    getShoppingCartList,
    bacthAddShoppingCart
} from '../services/purchase';

import { AsyncStorage, ListView } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';
import axios from 'axios';
import { multiConnect, multiSet, multiRemove } from '../configs/storage.js';
const watcher = fn => [fn, { type: 'watcher' }];

const interval = timeout => {
    return new Promise(resolve => {
        setInterval(resolve, timeout);
    });
};
const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const ACTIONS = [
    'user/logout',
    'Navigation/BACK',
    'Navigation/NAVIGATE',
    'user/loginSuccess',
    'user/getUserInfo'
]

let timer = null;

export default {
    namespace: 'purchase',
    state: {
        goodsList: [],
        // goodsDataSource: dataSource.cloneWithRows([]),
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
        },
        shoppingCartList: []
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
            return { ...state, purchaseList: [...state.purchaseList, payload] }
        },
        decPurchaseList(state, { payload }) {
            let { purchaseList, goodsList, nation_id } = state;
            let index = indexOf(purchaseList, 'id', payload.id);
            if (index) {
                purchaseList.splice(index, 1);
            }
            return { ...state, purchaseList }
        },
        clearPurchaseList(state, { payload }) {
            return { ...state, purchaseList: [] }
        },
        synchronousShoppingCartSuccess(state, { payload }) {
            return { ...state, purchaseList: payload.list }
        }

    },
    effects: {
        *getGoodsList({ payload }, { call, put, select }) {
            const { loadType, name } = payload;
            yield put(createAction('getGoodsListRequest')({ refreshing: true, loading: loadType == 'add' ? true : false }));

            try {
                let { nation_id, category_id, navList, goodsList, page } = yield select(state => state.purchase);

                if (goodsList[nation_id] && loadType == 'switch') {
                    yield put(createAction('getGoodsListSuccess')({
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
                            refreshing: false,
                            loading: false
                        }
                        yield put(createAction('getGoodsListSuccess')(postData));
                    } else if (data.data.code === 'NO_DATA') {
                        let refreshing = false;
                        let loading = false;
                        // if (loadType == 'add') {
                        //     yield put(createAction('getGoodsListNo_data')({ refreshing, loading }))
                        // } else {
                        //     yield put(createAction('getGoodsListNo_data')({ refreshing, loading, }));
                        // }
                        yield put(createAction('getGoodsListNo_data')({ refreshing, loading }))
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
                nationalList.unshift({ id: 0, name: '不限国家' });
            }
            yield put(createAction('setNavList')({ navList: nationalList }));
        },
        *synchronousShoppingCart({ payload }, { call, put, select }) {

            const data = yield call(getShoppingCartList);
            while (true) {
                const { router, user, purchase } = yield select(state => state);
                yield call(interval, 5000);
                const data = yield call(getShoppingCartList);
                if (data.data.code === 'SUCCESS') {
                    yield put(createAction('synchronousShoppingCartSuccess')({ list: data.data.data }));
                } else if (data.data.code === 'ASK_LOGIN') {
                    if (!isEmptyObj(user.userInfo)) {
                        yield put(createAction('user/getAskLogin')());
                    }
                } else {

                }
            }
        },
        *changePurchaseList({ payload }, { call, put, select }) {
            const { type, item } = payload;
            if (type == 'add') {
                yield put(createAction('addPurchaseList')(item));
            } else if (type == 'dec') {
                yield put(createAction('decPurchaseList')(item));
            }

            const { purchaseList } = yield select(state => state.purchase);
            let postList = [];
            for (let i = 0; i < purchaseList.length; i++) {
                const item = purchaseList[i];
                  console.log(item)
                postList.push({ goodsid: item.id, num: item.g_num?item.g_num:1, grade: item.grade });
            }

            const data = yield call(bacthAddShoppingCart, { basket: JSON.stringify(postList) });
            if (data.data.code === 'SUCCESS') {

            }else{

            }

            console.log(data);
        },
        *init({ payload }, { call, put, select }) {
            yield put(createAction('getNavList')());
            yield put(createAction('getCategoryList')());
            yield put(createAction('getGoodsList')({ loadType: 'init' }));


        },
        watch: [
            function* watch({ take, call, put, select }) {
                try {
                    while (true) {
                        const payload = yield take(ACTIONS);
                        const { router, user, purchase } = yield select(state => state);
                        const { currentRoute } = router;
                        const { userInfo } = user;
                        const { goodsList } = purchase;

                        switch (payload.type) {
                            case ACTIONS[0]:
                                yield put(createAction('clearPurchaseList')());
                                break;
                            case ACTIONS[1]:

                                if (currentRoute === 'Purchase' && !isEmptyObj(userInfo)) {
                                    yield put(createAction('init')());
                                }
                                break;
                            case ACTIONS[2]:
                                if (!isEmptyObj(userInfo)) {
                                    if (payload.routeName == 'Purchase') {
                                        if (goodsList.length == 0) {
                                            yield put(createAction('init')());

                                        } else if (payload.routeName == 'Orders') {

                                        }
                                    }
                                }
                                break;
                            case ACTIONS[3]:
                                yield put(createAction('synchronousShoppingCart')());
                                break;
                            case ACTIONS[4]:
                                yield put(createAction('synchronousShoppingCart')());
                                break;
                            default:
                                break;
                        }


                    }
                } catch (error) {
                    console.warn(error)
                }

            },
            { type: 'watcher' },
        ],
    },
    subscriptions: {
        setup({ dispatch }) {

        },
    },
}
