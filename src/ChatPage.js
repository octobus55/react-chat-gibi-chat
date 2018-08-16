import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    List, ListItem, ListItemAvatar,
    ListItemText, ListItemSecondaryAction, Avatar, TextField,
    Paper, Tabs, Tab, Grid, IconButton, Button, AppBar, Toolbar,
    Typography
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIcon from '@material-ui/icons/Phone';
import GroupIcon from '@material-ui/icons/Group';
import MessageIcon from '@material-ui/icons/Message';
import SendIcon from '@material-ui/icons/Send';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import ForumIcon from '@material-ui/icons/Forum';

import ListMessage from './ListMessage';
import CreateGroupPage from './CreateGroupPage';
import { usersAllData, myData, recentsData } from './actions/userActions';
import { messageChanged, sendMessage, loadMessages, readMessage, offMessageListener } from './actions/messageActions';
import { logout } from './actions/authActions';
import {
    myGroupsData,
    loadGroupMessages,
    sendGroupMessage,
    offGroupMessageListener,
    readGroupMessage,
    groupUsers,
    groupUsersInfo
} from './actions/groupActions';

class ChatPage extends Component {
    constructor(props) {
        super(props);
        this.handleSelectUser = this.handleSelectUser.bind(this);
        this.handleClickSend = this.handleClickSend.bind(this);
    }

    state = {
        tabValue: 0,
        isSelected: false, secondary: false, selectedUser: '', selectedUserType: '', selectedUserName: '',
        authenticated: false, open: false, windowHeight: undefined, windowWidth: undefined
    }

    handleResize = () => this.setState({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth
    });

    componentWillMount() {
        this.handleResize();
        this.props.usersAllData();
        this.props.recentsData();
        this.props.myGroupsData();
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

    handleLogOut = () => {
        const { offGroupMessageListener, logout } = this.props;
        if (this.state.selectedUserType === 'User') {
            const uid = this.state.selectedUser;
            offMessageListener({uid})
            logout()
        }
        else if (this.state.selectedUserType === 'Group') {
            const uid = this.state.selectedUser;
            offGroupMessageListener({ uid })
            logout()
        }
        else {
            logout()
        }
    }

    handleSelectUser = (uid, name) => () => {
        this.props.myData();
        if (this.state.selectedUserType === 'User') {
            const { selectedUser } = this.state;
            this.props.offMessageListener({ uid: selectedUser })
        }
        else if (this.state.selectedUserType === 'Group') {
            const { selectedUser } = this.state;
            this.props.offGroupMessageListener({ selectedUser })
        }
        this.setState({ isSelected: true, selectedUser: uid });
        if (this.state.tabValue === 1) {
            this.setState({ selectedUserType: 'Group', selectedUserName: name })
            this.props.groupUsers({ uid })
            this.props.groupUsersInfo({ uid })
            this.props.loadGroupMessages({ uid })
            this.props.readGroupMessage({ uid });
        }
        else {
            this.setState({ selectedUserType: 'User', selectedUserName: name })
            this.props.loadMessages({ uid });
            this.props.readMessage({ selectedUser: uid });
        }
    };

    handleClickSend = () => {
        const { message, myName } = this.props;
        const { selectedUser, selectedUserName, selectedUserType } = this.state;
        if (message && selectedUser && myName) {
            if (selectedUserType === 'User') {
                this.props.sendMessage({ message, selectedUser, myName, selectedUserName });
            }
            else {
                this.props.sendGroupMessage({ message, selectedUser, myName })
            }
        }
    };

    handleTabChange = (event, tabValue) => {
        this.setState({ tabValue });
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <Grid container >
                <Grid container direction='column' alignItems='stretch'>
                    <AppBar position="static" color='primary'>
                        <Toolbar variant='dense'>
                            <IconButton style={{ marginLeft: -12, marginRight: 20 }} color="inherit" aria-label="Menu">
                                <ForumIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" style={{ flexGrow: 1 }}>
                                Chat Gibi Chat
                            </Typography>
                            <Button size="large" color="inherit"
                                onClick={this.handleClickOpen} > <b>Create A Group</b> </Button>
                            <CreateGroupPage
                                open={this.state.open}
                                onClose={this.handleClose}
                                usersArray={this.props.usersArray}
                            />
                            <Button size="large" color="inherit"
                                onClick={this.handleLogOut} > <b>LogOut</b> </Button>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid container xs={4} sm={4} md={4} lg={4} direction='row' alignItems='stretch'
                    style={{ minHeight: this.state.windowHeight - 50 }}>
                    <Paper style={{ width: (this.state.windowWidth / 3) - 20 }}>
                        <Tabs
                            value={this.state.tabValue}
                            onChange={this.handleTabChange}
                            fullWidth
                            indicatorColor='primary'
                            textColor="primary"
                            variant='dense'
                        >
                            <Tab icon={<MessageIcon />} label="RECENTS" />
                            <Tab icon={<GroupIcon />} label="GROUPS" />
                            <Tab icon={<PhoneIcon />} label="FIND SOMEONE" />
                        </Tabs>
                        {this.state.tabValue === 0 && <Paper style={{ overflow: 'auto', maxHeight: this.state.windowHeight }}
                        >
                            <List style={{ overflow: 'auto', maxHeight: this.state.windowHeight }}>
                                {
                                    this.props.recentsArray.map((value) =>
                                    <ListItem key={value.Useruid} divider button
                                        onClick={this.handleSelectUser(value.Useruid, value.name)}>
                                        <ListItemAvatar style={{ backgroundColor: '#303f9f' }}>
                                            <Avatar>
                                                <PersonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={value.name}
                                            secondary={value.message}
                                        />
                                        {
                                            !value.isRead && <ListItemSecondaryAction>
                                            <IconButton aria-label="PlusOne">
                                                < PlusOneIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>}
                                    </ListItem>
                                )}
                            </List>
                        </Paper>
                        }
                        {this.state.tabValue === 1 && this.props.createGroupFinished && <Paper 
                        style={{ overflow: 'auto', maxHeight: this.state.windowHeight }}
                        >
                            <List style={{ overflow: 'auto', maxHeight: this.state.windowHeight }}>
                                {
                                    this.props.myGroupsArray.map((value) =>
                                    <ListItem key={value.groupId} divider button
                                        onClick={this.handleSelectUser(value.groupId, value.groupName)}>
                                        <ListItemAvatar style={{ backgroundColor: '#303f9f' }}>
                                            <Avatar>
                                                <PersonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={value.groupName}
                                            secondary={value.lastMessage.message}
                                        />
                                        {
                                            !value.lastMessage.isRead && <ListItemSecondaryAction>
                                            <IconButton disabled aria-label="PlusOne">
                                                < PlusOneIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>}
                                    </ListItem>
                                )}
                            </List>
                        </Paper>
                        }
                        {this.state.tabValue === 2 && <Paper style={{ overflow: 'auto', maxHeight: this.state.windowHeight }}
                        >
                            <List style={{ overflow: 'auto', maxHeight: this.state.windowHeight }}>
                                {
                                    this.props.usersArray.map((value) =>
                                    <ListItem key={value.uid} button onClick={this.handleSelectUser(value.uid, value.name)}
                                        divider >
                                        <ListItemAvatar style={{ backgroundColor: '#303f9f' }}>
                                            <Avatar>
                                                <PersonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={value.name}
                                            secondary="Click to Start Conversation!"
                                        />
                                    </ListItem>
                                )}
                            </List>
                        </Paper>
                        }
                    </Paper>
                </Grid>
                <Grid container xs={8} sm={8} md={8} lg={8} direction='row' alignItems='stretch'
                    style={{ maxHeight: this.state.windowHeight }}>
                    {
                        this.state.isSelected &&
                        <ListMessage
                            selectedUser={this.state.selectedUser}
                            selectedUserName={this.state.selectedUserName}
                            selectedUserType={this.state.selectedUserType}
                            usersArray={this.state.selectedUserType === 'Group' ? this.props.usersArray : []}
                            messagesArray={this.state.selectedUserType === 'User' ?
                                _.map(this.props.messagesArray, (val) => {
                                    return { ...val };
                                }) : _.map(this.props.groupMessagesArray, (val) => {
                                    return { ...val };
                                })}
                        />
                    }
                </Grid>
                <Grid container xs={8} sm={8} md={8} lg={8} direction='column' alignItems='stretch'
                    style={{ position: 'absolute', bottom: 20, right: 10 }}>
                    {   
                        this.state.isSelected &&
                        <Paper style={{ backgroundColor: '#9999ff', borderRadius: 10, paddingLeft: 15 }}>
                            <TextField
                                placeholder="Type Something..."
                                multiline
                                rowsMax={2}
                                style={{ width: (2 * this.state.windowWidth / 3) - 80 }}
                                onChange={e => this.props.messageChanged(e.target.value)}
                                value={this.props.message}
                            />
                            <IconButton aria-label="Send" color='primary'
                                onClick={this.handleClickSend}>
                                <SendIcon />
                            </IconButton>
                        </Paper >
                    }
                </Grid>
            </Grid>
        )
    }
}

