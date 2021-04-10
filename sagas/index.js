import {takeLatest, all} from 'redux-saga/effects';

import {AuthTypes} from '../stores/authRedux';
import { UserTypes } from '../stores/userRedux';

import {login, logout} from './authSaga';
import {getInfo} from './userSaga';
// import {getCode} from './fetchSaga'

export default function* root() {
  yield all([
    takeLatest(AuthTypes.AUTH_LOGIN, login),
    takeLatest(AuthTypes.AUTH_LOGOUT, logout),
    takeLatest(UserTypes.USER_GET_INFO, getInfo),
    // takeLatest(FetchTypes.FETCH_GET_CODE,getCode)
  ]);
}