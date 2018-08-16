import {
    USERS_DATA,
    MY_DATA,
    RECENTS_DATA,
} from "../actions/types";
const INITIAL_STATE = {
    myName: '',
    Users: [],
    Recents: []
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USERS_DATA:
            return { ...state, Users : action.payload };
        case MY_DATA:
            return { ...state, myName: action.payload }
        case RECENTS_DATA:
            return { ...state, Recents: action.payload }
        default:
            return state;
    }
}