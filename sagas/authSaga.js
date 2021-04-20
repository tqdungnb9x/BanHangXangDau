import { put, call } from 'redux-saga/effects';
import api from '../api';
import AuthActions from '../stores/authRedux';

export function* login(action) {
    const { username, password, onSuccess, onError } = action;
    try {
        const response = yield call(api.create().login, username, password);

        // token
        yield put(
            AuthActions.authSetUser({
                ...response.data,
            }),
        );
        if (onSuccess) {
            onSuccess(response.data);
            api.setAuthToken(response.data.token)
        }
    } catch (error) {
        if (onError) {
            onError(error.data);
        }
    }
}

export function* signUp(action) {
    const { username, password, role, onSuccess, onError } = action;
    try {
        const response = yield call(api.create().signUp, username, password, role);

        if (onSuccess) {
            onSuccess(response.data);
        }
    } catch (error) {
        if (onError) {
            onError(error.data);
        }
    }
}

export function* logout(action) {
    const { onSuccess, onError } = action;
    try {
        const response = yield call(api.create().logout)

        if (onSuccess) {
            onSuccess(response.data);
        }
    } catch (error) {
        if (onError) {
            onError(error.data);
        }
    }
}