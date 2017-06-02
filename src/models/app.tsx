import { createAction, NavigationActions } from '../utils'
import {
  refreshToken,
} from '../services/user';

export default {
  namespace: 'app',
  state: {
    fetching: false,
    login: false,
  },
  reducers: {
    loginStart(state, { payload }) {
      return { ...state, ...payload, fetching: true }
    },
    loginEnd(state, { payload }) {
      return { ...state, ...payload, fetching: false }
    },

    *handleLoginStatus({ payload }, { put, call }) {
      const result = yield AsyncStorage.getItem(APP_AUTH_KEY);
      const app_auth = JSON.parse(result);
      const currentTimestamp = Math.floor(new Date().getTime() / 1000);
      console.log(app_auth)
      yield put(createAction('user/refreshToken')({ refresh_token: app_auth.refresh_token }));
      //超过有效时间
      if (currentTimestamp - app_auth.currentTimestamp > app_auth.access_token_valid_time) {
        yield put(createAction('refreshToken')({ refresh_token: app_auth.refresh_token }));
      } else {

      }
    },
  },
  effects: {
    *login({ payload }, { call, put }) {
      yield put(createAction('loginStart')())
      // const login = yield call(authService.login, payload)
      // if (login) {
      //   yield put(
      //     NavigationActions.reset({
      //       index: 0,
      //       actions: [NavigationActions.navigate({ routeName: 'Main' })],
      //     }),
      //   )
      // }
      // yield put(createAction('loginEnd')({ login }))
    },

  },
}
