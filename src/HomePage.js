import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    List, ListItem, ListItemAvatar,
    ListItemText, ListItemSecondaryAction, Avatar, TextField, Paper, Tabs, Tab, Grid, IconButton
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import PhoneIcon from '@material-ui/icons/Phone';
import GroupIcon from '@material-ui/icons/Group';
import MessageIcon from '@material-ui/icons/Message';
import SendIcon from '@material-ui/icons/Send';
import PlusOneIcon from '@material-ui/icons/PlusOne'

import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ListMessage from './ListMessage';
import { usersAllData, myData } from './actions/userActions';
import { messageChanged, sendMessage, loadMessages, readMessage, offMessageListeener } from './actions/messageActions';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.handleSelectUser = this.handleSelectUser.bind(this);
        this.handleClickSend = this.handleClickSend.bind(this);
    }
    state = { tabValue: 0, isSelected: false, secondary: false, selectedUser: '', selectedUserName: '', }

    componentWillMount() {
        this.props.usersAllData();
    }
    handleSelectUser = (uid, name) => {
        console.log(uid);
        if(this.state.selectedUser != ''){
            this.props.offMessageListeener(this.state.selectedUser)
        }
        this.setState({ isSelected: true, selectedUser: uid, selectedUserName: name });
        this.props.loadMessages({ uid });
        this.props.myData();
        this.props.readMessage({selectedUser: uid});
    };
    handleClickSend = (selectedUser, myName, selectedUserName) => {
        const { message } = this.props;
        console.log(selectedUser);
        if (message && selectedUser, myName) {
            this.props.sendMessage({ message, selectedUser, myName, selectedUserName });
        }

    };
    handleTabChange = (event, tabValue) => {
        this.setState({ tabValue });
    };
    generate1(element) {
        return [0, 1, 2, 3, 4, 5, 6, 7].map(value =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }
    render() {
        if (!this.props.loginSucces) {
            return (
                <LoginPage />
            )
        }
        const { secondary } = this.state;
        return (
            <Grid container>
                <Grid container xs={4} sm={4} md={4} lg={4} direction='row' alignItems='stretch'
                    style={{ minHeight: window.innerHeight - 50 }}>
                    <Paper style={{ width: (window.innerWidth / 3) - 20 }}>
                        <Tabs
                            value={this.state.tabValue}
                            onChange={this.handleTabChange}
                            fullWidth
                            indicatorColor='primary'
                            textColor="primary"
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
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={value.name}
                                            secondary={value.message}
                                        />
                                        {!value.isRead && <ListItemSecondaryAction>
                                            <IconButton aria-label="PlusOne">
                                                < PlusOneIcon/>
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
                                {this.generate1(
                                    <ListItem divider button onClick={() => { this.setState({ isSelected: true }) }}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Group Chat"
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
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon />
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
                    style={{ overflow: 'auto' }}>
                    {
                        this.state.isSelected &&
                        <Paper
                            style={{
                                overflowY: 'scroll', overflowX: 'hidden',
                                minHeight: window.innerHeight - 50, width: 2 * window.innerWidth / 3
                            }}>
                            <ListMessage
                                selectedUser={this.state.selectedUser}
                                messagesArray={this.props.messagesArray}
                            />
                        </Paper>
                    }

                </Grid>
                <Grid container xs={8} sm={8} md={8} lg={8} direction='column' alignItems='stretch'
                    style={{ position: 'absolute', bottom: 0, right: 0 }}>
                    {this.state.isSelected &&
                        <Paper style={{ backgroundColor: '#B0C4DE' }}>
                            <TextField
                                placeholder="MultiLine with rows: 2 and rowsMax: 4"
                                multiline
                                rows={2}
                                rowsMax={4}
                                style={{ width: (2 * window.innerWidth / 3) - 80 }}
                                onChange={e => this.props.messageChanged(e.target.value)}
                                value={this.props.message}
                            />
                            <IconButton aria-label="Send" color='primary'
                                onClick={() => this.handleClickSend(this.state.selectedUser, this.props.myName, this.state.selectedUserName)}>
                                <SendIcon />
                            </IconButton>
                        </Paper >
                    }

                </Grid>
            </Grid>
        )
    }
}
const mapStatetoProps = ({ AuthResponse, UserResponse, MessageResponse }) => {
    const { loading, loggedIn, loginSucces } = AuthResponse;
    var { message } = MessageResponse;
    const { loadingMessage, LoadedMessages } = MessageResponse;
    const { Users, myName, Recents } = UserResponse;
    const messagesArray = _.map(LoadedMessages[0], (val) => {
        return { ...val };
    });
    const usersArray = _.map(Users[0], (val) => {
        return { ...val };
    });
    const recentsArray = _.map(Recents[0], (val) => {
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
        offMessageListeener: bindActionCreators(offMessageListeener, dispatch)
    };
}

export default connect(mapStatetoProps, mapDispatchToProps)(HomePage);