const mapStatetoProps = ({ UserResponse, MessageResponse, GroupResponse }) => {
    var { message } = MessageResponse;
    const { loadingMessage, LoadedMessages } = MessageResponse;
    const { Users, myName, Recents } = UserResponse;
    const { myGroups, GroupMessages, createGroupFinished } = GroupResponse;
    return {
        usersArray: (Users || []),
        message: (message || []),
        loadingMessage,
        messagesArray: (LoadedMessages || []),
        myName: (myName || []),
        recentsArray: (Recents || []),
        myGroupsArray: (myGroups || []),
        groupMessagesArray: (GroupMessages || []),
        createGroupFinished,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        usersAllData: bindActionCreators(usersAllData, dispatch),
        messageChanged: bindActionCreators(messageChanged, dispatch),
        sendMessage: bindActionCreators(sendMessage, dispatch),
        loadMessages: bindActionCreators(loadMessages, dispatch),
        myData: bindActionCreators(myData, dispatch),
        readMessage: bindActionCreators(readMessage, dispatch),
        offMessageListener: bindActionCreators(offMessageListener, dispatch),
        recentsData: bindActionCreators(recentsData, dispatch),
        logout: bindActionCreators(logout, dispatch),
        myGroupsData: bindActionCreators(myGroupsData, dispatch),
        loadGroupMessages: bindActionCreators(loadGroupMessages, dispatch),
        sendGroupMessage: bindActionCreators(sendGroupMessage, dispatch),
        offGroupMessageListener: bindActionCreators(offGroupMessageListener, dispatch),
        readGroupMessage: bindActionCreators(readGroupMessage, dispatch),
        groupUsers: bindActionCreators(groupUsers, dispatch),
        groupUsersInfo: bindActionCreators(groupUsersInfo, dispatch),
    };
}
export default connect(mapStatetoProps, mapDispatchToProps)(ChatPage);