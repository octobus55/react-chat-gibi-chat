import firebase from "../config/firebase";

import {USERS_DATA} from "./types";

export const usersAllData = () => {
    return (dispatch) => {
        const data = [];
        var counter = 0;
        firebase.database().ref("/Users").once('value', snapshot => {
            snapshot.forEach(snap => {
                firebase.database().ref(`Users/${snap.key}/UserInfo`).once('value', childSnapshot => {
                    childSnapshot.forEach(childSnap => {
                        data[counter++] = childSnap.val();
                    })
                    //
                    
                })
            })
        });
        //console.log(data);
        dispatch({type: USERS_DATA, payload: data});
    }
}
