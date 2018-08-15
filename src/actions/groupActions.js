import firebase from '../config/firebase';
import {
    MY_GROUPS_DATA,
    LOAD_GROUP_MESSAGES,
    SEND_MESSAGE_SUCCESS,
    GROUP_USERS,
    GROUP_USERS_SUCCESS,
    GROUP_USER_INFO,
    GROUP_USER_INFO_SUCCESS,
} from "./types";

export const createGroup = ({ checked: users, groupName }) => (dispatch) => {
    const groupId = generateId();
    firebase.database().ref(`/Groups/${groupId}`).update({ groupName, groupId })
        .then(firebase.database().ref(`/Groups/${groupId}`).update({ Users: users }))
        .then(users.forEach(user => {
            firebase.database().ref(`/Users/${user}/Groups/${groupId}`).update({ groupName, groupId })
        }))
        .then(sendGroupMessage({ message: "", selectedUser: groupId, myName: "create" }))

}
export const myGroupsData = () => (dispatch) => {
    const { currentUser } = firebase.auth();
    const tempData = [];

    firebase.database().ref(`/Users/${currentUser.uid}/Groups`).on('value', snapshot => {
        var counter = 0;
        snapshot.forEach(snap => {
            tempData[counter++] = snap.val();
        })
        tempData.sort(function (a, b) {
            if (a.lastMessage && b.lastMessage) {
                if (a.lastMessage.sendDate === b.lastMessage.sendDate) {
                    if (a.lastMessage.sendHour === b.lastMessage.sendHour) {
                        if (a.lastMessage.sendMinute === b.lastMessage.sendMinute) {
                            if (a.lastMessage.sendSecond === b.lastMessage.sendSecond) {
                                return b.lastMessage.sendMiliSeconds - a.lastMessage.sendMiliSeconds;
                            }
                            return b.lastMessage.sendSecond - a.lastMessage.sendSecond;
                        }
                        return b.lastMessage.sendMinute - a.lastMessage.sendHour;
                    }
                    return b.lastMessage.sendHour - a.lastMessage.sendHour;
                }
                return b.lastMessage.sendDate - a.lastMessage.sendDate;
            }
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
    var sendMinute = today.getMinutes();
    if (sendMinute < 10) {
        sendMinute = '0' + sendMinute;
    }
    const sendMiliSeconds = today.getMilliseconds();
    const senderUid = currentUser.uid;
    firebase.database().ref(`/Groups/${uid}/messages/`)
        .push({ message, senderName, senderUid, sendDate, sendMonth, sendYear, sendHour, sendMinute, sendSecond, sendMiliSeconds, uid })
        .then(saveRecents({ message, sendDate, sendMonth, sendYear, sendHour, sendMinute, sendSecond, sendMiliSeconds, uid, senderUid }))
        .then(dispatch({ type: SEND_MESSAGE_SUCCESS }))
}
export const readGroupMessage = ({ uid }) => (dispatch) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/Users/${currentUser.uid}/Groups/${uid}/lastMessage/`)
        .update({ isRead: true })
}
const saveRecents = ({ message, sendDate, sendMonth, sendYear, sendHour, sendMinute, sendSecond, sendMiliSeconds, uid, senderUid }) => {
    firebase.database().ref(`/Groups/${uid}/Users`).once('value', snapshot => {
        snapshot.forEach(snap => {
            if (snap.val() === senderUid) {
                firebase.database().ref(`/Users/${snap.val()}/Groups/${uid}/lastMessage/`)
                    .update({ message, sendDate, sendMonth, sendYear, sendHour, sendMinute, sendSecond, sendMiliSeconds, isRead: true })
            }
            else {
                firebase.database().ref(`/Users/${snap.val()}/Groups/${uid}/lastMessage/`)
                    .update({ message, sendDate, sendMonth, sendYear, sendHour, sendMinute, sendSecond, sendMiliSeconds, isRead: false })
            }
        })
    })
}
export const addPerson = ({ checked: newUsers, groupName, uid, users }) => (dispatch) => {
    const { currentUser } = firebase.auth();
    users = users.concat(newUsers);
    firebase.database().ref(`/Groups/${uid}`).update({ Users: users })
        .then(newUsers.forEach(newUser => {
            firebase.database().ref(`/Users/${newUser}/Groups/${uid}`).update({ groupName, groupId: uid })
                .then(firebase.database().ref(`/Users/${currentUser.uid}/Groups/${uid}/lastMessage`).once('value', snapshot => {
                    firebase.database().ref(`/Users/${newUser}/Groups/${uid}/lastMessage`).update(snapshot.val());
                }))
        }))
}
export const removePerson = ({ checked: removedUsers, uid, users }) => (dispatch) => {
    removedUsers.forEach(remUser => {
        users.splice(users.indexOf(remUser), 1);
    })
    const tempUserUids = [];
    users.forEach(user => tempUserUids.push(user.uid))
    firebase.database().ref(`/Groups/${uid}`).update({ Users: tempUserUids })
        .then(removedUsers.forEach(remUser => {
            firebase.database().ref(`/Users/${remUser}/Groups/${uid}`).remove()
        }))
}
export const groupUsers = ({ uid }) => (dispatch) => {
    dispatch({ type: GROUP_USERS })
    firebase.database().ref(`/Groups/${uid}/Users`).once('value', snapshot => {
        dispatch({ type: GROUP_USERS_SUCCESS, payload: snapshot.val() })
    })
}
export const groupUsersInfo = ({ uid }) => (dispatch) => {
    dispatch({ type: GROUP_USER_INFO })
    const userInfo = [];
    firebase.database().ref(`/Groups/${uid}/Users`).once('value', snapshot => {
        snapshot.forEach(snap => {
            firebase.database().ref(`/Users/${snap.val()}/UserInfo`).once('value', userSnapshot => {
                userSnapshot.forEach(userSnap => {
                    userInfo.push(userSnap.val())
                })
            })
        })
        dispatch({ type: GROUP_USER_INFO_SUCCESS, payload: userInfo })
    })
}
function generateId() {
    return Math.random().toString(36).substr(2, 9)
}
