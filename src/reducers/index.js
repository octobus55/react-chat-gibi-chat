import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer'

const reducers = combineReducers({
    AuthResponse: authReducer, 
    UserResponse: userReducer
});

export default reducers;