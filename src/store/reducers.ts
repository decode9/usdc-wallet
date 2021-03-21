import { combineReducers } from "redux";
import auth from './Auth/reducer';

const reducers = combineReducers({
    auth
});

export default reducers;