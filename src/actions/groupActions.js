import firebase from '../config/firebase';

import {
    MY_GROUPS_DATA,
    LOAD_GROUP_MESSAGES,
    SEND_MESSAGE_SUCCESS
} from "./types";

export const createGroup = ({ checked: users, groupName }) => (dispatch) => {
    console.log(users);
    const groupId = generateId();
    firebase.database().ref(`/Groups/${groupId}`).update({ groupName, groupId })
        .then(firebase.database().ref(`/Groups/${groupId}`).update({ Users: users }))
        .then(users.forEach(user => {
            firebase.database().ref(`/Users/${user}/Groups/${groupId}`).update({ groupName, groupId })
        }))

}
export const myGroupsData = () => (dispatch) => {
    const { currentUser } = firebase.auth();

    firebase.database().ref(`/Users/${currentUser.uid}/Groups`).on('value', snapshot => {
        snapshot.forEach(snap => {
            dispatch({ type: MY_GROUPS_DATA, payload: snap.val() });
        })
    })
}
export const loadGroupMessages = ({ uid }) => (dispatch) => {
    
    firebase.database().ref(`/Groups/${uid}/messages/`)
        .on('value', snapshot => {
            if(snapshot.val())
            {
                dispatch({ type: LOAD_GROUP_MESSAGES, payload: snapshot.val()})
            }
            else{
                const data = [];
            dispatch({ type: LOAD_GROUP_MESSAGES, payload: data})
            }
            

        })
}
export const offGroupMessageListener = ({uid}) => (dispatch) => {
    console.log(uid);
    return new Promise((resolve, reject) => {
        firebase.database().ref(`/Groups/${uid}/messages/`).off('value');
        resolve("Success");
    })
}
export const sendGroupMessage = ({message, selectedUser: uid, myName : senderName}) => (dispatch) => {
    const { currentUser } = firebase.auth();
        var today = new Date();
        const sendDate = today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();
        const sendSecond = today.getSeconds();
        const sendHour = today.getHours();
        const sendMinute = today.getMinutes();
        const sendMiliSeconds = today.getMilliseconds();
        const senderUid = currentUser.uid;
    firebase.database().ref(`/Groups/${uid}/messages/`)
    .push({message, senderName, senderUid, sendDate, sendHour, sendMinute, sendSecond, sendMiliSeconds })
    .then(dispatch({type: SEND_MESSAGE_SUCCESS}))
}

function generateId() {
    return Math.random().toString(36).substr(2, 9)
}
