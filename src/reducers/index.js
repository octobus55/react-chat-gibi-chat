import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer'
import messageReducer from './messageReducer';
import groupReducer from './groupReducer';
import textReducer from './textReducer';
import panelReducer from './panelReducers';

const reducers = combineReducers({
    AuthResponse: authReducer, 
    UserResponse: userReducer,
    MessageResponse: messageReducer,
    GroupResponse: groupReducer,
    TextResponse: textReducer,
    PanelResponse: panelReducer,
});

export default reducers;