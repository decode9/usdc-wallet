import { all, fork } from 'redux-saga/effects';
import { watchVerifyUser } from './Auth/saga';

export default function* rootSaga() {
    yield all([
        fork(watchVerifyUser)
    ]);
}