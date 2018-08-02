import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    PASSWORD_CHANGED,
    PASSWORD_CONFIRM_CHANGED,
    EMAIL_CHANGED,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER,
    NAME_CHANGED
 } from '../actions/types';

 const INITIAL_STATE ={
    email: '',
    password: '',
    passwordConfirm: '',
    name: '',
    loading: false,
    loggedIn: false,
    loginSucces: false
};
export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case LOGIN_USER:
            return {...state, loading: true,  loggedIn: true};
        case LOGIN_USER_SUCCESS:
        console.log('success')
            return {...state, loading: false, loginSucces : true};
        case LOGIN_USER_FAIL:
            return {...state, loading: false, loggedIn: false};
        case REGISTER_USER:
            return {...state, loading: true};
        case REGISTER_USER_SUCCESS:
            return {...state, loading: false, loggedIn: true};
        case REGISTER_USER_FAIL:
            return {...state, loading: false};
        case EMAIL_CHANGED:
            return {...state, email: action.payload};
        case PASSWORD_CHANGED:
            return {...state, password: action.payload};
        case PASSWORD_CONFIRM_CHANGED:
            return {...state, passwordConfirm: action.payload};
            case NAME_CHANGED:
            return {...state, name: action.payload};
        default:
        return INITIAL_STATE;
    }
}