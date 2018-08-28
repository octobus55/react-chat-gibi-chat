import {
    SELECT_USER,
    SELECT_USER_INFO,
} from '../actions/types';

const INITIAL_STATE = {
    selectedUser: '',
    isSelected: false,
    selectedUserType: '',
    selectedUserName: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_USER:
            return { ...state, selectedUser: action.payload, isSelected: true};
        case SELECT_USER_INFO:
            return { ...state, selectedUserType: action.payload, selectedUserName: action.payload2};
        default:
            return state;
    }
}