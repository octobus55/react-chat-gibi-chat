import {
    MY_GROUPS_DATA,
    LOAD_GROUP_MESSAGES,
    GROUP_USERS,
    GROUP_USERS_SUCCESS,
    GROUP_USER_INFO,
    GROUP_USER_INFO_SUCCESS,
    CREATE_GROUP_SUCCESS,
    CREATE_GROUP,
} from "../actions/types";
const INITIAL_STATE = {
    myGroups: [],
    GroupMessages: [],
    GroupUsers: [],
    groupUsersFinished: false,
    groupUsersInfo: [],
    groupUsersInfoFinished: false,
    createGroupFinished: true,
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MY_GROUPS_DATA:
            return { ...state, myGroups : action.payload };
        case LOAD_GROUP_MESSAGES:
            return { ...state, GroupMessages : action.payload };
        case GROUP_USERS:
            return { ...state, groupUsersFinished: false };
        case GROUP_USERS_SUCCESS:
            return { ...state, GroupUsers :action.payload, groupUsersFinished: true };
        case GROUP_USER_INFO:
            return { ...state, groupUsersInfoFinished: false }
        case GROUP_USER_INFO_SUCCESS:
            state.groupUsersInfo = action.payload;
            return { ...state, groupUsersInfoFinished: true }
        case CREATE_GROUP:
            return { ...state, createGroupFinished: false }
        case CREATE_GROUP_SUCCESS:
            return { ...state, createGroupFinished: true }
        default:
            return state;
    }
}