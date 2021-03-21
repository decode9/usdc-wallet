import { LOGIN_ASYNC, VERIFY_USER_ASYNC } from './action-types';

const initialState = {
    username: '',
    isAuth: false,
    isRegister: false,
}

const authReducer = (state: any = initialState, { type, payload }: any) => {
    switch (type) {
        case VERIFY_USER_ASYNC:
            return { ...state, isRegister: payload };

        case LOGIN_ASYNC:
            return { ...state, ...payload };

        default:
            return state

    }
}

export default authReducer;