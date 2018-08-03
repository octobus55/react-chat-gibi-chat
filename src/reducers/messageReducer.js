import {
    SEND_MESSAGE,
    SEND_MESSAGE_SUCCESS,
    MESSAGE_CHANGED,
    LOAD_MESSAGES,
    LOAD_MESSAGES_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    message: '',
    messageSending: false,
    loadingMessage: false,

};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return { ...state, messageSending: true };
        case LOAD_MESSAGES:
            return action.payload;
        case LOAD_MESSAGES_SUCCESS:
        console.log("loadSuccess")
            return {...state, loadingMessage : true};
        case SEND_MESSAGE_SUCCESS:
            return { ...state, message: '',  messageSending: false };
        case MESSAGE_CHANGED:
            return { ...state, message: action.payload };
        default:
            return state;
    }
}