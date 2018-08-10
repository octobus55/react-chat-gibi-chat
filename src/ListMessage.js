import React, { Component } from 'react'
import firebase from 'firebase';
import { List} from '@material-ui/core';
import ListItemMessage from './ListItemMessage';


class ListMessage extends Component {

    render() {
        const { selectedUser } = this.props;
        const {currentUser} = firebase.auth();
        if(!currentUser) return null;
        return (
            <List style={{ overflow: 'auto', maxHeight: window.innerHeight - 120 }}>
                {this.props.messagesArray.map((value, index) =>
                
                    <ListItemMessage
                    selectedUser = {selectedUser}
                    value = {value.message}
                    index = {index}
                    sendTime = {value.sendHour + " : " + value.sendMinute}
                    isSamePerson = {index === 0 ? false : 
                        this.props.messagesArray[index].senderUid === this.props.messagesArray[index - 1].senderUid}
                    isSendByMe = {this.props.messagesArray[index].senderUid === currentUser.uid}
                    name = {value.senderName}
                    />
                )}
            </List>

        )
    }
}
export default ListMessage;