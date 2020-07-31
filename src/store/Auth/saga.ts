import { call, takeLatest, put } from 'redux-saga/effects';
import { VERIFY_USER, VERIFY_USER_ASYNC, REGISTER } from './action-types';
import { createTables, getData, actionObject, encryptPassword, /* insertData */ } from '../../utils';

function* verifyUserAsync() {
    try {

        console.log('tables');
        yield call(createTables);

        console.log('tables created');

        let user = yield call(getData, 'users');

        console.log(user);

        let exists = user ? true : false;

        yield put(actionObject(VERIFY_USER_ASYNC, exists));
    } catch (error) {
        console.log(error);
    }

}

function* registerUser({ payload }: any) {
    try {

        const data = payload;

        if (data.password !== data.confirm_password) throw new Error("Contrasena no coincide");

        console.log("encrypt Pass")
        const encryptedPassword = yield call(encryptPassword, data.password);
        console.log(encryptedPassword);

        const saveData = { username: data.username, password: encryptedPassword };

        console.log('SAVING DATA')/* 
        const newUser = yield call(insertData, 'users', saveData); */
        console.log('data saved?')
        /* console.log(newUser); */


    } catch (error) {
        console.log(error);
    }
}

export function* watchVerifyUser() {
    yield takeLatest(VERIFY_USER, verifyUserAsync);
}

export function* watchRegisterUser() {
    yield takeLatest(REGISTER, registerUser);
}