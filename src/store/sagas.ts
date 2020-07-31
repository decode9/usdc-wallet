import { all, fork } from 'redux-saga/effects';
import { watchVerifyUser, watchRegisterUser } from './Auth/saga';

export default function* rootSaga() {
    yield all([
        fork(watchVerifyUser),
        fork(watchRegisterUser)
    ]);
}