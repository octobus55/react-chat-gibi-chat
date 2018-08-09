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
import FolderIcon from '@material-ui/icons/Folder';
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
import { messageChanged, sendMessage, loadMessages, readMessage, offMessageListeener } from './actions/messageActions';
import { logout } from './actions/authActions';
import {myGroupsData, loadGroupMessages, sendGroupMessage} from './actions/groupActions';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.handleSelectUser = this.handleSelectUser.bind(this);
        this.handleClickSend = this.handleClickSend.bind(this);
    }
    state = { tabValue: 0, isSelected: false, secondary: false, selectedUser: '',selectedUserType: '', selectedUserName: '', authenticated: false, open: false }

    componentWillMount() {
        this.props.usersAllData();
        this.props.recentsData();
        this.props.myGroupsData();
    }
    componentDidUpdate = (previousProps, previousState) => {
        this.scrollToBottom();
    }
    scrollToBottom = () => {
        const elem = document.querySelector('.scrollableContianer ul');
        if (elem) {
            elem.scrollTop = elem.scrollHeight;
        }
    };
    handleSelectUser = (uid, name) => {

        
        if (this.state.selectedUser !== '' && this.state.tabValue != 1) {
            this.props.offMessageListeener(this.state.selectedUser)
        }
        this.setState({ isSelected: true, selectedUser: uid });
        this.props.myData();
        if(this.state.tabValue == 1)
        {
            this.setState({selectedUserType: 'Group'})
            this.props.loadGroupMessages({uid})
            
        }
        else{
            this.setState({selectedUserType: 'User',  selectedUserName: name})
            this.props.loadMessages({ uid });
            this.props.readMessage({ selectedUser: uid });
        }
        
    };
    handleClickSend = () => {
        const { message, myName } = this.props;
        const {selectedUser, selectedUserName, selectedUserType} = this.state;
        if (message && selectedUser && myName) {
            if(selectedUserType === 'User'){
                this.props.sendMessage({ message, selectedUser, myName, selectedUserName });
            }
            else{
                this.props.sendGroupMessage({message, selectedUser, myName})
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
        const { secondary } = this.state;
        console.log(this.props.groupMessagesArray)
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
                                usersArray= {this.props.usersArray}
                            />
                            <Button size="large" color="inherit"
                                onClick={() => this.props.logout()} > <b>LogOut</b> </Button>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid container xs={4} sm={4} md={4} lg={4} direction='row' alignItems='stretch'
                    style={{ minHeight: window.innerHeight - 50 }}>
                    <Paper style={{ width: (window.innerWidth / 3) - 20 }}>
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
                        {this.state.tabValue === 0 && <Paper style={{ overflow: 'auto', maxHeight: window.innerHeight - 120 }}

                        >
                            <List style={{ overflow: 'auto', maxHeight: window.innerHeight - 120 }}>
                                {this.props.recentsArray.map((value, index) =>
                                    <ListItem key={index} divider button
                                        onClick={() => this.handleSelectUser(value.Useruid, value.name)}>
                                        <ListItemAvatar style={{ backgroundColor: '#303f9f' }}>
                                            <Avatar>
                                                <PersonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={value.name}
                                            secondary={value.message}
                                        />
                                        {!value.isRead && <ListItemSecondaryAction>
                                            <IconButton aria-label="PlusOne">
                                                < PlusOneIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>}
                                    </ListItem>
                                )}
                            </List>
                        </Paper>
                        }
                        {this.state.tabValue === 1 && <Paper style={{ overflow: 'auto', maxHeight: window.innerHeight - 120 }}

                        >
                            <List style={{ overflow: 'auto', maxHeight: window.innerHeight - 120 }}>
                                {this.props.myGroupsArray.map((value, index) =>
                                    <ListItem key={index} divider button 
                                    onClick={() => this.handleSelectUser(value.groupId, value.groupName)}>
                                        <ListItemAvatar style={{ backgroundColor: '#303f9f' }}>
                                            <Avatar>
                                                <PersonIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={value.groupName}
                                            secondary={secondary ? 'Secondary text' : 'secondary text'}
                                        />
                                    </ListItem>
                                )}
                            </List>
                        </Paper>
                        }
                        {this.state.tabValue === 2 && <Paper style={{ overflow: 'auto', maxHeight: window.innerHeight - 120 }}

                        >
                            <List style={{ overflow: 'auto', maxHeight: window.innerHeight - 120 }}>
                                {this.props.usersArray.map((value, index) =>
                                    <ListItem key={index} button onClick={() => this.handleSelectUser(value.uid, value.name)}
                                        divider>
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
                <Grid container xs={8} sm={8} md={8} lg={8} direction='row' alignItems='stretch' justify='space-evenly'
                    style={{ overflow: 'auto', maxHeight: window.innerHeight - 30 }}>
                    {
                        this.state.isSelected &&
                        <Paper className={'scrollableContianer'}
                            style={{
                                overflowY: 'scroll', overflowX: 'hidden',
                                minHeight: window.innerHeight - 50, width: 2 * window.innerWidth / 3
                            }}>
                            <ListMessage
                                selectedUser={this.state.selectedUser}
                                messagesArray={this.state.selectedUserType =='User' ? 
                                this.props.messagesArray : this.props.groupMessagesArray}
                            />
                        </Paper>
                    }


                </Grid>
                <Grid container xs={8} sm={8} md={8} lg={8} direction='column' alignItems='stretch'
                    style={{ position: 'absolute', bottom: 20, right: 10 }}>
                    {this.state.isSelected &&
                        <Paper style={{ backgroundColor: '#9999ff', borderRadius: 10, paddingLeft: 15 }}>
                            <TextField
                                placeholder="Type Something..."
                                multiline
                                rowsMax={2}
                                style={{ width: (2 * window.innerWidth / 3) - 80 }}
                                onChange={e => this.props.messageChanged(e.target.value)}
                                value={this.props.message}
                            />
                            <IconButton aria-label="Send" color='primary'
                                onClick={() => this.handleClickSend()}>
                                <SendIcon />
                            </IconButton>
                        </Paper >
                    }

                </Grid>
            </Grid>
        )
    }
}
const mapStatetoProps = ({ AuthResponse, UserResponse, MessageResponse, GroupResponse }) => {
    const { loading, loggedIn, loginSucces } = AuthResponse;
    var { message } = MessageResponse;
    const { loadingMessage, LoadedMessages } = MessageResponse;
    const { Users, myName, Recents } = UserResponse;
    const {myGroups, GroupMessages} = GroupResponse;

    const messagesArray = _.map(LoadedMessages[0], (val) => {
        return { ...val };
    });
    const usersArray = _.map(Users, (val) => {
        return { ...val };
    });
    const recentsArray = _.map(Recents[0], (val) => {
        return { ...val };
    });
    const myGroupsArray = _.map(myGroups, (val) => {
        return { ...val };
    });
    const groupMessagesArray = _.map(GroupMessages[0], (val) => {
        return { ...val };
    });
    return {
        loading,
        loggedIn,
        loginSucces,
        usersArray,
        message,
        loadingMessage,
        messagesArray,
        myName,
        recentsArray,
        myGroupsArray,
        groupMessagesArray
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
        offMessageListeener: bindActionCreators(offMessageListeener, dispatch),
        recentsData: bindActionCreators(recentsData, dispatch),
        logout: bindActionCreators(logout, dispatch),
        myGroupsData: bindActionCreators(myGroupsData, dispatch),
        loadGroupMessages: bindActionCreators(loadGroupMessages, dispatch),
        sendGroupMessage : bindActionCreators(sendGroupMessage, dispatch),
    };
}

export default connect(mapStatetoProps, mapDispatchToProps)(HomePage);