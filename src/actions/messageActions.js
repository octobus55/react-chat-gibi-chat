import firebase from "../config/firebase";
import {
    SEND_MESSAGE,
    SEND_MESSAGE_SUCCESS,
    MESSAGE_CHANGED
} from './types';

export const messageChanged = (value) => {
    return (dispatch) => {
        dispatch({
            type: MESSAGE_CHANGED,
            payload: value
        });
    };
};
const sendMessageSuccess = (dispatch) =>{
    console.log("gönderme başarılı");
    
    dispatch({
        type: SEND_MESSAGE_SUCCESS
    });
    
}
export const sendMessage = ({ message, selectedUser: otherUser }) => (dispatch) => {
    const { currentUser } = firebase.auth();
    dispatch({
        type: SEND_MESSAGE
    })
    console.log('2', otherUser);
    if(message && otherUser)
    {
        firebase.database().ref(`/Users/${currentUser.uid}/outgoingMessages/${otherUser}`)
        .push({ message })
        .then(
            firebase.database().ref(`/Users/${otherUser}/incomingMessages/${currentUser.uid}`)
                .push({ message })
                .then(sendMessageSuccess(dispatch))
        )
    }
}