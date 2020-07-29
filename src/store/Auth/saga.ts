import { call, takeLatest } from 'redux-saga/effects';
import { VERIFY_USER } from './action-types';

function* verifyUserAsync() {

}

export function* watchVerifyUser() {
    yield takeLatest(VERIFY_USER, verifyUserAsync);
}