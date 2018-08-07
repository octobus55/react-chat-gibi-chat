import firebase from "../config/firebase";

import { USERS_DATA, MY_DATA, RECENTS_DATA } from "./types";

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

                })
            })
        });
        //console.log(data);
        dispatch({ type: USERS_DATA, payload: data });
    }
}
export const myData = () => (dispatch) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref("/Users").once('value', snapshot => {
        snapshot.forEach(snap => {
            if (snap.key === currentUser.uid) {
                firebase.database().ref(`/Users/${snap.key}/UserInfo`).once('value', childSnapshot => {
                    childSnapshot.forEach(childSnap => {
                        console.log(childSnap.val().name);
                        dispatch({ type: MY_DATA, payload: childSnap.val().name })
                    })
                })
            }
        })
    })
}
export const recentsData = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        const { currentUser } = firebase.auth();
        
        var recentsData = [];
        firebase.database().ref(`/Recents/${currentUser.uid}/lastMessage`).on('value', snapshot => {
            var counter = 0;
            snapshot.forEach(snap => {
                recentsData[counter++] = snap.val();
            })
            recentsData.sort(function(a, b){
                if(a.sendHour == b.sendHour){
                    if(a.sendMinute == b.sendMinute){
                        if(a.sendSecond == b.sendSecond)
                        {
                            return b.sendMiliSeconds - a.sendMiliSeconds;
                        }
                        return b.sendSecond - a.sendSecond;
                    }
                    return b.sendMinute - a.sendHour;
                }
                return b.sendHour - a.sendHour;
            })
       
            dispatch({ type: RECENTS_DATA, payload: recentsData });
            resolve(recentsData);
        })

    });

}