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
    NAME_CHANGED,
} from './types';
import {recentsData} from './userActions';


const loginSuccess = (dispatch) => () => {
    console.log("login başarılı");
    dispatch({
        type: LOGIN_USER_SUCCESS
    })
}
const loginFail = (dispatch) => () => {
    console.log("login başarısız");
    return () => {
        dispatch({
            type: LOGIN_USER_FAIL
        })
    }
}
export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({
            type: LOGIN_USER
        })
        if (email && password) {
            return firebase.auth().signInWithEmailAndPassword(email, password)
                .then(loginSuccess(dispatch))
                .catch(loginFail(dispatch));
        }
    }

}
const saveUserInfo = ({ email, name }) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/Users/${currentUser.uid}/UserInfo`).push({ email, name, uid: currentUser.uid })
}
const registerSuccess = (dispatch, email, password) => () => {
    console.log("kayıtlanma başarılı");
    dispatch({
        type: REGISTER_USER_SUCCESS
    })
}
const registerFail = (dispatch) => () => {
    console.log("kayıtlanma başarısız")
    dispatch({
        type: REGISTER_USER_FAIL
    })
}
const loginAfterRegister = ( email, password) => {
    
    if (email && password) {
        firebase.auth().signInWithEmailAndPassword(email, password)
    }

}
export const registerUser = ({ email, password, name }) => {
    return (dispatch) => {
        dispatch({
            type: REGISTER_USER
        })
        if (email && password) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(registerSuccess(dispatch, email, password))
                .then(() => loginAfterRegister(email, password))
                .then(dispatch({type: LOGIN_USER}))
                .then(loginSuccess(dispatch))
                .catch(loginFail(dispatch))
                .catch(registerFail(dispatch))
                .then(() => saveUserInfo({ email, name }))
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
