import { delay, NavigationActions, createAction } from '../utils'
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
  },
  reducers: {
    apply(state, { payload: action }) {
      return routerReducer(state, action)
    },
  },
  effects: {
    
    watch: [
      function* watch({ take, call, put }) {
        const loop = true;
        try {
          while (loop) {
            const payload = yield take(actions)
            yield put({
              type: 'apply',
              payload,
            });
            // debounce, see https://github.com/react-community/react-navigation/issues/271
            if (payload.type === 'Navigation/NAVIGATE') {
              yield call(delay, 100);
            }
            switch (payload.routeName) {
              case "Purchase":
                yield put(createAction('user/handleLoginStatus')());
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
