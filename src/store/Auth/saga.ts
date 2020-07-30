import { call, takeLatest, put } from 'redux-saga/effects';
import { VERIFY_USER, VERIFY_USER_ASYNC } from './action-types';
import { createTables, getData, actionObject } from '../../utils';

function* verifyUserAsync() {
    try {
        yield call(createTables);

        let user = yield call(getData, 'users');

        let exists = user ? true : false;

        yield put(actionObject(VERIFY_USER_ASYNC, exists));
    } catch (error) {
        console.log(error);
    }

}

export function* watchVerifyUser() {
    yield takeLatest(VERIFY_USER, verifyUserAsync);
}