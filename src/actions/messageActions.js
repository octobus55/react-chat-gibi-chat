import firebase from "../config/firebase";
import {
    SEND_MESSAGE,
    SEND_MESSAGE_SUCCESS,
    MESSAGE_CHANGED,
    LOAD_MESSAGES,
} from './types';

export const messageChanged = (value) => (dispatch) => {
    dispatch({
        type: MESSAGE_CHANGED,
        payload: value,
    });
};

const sendMessageSuccess = (dispatch) => {
    dispatch({
        type: SEND_MESSAGE_SUCCESS
    });
}

export const saveRecents = ({
    message,
    sendDate,
    sendHour,
    sendMinute,
    sendSecond,
    sendMiliSeconds,
    senderUid,
    senderName,
    otherUser,
    currentUser,
    otherUserName }) => {
    const isRead = true;
    firebase.database().ref(`/Recents/${currentUser.uid}/lastMessage/${otherUser}`)
        .update({
            message,
            sendDate,
            sendHour,
            sendMinute,
            sendSecond,
            sendMiliSeconds,
            Useruid: otherUser,
            name: otherUserName,
            isRead
        })
        .then(
            firebase.database().ref(`/Recents/${otherUser}/lastMessage/${currentUser.uid}`)
                .update({
                    message,
                    sendDate,
                    sendHour,
                    sendMinute,
                    sendSecond,
                    sendMiliSeconds,
                    Useruid: senderUid,
                    name: senderName,
                    isRead: false
                })
        )
}

export const sendMessage = ({
    message,
    selectedUser: otherUser,
    myName: senderName,
    selectedUserName: otherUserName
}) => (dispatch) => {

    dispatch({
        type: SEND_MESSAGE
    })
    if (message && otherUser) {
        const { currentUser } = firebase.auth();
        var today = new Date();
        const sendDate = today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();
        const sendSecond = today.getSeconds();
        const sendHour = today.getHours();
        var sendMinute = today.getMinutes();
        const sendMiliSeconds = today.getMilliseconds();
        const senderUid = currentUser.uid;
        if (sendMinute < 10) {
            sendMinute = '0' + sendMinute;
        }
        if (currentUser.uid !== otherUser)
            firebase.database().ref(`/Users/${currentUser.uid}/messages/${otherUser}`)
                .push({ message, sendDate, sendHour, sendMinute, senderUid, senderName })
                .then(
                    firebase.database().ref(`/Users/${otherUser}/messages/${currentUser.uid}`)
                        .push({ message, sendDate, sendHour, sendMinute, sendSecond, sendMiliSeconds, senderUid, senderName })
                        .then(saveRecents({
                            message, sendDate, sendHour, sendMinute, sendSecond, sendMiliSeconds, senderUid,
                            senderName, otherUser, currentUser, otherUserName
                        }))
                        .then(sendMessageSuccess(dispatch))
                )
        else {
            firebase.database().ref(`/Users/${currentUser.uid}/messages/${otherUser}`)
                .push({ message, sendDate, sendHour, sendMinute, sendSecond, sendMiliSeconds, senderUid, senderName })
                .then(saveRecents({
                    message, sendDate, sendHour, sendMinute, sendSecond, sendMiliSeconds, senderUid,
                    senderName, otherUser, currentUser, otherUserName
                }))
                .then(sendMessageSuccess(dispatch))
        }
    }
}

export const loadMessages = ({ uid: otherUser }) => (dispatch) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/Users/${currentUser.uid}/messages/${otherUser}`)
        .on('value', snapshot => {
            dispatch({ type: LOAD_MESSAGES, payload: snapshot.val() })
        })
}

export const readMessage = ({ selectedUser: otherUser }) => (dispatch) => {
    const { currentUser } = firebase.auth();
    const isRead = true;
    firebase.database().ref(`/Recents/${currentUser.uid}/lastMessage/${otherUser}`)
        .update({ isRead })
}

export const offMessageListener = ({ uid: otherUser }) => (dispatch) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/Users/${currentUser.uid}/messages/${otherUser}`).off('value')
}