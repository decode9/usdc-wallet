import { LOGIN_ASYNC, REGISTER_ASYNC, VERIFY_USER_ASYNC } from './action-types';
import { DispatchProps } from '../../interfaces';

const initialState = {
    username: '',
    isAuth: false,
    user: null,
    isRegister: false,
}

const authReducer = (state: any = initialState, { type, payload }: any) => {
    switch (type) {
        case VERIFY_USER_ASYNC:
            return { ...state, ...payload };

        case LOGIN_ASYNC:
            return { ...state, ...payload };

        case REGISTER_ASYNC:
            return { ...state, ...payload };

        default:
            return state

    }
}

export default authReducer;