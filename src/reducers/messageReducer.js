import {
    SEND_MESSAGE,
    SEND_MESSAGE_SUCCESS,
    MESSAGE_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
    message: '',
    messageSending: false,

};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return { ...state, messageSending: true };
        case SEND_MESSAGE_SUCCESS:
            return { ...state, message: '',  messageSending: false };
            case MESSAGE_CHANGED:
            return { ...state, message: action.payload };
        default:
            return state;
    }
}