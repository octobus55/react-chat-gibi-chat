import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Grid,
} from '@material-ui/core';

import ListMessage from './MessageScreen/ListMessage';

import '.././styles.css'
class ChatPanel extends Component{
    handleResize = () => {
        this.forceUpdate();
    };
    componentWillMount() {
        this.handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }

    componentDidUpdate = () => {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        const elem = document.querySelector('.scrollableContianer ul');
        if (elem) {
            elem.scrollTop = elem.scrollHeight;
        }
    };
    render(){
        const {usersArray, messagesArray, groupMessagesArray} = this.props;
        return(
            <Grid container xs={8} sm={8} md={8} lg={8} direction='row' alignItems='stretch'
                    className='GridListMessage'>
                    {
                        this.props.isSelected &&
                        <ListMessage
                            selectedUser={this.props.selectedUser}
                            selectedUserName={this.props.selectedUserName}
                            selectedUserType={this.props.selectedUserType}
                            groupName = {this.props.selectedUserName}
                            usersArray={this.props.selectedUserType === 'Group' ? usersArray : []}
                            messagesArray={this.props.selectedUserType === 'User' ?
                                _.map(messagesArray, (val) => {
                                    return { ...val };
                                }) : _.map(groupMessagesArray, (val) => {
                                    return { ...val };
                                })}
                        />
                    }
                </Grid>
        )
    }
}
const mapStatetoProps = ({ UserResponse, PanelResponse, MessageResponse, GroupResponse }) => {
    const { Users } = UserResponse;
    const {  LoadedMessages } = MessageResponse;
    const {  GroupMessages } = GroupResponse;
    const {selectedUserType, selectedUser, selectedUserName, isSelected} = PanelResponse;
    return {
        usersArray: (Users || []),
        messagesArray: (LoadedMessages || []),
        groupMessagesArray: (GroupMessages || []),
        selectedUserType,
        selectedUser,
        selectedUserName,
        isSelected,
    };
};

export default connect (mapStatetoProps, {})(ChatPanel);