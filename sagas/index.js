import { takeLatest, all } from 'redux-saga/effects';

import { AuthTypes } from '../stores/authRedux';
import { UserTypes } from '../stores/userRedux';

import { login, logout } from './authSaga';
import { getHistory, getInfo, getOrders, changePassword, updateInfo } from './userSaga';
// import {getCode} from './fetchSaga'

export default function* root() {
  yield all([
    takeLatest(AuthTypes.AUTH_LOGIN, login),
    takeLatest(AuthTypes.AUTH_LOGOUT, logout),
    takeLatest(UserTypes.USER_GET_INFO, getInfo),
    takeLatest(UserTypes.USER_GET_ORDERS, getOrders),
    takeLatest(UserTypes.USER_GET_HISTORY, getHistory),
    takeLatest(UserTypes.USER_UPDATE_INFO, updateInfo),
    takeLatest(UserTypes.USER_CHANGE_PASSWORD, changePassword),

    // takeLatest(FetchTypes.FETCH_GET_CODE,getCode)
  ]);
}