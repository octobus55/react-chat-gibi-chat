import firebase from "../config/firebase";

import { 
    USERS_DATA, 
    MY_DATA, 
    RECENTS_DATA 
} from "./types";
import {sortFunction} from './utils';

export const usersAllData = () => {
    return (dispatch) => {
        var tempUserData = [];
        var counter = 0;
        firebase.database().ref("/Users").once('value', snapshot => {
            snapshot.forEach(snap => {
                firebase.database().ref(`Users/${snap.key}/UserInfo`).once('value', childSnapshot => {
                    childSnapshot.forEach(childSnap => {
                        tempUserData[counter++] = childSnap.val();
                    })

                })
            });
            dispatch({ type: USERS_DATA, payload: tempUserData});
        })
    }
}

export const myData = () => (dispatch) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/Users/${currentUser.uid}/UserInfo`).once('value', snapshot => {
        snapshot.forEach(snap => {
            dispatch({ type: MY_DATA, payload: snap.val().name })
        })
    })
}

export const recentsData = () => (dispatch) => {
    const { currentUser } = firebase.auth();
    var recentsData = [];
    firebase.database().ref(`/Recents/${currentUser.uid}/lastMessage`).on('value', snapshot => {
        var counter = 0;
        snapshot.forEach(snap => {
            recentsData[counter++] = snap.val();
        })
        recentsData.sort(function (a, b){return sortFunction(a, b)})
        dispatch({ type: RECENTS_DATA, payload: recentsData });
    })
}