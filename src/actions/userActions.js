import firebase from "../config/firebase";

import {USERS_DATA} from "./types";

export const usersAllData = () => {
    return (dispatch) => {
        firebase.database().ref("/Users").once('value', snapshot => {
            dispatch({type: USERS_DATA, payload: snapshot.val()});
        });
    }
}
