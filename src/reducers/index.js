import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer'
import messageReducer from './messageReducer';

const reducers = combineReducers({
    AuthResponse: authReducer, 
    UserResponse: userReducer,
    MessageResponse: messageReducer,
});

export default reducers;