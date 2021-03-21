import { call, takeLatest, put } from 'redux-saga/effects';
import { VERIFY_USER, VERIFY_USER_ASYNC, REGISTER, LOGIN, LOGIN_ASYNC } from './action-types';
import { createTables, getData, actionObject, encryptPassword, insertData, validatePassword } from '../../utils';

function* verifyUserAsync() {
    try {

        yield call(createTables);

        let user = yield call(getData, 'users');

        let exists = user.length ? true : false;

        yield put(actionObject(VERIFY_USER_ASYNC, exists));
    } catch (error) {
        console.log(error);
    }

}

function* registerUserAsync({ payload }: any) {
    try {

        const data = payload;

        if (data.password !== data.confirm_password) throw new Error("Contrasena no coincide");

        console.log("encrypt Pass")
        const encryptedPassword = yield call(encryptPassword, data.password);
        console.log(encryptedPassword);

        const saveData = { username: data.username, password: encryptedPassword };

        const newUser = yield call(insertData, 'users', saveData);

        if (newUser.lastInsertRowid) {
            yield put(actionObject(VERIFY_USER_ASYNC, true));
        }


    } catch (error) {
        console.log(error);
    }
}

function* loginUserAsync({ payload }: any) {
    try {

        const data = payload;

        let user = yield call(getData, 'users', { username: ['=', data.username] });

        const auth = yield call(validatePassword, data.password, user[0].password);

        const authOptions = { isAuth: auth, username: data.username }

        yield put(actionObject(LOGIN_ASYNC, authOptions));

    } catch (error) {
        console.log(error);
    }
}

export function* watchVerifyUser() {
    yield takeLatest(VERIFY_USER, verifyUserAsync);
}

export function* watchRegisterUser() {
    yield takeLatest(REGISTER, registerUserAsync);
}

export function* watchLoginUser() {
    yield takeLatest(LOGIN, loginUserAsync);
}