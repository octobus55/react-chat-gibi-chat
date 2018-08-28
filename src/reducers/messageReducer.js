import {
    SEND_MESSAGE,
    SEND_MESSAGE_SUCCESS,
    LOAD_MESSAGES,
} from '../actions/types';

const INITIAL_STATE = {
    messageSending: false,
    loadingMessage: false,
    LoadedMessages: [],
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return { ...state, messageSending: true };
        case LOAD_MESSAGES:
            return {...state, LoadedMessages : action.payload};
        case SEND_MESSAGE_SUCCESS:
            return { ...state, message: '',  messageSending: false};
        default:
            return state;
    }
}