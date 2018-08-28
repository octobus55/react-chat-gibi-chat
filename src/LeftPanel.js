import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Grid,
    Paper,
    Tabs,
    Tab,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemSecondaryAction,
    Avatar,
} from '@material-ui/core';
import MessageIcon from '@material-ui/icons/Forum';
import GroupIcon from '@material-ui/icons/Group';
import PhoneIcon from '@material-ui/icons/Phone';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import PersonIcon from '@material-ui/icons/Person';

import { usersAllData, myData, recentsData} from './actions/userActions';
import {
    loadMessages,
    readMessage,
    offMessageListener
} from './actions/messageActions';
import {
    myGroupsData,
    loadGroupMessages,
    offGroupMessageListener,
    readGroupMessage,
    groupUsers,
    groupUsersInfo
} from './actions/groupActions';
import {selectUser, selectUserInfo} from './actions/panelActions';

import './styles.css'

class LeftPanel extends Component{
    constructor(props) {
        super(props);
        this.handleSelectUser = this.handleSelectUser.bind(this);
    }
    state = {
        tabValue: 0,
    }

    
    componentWillMount() {
        this.props.usersAllData();
        this.props.recentsData();
        this.props.myGroupsData();
    }

    handleTabChange = (event, tabValue) => {
        this.setState({ tabValue });
    };

    handleSelectUser = (uid, name) => () => {
        const {tabValue} = this.state;
        const {selectedUserType, selectedUser} = this.props;
        this.props.myData();
        if (selectedUserType === 'User') {
            this.props.offMessageListener({ uid: selectedUser })
        }
        else if (selectedUserType === 'Group') {
            this.props.offGroupMessageListener({ selectedUser })
        }
        this.props.selectUser({uid})
        if (tabValue === 1) {
            const selectedUserType = 'Group';
            const selectedUserName = name
            this.props.selectUserInfo({selectedUserType, selectedUserName})
            this.props.groupUsers({ uid })
            this.props.groupUsersInfo({ uid })
            this.props.loadGroupMessages({ uid })
            this.props.readGroupMessage({ uid });
        }
        else {
            const selectedUserType = 'User';
            const selectedUserName = name
            this.props.selectUserInfo({selectedUserType, selectedUserName})
            this.props.loadMessages({ uid });
            if(tabValue === 0)
            {
                this.props.readMessage({ selectedUser: uid });
            }
        }
    };
    render(){
        const {recentsArray, myGroupsArray, usersArray, createGroupFinished} = this.props;
        const {tabValue} = this.state;
        return(
            <Grid container xs={4} sm={4} md={4} lg={4} direction='row' alignItems='stretch' className='GridTabs'>
                    <Paper className='PaperTabs'>
                        <Tabs
                            value={tabValue}
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
                        {tabValue === 0 && <Paper className='PaperTab'
                        >
                            <List className='ListTab'>
                                {
                                    recentsArray.map((value) =>
                                        <ListItem key={value.Useruid} divider button
                                            onClick={this.handleSelectUser(value.Useruid, value.name)}>
                                            <ListItemAvatar className='ListItemAvatar' >
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
                        {tabValue === 1 && createGroupFinished && <Paper
                            className='PaperTab'
                        >
                            <List className='ListTab'>
                                {
                                    myGroupsArray.map((value) =>
                                        <ListItem key={value.groupId} divider button
                                            onClick={this.handleSelectUser(value.groupId, value.groupName)}>
                                            <ListItemAvatar className='ListItemAvatar'>
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
                        {tabValue === 2 && <Paper className='PaperTab'
                        >
                            <List className='ListTab'>
                                {
                                    usersArray.map((value) =>
                                        <ListItem key={value.uid} button onClick={this.handleSelectUser(value.uid, value.name)}
                                            divider >
                                            <ListItemAvatar className='ListItemAvatar'>
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
        )
    }
}
const mapStatetoProps = ({ UserResponse, GroupResponse, PanelResponse }) => {
    const { Users, Recents } = UserResponse;
    const { myGroups, createGroupFinished } = GroupResponse;
    const {selectedUserType, selectedUser} = PanelResponse;
    return {
        usersArray: (Users || []),
        recentsArray: (Recents || []),
        myGroupsArray: (myGroups || []),
        createGroupFinished,
        selectedUserType,
        selectedUser
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadMessages: bindActionCreators(loadMessages, dispatch),
        myData: bindActionCreators(myData, dispatch),
        readMessage: bindActionCreators(readMessage, dispatch),
        offMessageListener: bindActionCreators(offMessageListener, dispatch),
        loadGroupMessages: bindActionCreators(loadGroupMessages, dispatch),
        offGroupMessageListener: bindActionCreators(offGroupMessageListener, dispatch),
        readGroupMessage: bindActionCreators(readGroupMessage, dispatch),
        groupUsers: bindActionCreators(groupUsers, dispatch),
        groupUsersInfo: bindActionCreators(groupUsersInfo, dispatch),
        usersAllData: bindActionCreators(usersAllData, dispatch),
        myGroupsData: bindActionCreators(myGroupsData, dispatch),
        recentsData: bindActionCreators(recentsData, dispatch),
        selectUser: bindActionCreators(selectUser, dispatch),
        selectUserInfo: bindActionCreators(selectUserInfo, dispatch),
        
    };
}
export default connect (mapStatetoProps, mapDispatchToProps)(LeftPanel);