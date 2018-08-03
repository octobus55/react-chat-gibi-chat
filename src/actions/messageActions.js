import firebase from "../config/firebase";
import {
    SEND_MESSAGE,
    SEND_MESSAGE_SUCCESS,
    MESSAGE_CHANGED,
    LOAD_MESSAGES,
    LOAD_MESSAGES_SUCCESS
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
    console.log(currentUser.uid);
    dispatch({
        type: SEND_MESSAGE
    })
    if(message && otherUser)
    {
        console.log(currentUser.uid);
        firebase.database().ref(`/Users/${currentUser.uid}/messages/${otherUser}`)
        .push({message})
        .then(
            firebase.database().ref(`/Users/${otherUser}/messages/${currentUser.uid}`)
            .push({message})
            .then(sendMessageSuccess(dispatch))
        )
    }
}

const loadMessagesSuccess = () => (dispatch) => {
    dispatch({type: LOAD_MESSAGES_SUCCESS})
}
export const loadMessages = ({selectedUser: otherUser}) => (dispatch) => {
    const { currentUser } = firebase.auth();
    firebase.database().ref(`/Users/${currentUser.uid}/messages/${otherUser}`)
    .on('value', snapshot =>{
        console.log(snapshot.val())
        dispatch({type: LOAD_MESSAGES, payload: snapshot.val()})
        
    })
    
}