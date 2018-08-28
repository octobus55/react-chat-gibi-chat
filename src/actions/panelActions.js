import {
    SELECT_USER,
    SELECT_USER_INFO,
} from '../actions/types';

export const selectUser = ({ uid : selectedUser}) => (dispatch) => {
    dispatch({
        type: SELECT_USER,
        payload: selectedUser
    })
}

export const selectUserInfo = ({ selectedUserType, selectedUserName}) => (dispatch) => {
    dispatch({
        type: SELECT_USER_INFO,
        payload: selectedUserType,
        payload2: selectedUserName,
    })
}