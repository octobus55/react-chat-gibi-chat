import React, { Component } from 'react';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { List, Paper, AppBar, Toolbar, Typography, Menu, IconButton, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ListItemMessage from './ListItemMessage';
import AddPerson from './AddPerson';
import RemovePerson from './RemovePerson';
import GroupInfo from './GroupInfo';

class ListMessage extends Component {
    state = {
        openMenu: null,
        openAdd: false,
        openRemove: false,
        openInfo: false,
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

    handleClickOpenInfo = () => {
        this.setState({
            openInfo: true,
        });
    };

    handleCloseInfo = () => {
        this.setState({ openInfo: false });
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
            <Paper className={'scrollableContianer'}>
                <AppBar position="sticky" color="default" style={{backgroundColor: '#5F72FF'}}>
                    <Toolbar variant='dense'>
                        <Typography variant="title" color="inherit" style={{ flexGrow: 1}}>
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
                            <MenuItem onClick={this.handleClickOpenInfo}>Group Information</MenuItem>
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
                            groupUsersInfoArray = {this.props.groupUsersInfoArray}
                            selectedUser = {this.props.selectedUser}
                            selectedUserName = {this.props.selectedUserName}
                            />
                        }   
                        {
                            this.props.groupUsersInfoFinished &&
                            <GroupInfo
                            open={this.state.openInfo}
                            onClose={this.handleCloseInfo}
                            groupUsersInfoArray = {this.props.groupUsersInfoArray}
                            />
                        }                      
                    </Toolbar>
                </AppBar>
                <List className='ListMessage'>
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
        groupUsersArray: GroupUsers,
        groupUsersFinished,
        groupUsersInfoFinished,
        groupUsersInfoArray : groupUsersInfo,
    };
};
export default connect(mapStatetoProps,{})(ListMessage);