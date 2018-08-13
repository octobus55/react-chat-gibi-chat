import firebase from '../config/firebase';
import {
    MY_GROUPS_DATA,
    LOAD_GROUP_MESSAGES,
    SEND_MESSAGE_SUCCESS
} from "./types";

export const createGroup = ({ checked: users, groupName }) => (dispatch) => {
    const groupId = generateId();
    firebase.database().ref(`/Groups/${groupId}`).update({ groupName, groupId })
        .then(firebase.database().ref(`/Groups/${groupId}`).update({ Users: users }))
        .then(users.forEach(user => {
            firebase.database().ref(`/Users/${user}/Groups/${groupId}`).update({ groupName, groupId })
        }))

}
export const myGroupsData = () => (dispatch) => {
    const { currentUser } = firebase.auth();
    const tempData = [];
    
    firebase.database().ref(`/Users/${currentUser.uid}/Groups`).on('value', snapshot => {
        var counter = 0;
        snapshot.forEach(snap => {
            tempData[counter++] = snap.val();
            
        })
        tempData.sort(function(a, b){
            if(a.lastMessage.sendDate === b.lastMessage.sendDate)
            {
                if(a.lastMessage.sendHour === b.lastMessage.sendHour){
                    if(a.lastMessage.sendMinute === b.lastMessage.sendMinute){
                        if(a.lastMessage.sendSecond === b.lastMessage.sendSecond)
                        {
                            return b.lastMessage.sendMiliSeconds - a.lastMessage.sendMiliSeconds;
                        }
                        return b.lastMessage.sendSecond - a.lastMessage.sendSecond;
                    }
                    return b.lastMessage.sendMinute - a.lastMessage.sendHour;
                }
                return b.lastMessage.sendHour - a.lastMessage.sendHour;
            }
            return b.lastMessage.sendDate - a.lastMessage.sendDate;
        })
        dispatch({ type: MY_GROUPS_DATA, payload: tempData });
    })
}
export const loadGroupMessages = ({ uid }) => (dispatch) => {

    firebase.database().ref(`/Groups/${uid}/messages/`)
        .on('value', snapshot => {
            if (snapshot.val()) {
                dispatch({ type: LOAD_GROUP_MESSAGES, payload: snapshot.val() })
            }
            else {
                const data = [];
                dispatch({ type: LOAD_GROUP_MESSAGES, payload: data })
            }


        })
}
export const offGroupMessageListener = ({ selectedUser: uid }) => (dispatch) => {
        firebase.database().ref(`/Groups/${uid}/messages/`).off('value');
    
}
export const sendGroupMessage = ({ message, selectedUser: uid, myName: senderName }) => (dispatch) => {
    const { currentUser } = firebase.auth();
    var today = new Date();
    const sendDate = today.getDate();
    const sendMonth = today.getMonth() + 1;
    const sendYear = today.getFullYear();
    const sendSecond = today.getSeconds();
    const sendHour = today.getHours();
    const sendMinute = today.getMinutes();
    const sendMiliSeconds = today.getMilliseconds();
    const senderUid = currentUser.uid;
    firebase.database().ref(`/Groups/${uid}/messages/`)
        .push({ message, senderName, senderUid, sendDate, sendMonth, sendYear, sendHour, sendMinute, sendSecond, sendMiliSeconds, uid })
        .then(saveRecents({ message,  sendDate, sendMonth, sendYear, sendHour, sendMinute, sendSecond, sendMiliSeconds, uid, senderUid }))
        .then(dispatch({ type: SEND_MESSAGE_SUCCESS }))
}
export const readGroupMessage = ({uid})=> (dispatch) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/Users/${currentUser.uid}/Groups/${uid}/lastMessage/`)
    .update({isRead : true})
}
const saveRecents = ({ message,  sendDate, sendMonth, sendYear, sendHour, sendMinute, sendSecond, sendMiliSeconds, uid, senderUid }) => {
    firebase.database().ref(`/Groups/${uid}/Users`).once('value', snapshot => {
        snapshot.forEach(snap => {
            if (snap.val() == senderUid) {
                firebase.database().ref(`/Users/${snap.val()}/Groups/${uid}/lastMessage/`)
                    .update({ message,  sendDate, sendMonth, sendYear, sendHour, sendMinute, sendSecond, sendMiliSeconds, isRead: true })
            }
            else {
                firebase.database().ref(`/Users/${snap.val()}/Groups/${uid}/lastMessage/`)
                    .update({ message,  sendDate, sendMonth, sendYear, sendHour, sendMinute, sendSecond, sendMiliSeconds, isRead: false })
            }

        })
    })
}
function generateId() {
    return Math.random().toString(36).substr(2, 9)
}
