import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    PASSWORD_CHANGED,
    EMAIL_CHANGED
 } from '../actions/types';

 const INITIAL_STATE ={
    email: '',
    password: '',
    loading: false,
    loggedIn: false
};
export default (state = INITIAL_STATE, action) =>{
    switch(action.type){
        case LOGIN_USER:
        return {...state, loading: true, loggedIn: true}
        case LOGIN_USER_SUCCESS:
        return {...state, loading: false}
        case LOGIN_USER_FAIL:
        return {...state, loading: false}
        case EMAIL_CHANGED:
            return {...state, email: action.payload};
        case PASSWORD_CHANGED:
            return {...state, password: action.payload};
        default:
        return INITIAL_STATE;
    }
}