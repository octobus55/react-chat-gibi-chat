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
    UserUid: {message: ''},
    LoadedMessages: [],

};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return { ...state, messageSending: true };
        case LOAD_MESSAGES:
        state.LoadedMessages[0] = action.payload;
            return {...state};
        case LOAD_MESSAGES_SUCCESS:
            return {...state, loadingMessage : true};
        case SEND_MESSAGE_SUCCESS:
            return { ...state, message: '',  messageSending: false};
        case MESSAGE_CHANGED:
            return { ...state, message: action.payload};
        default:
            return state;
    }
}