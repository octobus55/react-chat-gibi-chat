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
            state.Users.push(action.payload)
            return { ...state };
        case MY_DATA:
            return { ...state, myName: action.payload }
        case RECENTS_DATA:
        state.Recents[0] = action.payload;
            return { ...state }
        default:
            return state;
    }
}