import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer'
import messageReducer from './messageReducer';
import groupReducer from './groupReducer';

const reducers = combineReducers({
    AuthResponse: authReducer, 
    UserResponse: userReducer,
    MessageResponse: messageReducer,
    GroupResponse: groupReducer,
});

export default reducers;