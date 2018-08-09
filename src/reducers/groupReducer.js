import {
    MY_GROUPS_DATA,
    LOAD_GROUP_MESSAGES
} from "../actions/types";
const INITIAL_STATE = {
    myGroups: [],
    GroupMessages: [],
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MY_GROUPS_DATA:
            state.myGroups.push(action.payload);
            return { ...state };
        case LOAD_GROUP_MESSAGES:
            state.GroupMessages[0] = action.payload;
            return {...state};
        default:
            return state;
    }
}