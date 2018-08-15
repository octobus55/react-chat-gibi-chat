import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import firebase from 'firebase';
import { List, Paper, AppBar, Toolbar, Typography, Menu, IconButton, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItemMessage from './ListItemMessage';
import AddPerson from './AddPerson';
import {groupUsers} from './actions/groupActions';
import RemovePerson from './RemovePerson';

class ListMessage extends Component {
    state = {
        openMenu: null,
        openAdd: false,
        openRemove: false,
    };

    handleClick = event => {
        this.setState({ openMenu: event.currentTarget });
    };

    handleCloseMenu = () => {
        this.setState({ openMenu: null });
    };
    handleClickOpenAdd = () => {
        this.setState({
            openAdd: true,
        });
    };
    handleClickOpenRemove = () => {
        this.setState({
            openRemove: true,
        });
    };
    handleClose = () => {
        this.setState({ open: false });
        this.handleCloseMenu();
    };
    handleCloseAdd = () => {
        this.setState({ openAdd: false });
        this.handleCloseMenu();
    };
    handleCloseRemove = () => {
        this.setState({ openRemove: false });
        this.handleCloseMenu();
    };
    render() {
        const { openMenu } = this.state;
        const { selectedUser, selectedUserName, selectedUserType } = this.props;
        const { currentUser } = firebase.auth();
        if (!currentUser) return null;
        return (
            <Paper className={'scrollableContianer'}
                style={{
                    overflowY: 'hidden', overflowX: 'hidden',
                    maxHeight: window.innerHeight - 130, width: 2 * window.innerWidth / 3
                }}>
                <AppBar position="sticky" color="default">
                    <Toolbar variant='dense'>
                        <Typography variant="title" color="inherit" style={{ flexGrow: 1 }}>
                            {selectedUserName}
                        </Typography>
                        {
                            selectedUserType === 'Group' &&
                            <IconButton
                                aria-owns={openMenu ? 'simple-menu' : null}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        }
                        <Menu
                            id="simple-menu"
                            anchorEl={openMenu}
                            open={Boolean(openMenu)}
                            onClose={this.handleCloseMenu}
                        >
                            <MenuItem onClick={this.handleClickOpenAdd}>Add Person</MenuItem>
                            <MenuItem onClick={this.handleClickOpenRemove}>Remove Person</MenuItem>
                        </Menu>
                        {
                            this.props.groupUsersFinished &&
                            <AddPerson
                            open={this.state.openAdd}
                            onClose={this.handleCloseAdd}
                            usersArray={this.props.usersArray}
                            groupUsersArray = {this.props.groupUsersArray}
                            selectedUser = {this.props.selectedUser}
                            selectedUserName = {this.props.selectedUserName}
                            />
                        }
                        {
                            this.props.groupUsersInfoFinished &&
                            <RemovePerson
                            open={this.state.openRemove}
                            onClose={this.handleCloseRemove}
                            usersArray={this.props.usersArray}
                            groupUsersInfoArray = {this.props.groupUsersInfoArray}
                            selectedUser = {this.props.selectedUser}
                            selectedUserName = {this.props.selectedUserName}
                            />
                        }
                        
                    </Toolbar>
                </AppBar>
                <List style={{ overflow: 'auto', maxHeight: window.innerHeight - 180 }}>
                    {this.props.messagesArray.map((value, index) =>
                        <ListItemMessage
                            selectedUser={selectedUser}
                            value={value.message}
                            index={index}
                            sendTime={value.sendHour + " : " + value.sendMinute}
                            isSamePerson={index === 0 ? false :
                                this.props.messagesArray[index].senderUid === this.props.messagesArray[index - 1].senderUid}
                            isSendByMe={this.props.messagesArray[index].senderUid === currentUser.uid}
                            name={value.senderName}
                        />
                    )}
                </List>
            </Paper>
        )
    }
}
const mapStatetoProps = ({GroupResponse }) => {
    const {  GroupUsers, groupUsersFinished, groupUsersInfo, groupUsersInfoFinished } = GroupResponse;
    
    return {
        groupUsersArray: GroupUsers[0],
        groupUsersFinished,
        groupUsersInfoFinished,
        groupUsersInfoArray : groupUsersInfo,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        groupUsers : bindActionCreators (groupUsers, dispatch),
    };
}
export default connect(mapStatetoProps,mapDispatchToProps)(ListMessage);