import { combineReducers } from 'redux';
import authReducer from './authReducer';

const reducers = combineReducers({
    AuthResponse: authReducer 
});

export default reducers;