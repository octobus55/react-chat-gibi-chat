import firebase from "../config/firebase";
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    EMAIL_CHANGED,
    PASSWORD_CHANGED
 } from './types';


const loginSuccess = (dispatch, user) =>{
    console.log("login başarılı");
    return(dispatch) => {
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: user
        })
    }
}
const loginFail = (dispatch) =>{
    console.log("login başarısız");
    return(dispatch) => {
        dispatch({
            type: LOGIN_USER_FAIL
        })
    }
} 
export const loginUser = ({email, password}) =>{
    return(dispatch) => {
        dispatch({
            type: LOGIN_USER
        })
        if (email && password) {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then((user) => loginSuccess(dispatch, user))
                .catch(() => loginFail());
        }
    }
    
}
export const emailChanged = (value) => {
    console.log(value);
    return (dispatch) => {
        dispatch({
            type: EMAIL_CHANGED,
            payload: value
        });
    };
};

export const passwordChanged = (value) => {
    return (dispatch) => {
        dispatch({
            type: PASSWORD_CHANGED,
            payload: value
        });
    };
};