import {
    MESSAGE_CHANGED,
} from '../actions/types';

const INITIAL_STATE = {
    message: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MESSAGE_CHANGED:
            return { ...state, message: action.payload};
        default:
            return state;
    }
}