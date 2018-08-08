import firebase from "../config/firebase";

import { USERS_DATA, MY_DATA, RECENTS_DATA } from "./types";

export const usersAllData = () => {
    return (dispatch) => {
        firebase.database().ref("/Users").once('value', snapshot => {
            snapshot.forEach(snap => {
                firebase.database().ref(`Users/${snap.key}/UserInfo`).once('value', childSnapshot => {
                    childSnapshot.forEach(childSnap => {
                        dispatch({ type: USERS_DATA, payload: childSnap.val() });
                    })

                })
            });
        })
        
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
        const { currentUser } = firebase.auth();
        
        var recentsData = [];
        firebase.database().ref(`/Recents/${currentUser.uid}/lastMessage`).on('value', snapshot => {
            var counter = 0;
            snapshot.forEach(snap => {
                recentsData[counter++] = snap.val();
            })
            recentsData.sort(function(a, b){
                const aDate = new Date(a.sendDate);
                const bDate = new Date(b.sendDate);
                if(aDate - bDate === 0)
                {
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
                }
                return bDate - aDate
            })
       
            dispatch({ type: RECENTS_DATA, payload: recentsData });
        })

}