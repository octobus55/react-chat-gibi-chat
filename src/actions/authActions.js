import firebase from "../config/firebase";
import {
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    PASSWORD_CONFIRM_CHANGED,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER,
    NAME_CHANGED
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
const registerSuccess = (dispatch, user, email, name) =>{
    console.log("kayıtlanma başarılı");
    
    return(dispatch) => {
        dispatch({
            type: REGISTER_USER_SUCCESS
        })
    }
}
const registerFail = (dispatch) =>{
    console.log("kayıtlanma başarısız");
    return(dispatch) => {
        dispatch({
            type: REGISTER_USER_FAIL
        })
    }
} 

export const registerUser = ({email, password, name}) =>{
    return(dispatch) => {
        dispatch({
            type: LOGIN_USER
        })
        if (email && password) {
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then((user) => registerSuccess(dispatch, user,email,name))
            .catch(() => registerFail(dispatch));
            firebase.database().ref("/Users").push({email,name})
            
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
export const passwordConfirmChanged = (value) => {
    return (dispatch) => {
        dispatch({
            type: PASSWORD_CONFIRM_CHANGED,
            payload: value
        });
    };
};
export const nameChanged = (value) => {
    return (dispatch) => {
        dispatch({
            type: NAME_CHANGED,
            payload: value
        });
    };
};