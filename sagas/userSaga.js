import { put, call } from 'redux-saga/effects';
import api from '../api';
import UserActions from '../stores/userRedux';

export function* getInfo(action) {
    const { onSuccess, onError } = action
    try {
        const response = yield call(api.create().getUser)

        yield put(UserActions.userSetInfo(
            response.data
        ))
        if (onSuccess) {
            onSuccess(response.data)
        }
    } catch (error) {
        if (onError) {
            onError(error.data)
        }
    }
}
export function* getOrders(action) {
    const { onSuccess, onError } = action
    try {
        const response = yield call(api.create().getOrders)
        if (onSuccess) {
            onSuccess(response.data)
        }
    } catch (error) {
        if (onError) {
            onError(error.data)
        }
    }
}
export function* getHistory(action) {
    const { onSuccess, onError } = action
    try {
        const response = yield call(api.create().getHistory)
        if (onSuccess) {
            onSuccess(response.data)
        }
    } catch (error) {
        if (onError) {
            onError(error.data)
        }
    }
}
export function* updateInfo(action) {
    const { email, address, avatar, onSuccess, onError } = action;
    try {
        const response = yield call(api.create().updateInfo, email, address, avatar);

        if (onSuccess) {
            onSuccess(response.data);
        }
    } catch (error) {
        if (onError) {
            onError(error.data);
        }
    }
}
export function* changePassword(action) {
    const { currentPassword, newPassword, onSuccess, onError } = action;
    try {
        const response = yield call(api.create().changePassword, currentPassword, newPassword);
        
        if (onSuccess) {
            onSuccess(response.data);
        }
    } catch (error) {
        if (onError) {
            onError(error.data);
        }
    }
}