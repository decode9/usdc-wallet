import { VERIFY_USER, LOGIN, REGISTER } from './action-types';
import { actionObject } from '../../utils';

export const verifyUser = () => actionObject(VERIFY_USER);
export const login = (body: any) => actionObject(LOGIN, body);
export const register = (body: any) => actionObject(REGISTER, body);