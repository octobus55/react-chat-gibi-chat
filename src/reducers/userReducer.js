import {
    USERS_DATA,
} from "../actions/types";
const INITIAL_STATE = {
    message: '',
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USERS_DATA:
            return action.payload;
        default:
            return state;
    }
}