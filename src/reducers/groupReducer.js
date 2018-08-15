import {
    MY_GROUPS_DATA,
    LOAD_GROUP_MESSAGES,
    GROUP_USERS,
    GROUP_USERS_SUCCESS,
    GROUP_USER_INFO,
    GROUP_USER_INFO_SUCCESS,
} from "../actions/types";
const INITIAL_STATE = {
    myGroups: [],
    GroupMessages: [],
    GroupUsers: [],
    groupUsersFinished: false,
    groupUsersInfo: [],
    groupUsersInfoFinished: false,
};
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case MY_GROUPS_DATA:
            state.myGroups[0] = action.payload;
            return { ...state };
        case LOAD_GROUP_MESSAGES:
            state.GroupMessages[0] = action.payload;
            return {...state};
        case GROUP_USERS:
            return {...state, groupUsersFinished: false};
        case GROUP_USERS_SUCCESS:
            state.GroupUsers[0] = action.payload;
            return {...state, groupUsersFinished: true};
            case GROUP_USER_INFO:
            return{...state, groupUsersInfoFinished : false}
        case GROUP_USER_INFO_SUCCESS:
            state.groupUsersInfo = action.payload;
            return{...state, groupUsersInfoFinished : true}
        default:
            return state;
    }
}