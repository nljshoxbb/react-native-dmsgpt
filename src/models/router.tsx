import { delay, NavigationActions, createAction, setAccessToken, isEmptyObj } from '../utils'
import { routerReducer } from '../scenes';
import { AsyncStorage } from 'react-native';
import {
  APP_AUTH_KEY
} from '../configs/storage.js';

const actions = [
  NavigationActions.BACK,
  NavigationActions.INIT,
  NavigationActions.NAVIGATE,
  NavigationActions.RESET,
  NavigationActions.SET_PARAMS,
  NavigationActions.URI,
]

export default {
  namespace: 'router',
  state: {
    ...routerReducer(),
    currentRoute: 'Main'
  },
  reducers: {
    apply(state, { payload: action }) {
      return routerReducer(state, action)
    },
    setCurrentRoute(state, { payload }) {
      return { ...state, ...payload };
    }
  },
  effects: {

    watch: [
      function* watch({ take, call, put, select }) {

        const loop = true;
        try {

          while (loop) {
            const payload = yield take(actions);
            const { user, router, purchase } = yield select(state => state);
            const { userInfo } = user;
            const { currentRoute } = router;
            const { goodsList } = purchase;
            yield put({ type: 'apply', payload });

            // debounce, see https://github.com/react-community/react-navigation/issues/271
            if (payload.type === 'Navigation/NAVIGATE') {
              yield call(delay, 100);
              // switch (payload.routeName) {
              //   case "Purchase":
              //     if (!isEmptyObj(userInfo) && goodsList.length == 0) {
              //       yield put(createAction('purchase/init')());
              //     }
              //     break;
              //   default:
              //     break;
              // }
              if (payload.routeName !== 'Login') {
                yield put(createAction('setCurrentRoute')({ currentRoute: payload.routeName }));
              }
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
      AsyncStorage.getItem(APP_AUTH_KEY).then(result => {
        setAccessToken(JSON.parse(result).access_token)
      });
    },
  },
}
