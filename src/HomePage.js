import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    GridList, List, ListItem, ListItemAvatar, ListItemIcon, ListItemSecondaryAction,
    ListItemText, Avatar, TextField, Paper, Tabs, Tab, Button, Grid, IconButton 
} from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder'
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite'
import GroupIcon from '@material-ui/icons/Group'
import MessageIcon from '@material-ui/icons/Message'
import SendIcon from '@material-ui/icons/Send'

import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import { usersAllData } from './actions/userActions'
import {messageChanged, sendMessage} from './actions/messageActions'

class HomePage extends Component {
    constructor(props){
        super(props);
        this.handleSelectUser = this.handleSelectUser.bind(this);
        this.handleClickSend = this.handleClickSend.bind(this);
    }
    state = { tabValue: 0, isSelected: false, secondary: false, dense: false, selectedUser: '' }
    
    componentWillMount() {
        this.props.usersAllData();
    }
    handleSelectUser = (uid) => {
        this.setState({ isSelected: true, selectedUser: uid });
    };
    handleClickSend = (selectedUser) => {
        const {message} = this.props;
        if(message && selectedUser){
            console.log('1', selectedUser);
            this.props.sendMessage({message, selectedUser});
        }
        
    };
    handleTabChange = (event, tabValue) => {
        this.setState({ tabValue });
    };
    generate(element) {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(value =>
            React.cloneElement(element, {
                key: value,
            }),
        );
    }
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
        const { dense, secondary, isSelected } = this.state;
        return (
            <Grid container>
                <Grid container xs={4} sm={4} md={4} lg={4} direction='row' alignItems='stretch' style={{ minHeight: window.innerHeight - 50 }}>
                    <Paper style={{ width: window.innerWidth / 3 }}>
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
                                {this.generate(
                                    <ListItem divider button onClick={() => { this.setState({ isSelected: true }) }}>
                                        <ListItemAvatar>
                                            <Avatar>
                                                <FolderIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary="Single Chat"
                                            secondary={secondary ? 'Secondary text' : 'secondary text'}
                                        />
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
                                    <ListItem key={index} button onClick={() => this.handleSelectUser(value.uid) }
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
                <Grid container xs={8} sm={8} md={8} lg={8} direction='row' alignItems='stretch' justify='space-evenly' style={{ paddingLeft: 30 }}>
                    {
                        this.state.isSelected &&
                        <GridList>
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta justo lectus. Fusce dapibus diam sit amet mi hendrerit condimentum. Vivamus risus odio, faucibus ac auctor vitae, vestibulum eu erat. Aenean sit amet porta ante, eu placerat purus. Vivamus vehicula lacus ac leo eleifend dignissim. Sed ac fermentum ex, non eleifend nibh. Sed lacinia ornare posuere. Maecenas auctor mollis rhoncus. Phasellus nec porttitor lorem. Phasellus felis sapien, laoreet consectetur ligula at, condimentum tempus libero. Maecenas rutrum lacus massa, ut ullamcorper lacus convallis eget. Maecenas magna nisi, interdum sit amet sapien sed, rutrum accumsan dolor.

                        Nunc in tellus odio. Duis eget sem eget turpis cursus elementum vitae sit amet nisl. Mauris non ligula ut quam feugiat facilisis. Curabitur eros purus, condimentum sit amet erat sed, dapibus auctor enim. Aenean tristique posuere sem eget consectetur. Etiam ultricies aliquam nisl congue ultrices. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas eget sodales tortor. Donec pulvinar, velit eu vestibulum ornare, urna velit commodo odio, at interdum lectus augue et lacus. Nunc suscipit, elit ac suscipit maximus, velit urna congue risus, dictum scelerisque nulla risus non ex. Morbi efficitur sapien in elit ultrices, in tristique felis tincidunt. Morbi eu est rutrum, semper leo ut, varius nulla. Aliquam at libero in orci auctor mollis. Sed at magna ultricies, tincidunt velit non, sagittis ante.

                        Phasellus vehicula, orci vel fringilla semper, neque enim pretium felis, vitae tincidunt nulla libero ut enim. Etiam et molestie elit, sit amet maximus diam. Nunc rutrum hendrerit aliquet. Etiam rhoncus placerat ante, sit amet egestas magna mattis nec. Nullam ligula quam, tempus convallis quam eu, mattis accumsan nunc. Duis sem nisl, tincidunt in ullamcorper vitae, tristique et lectus. Sed porta massa at porta convallis. In at turpis ut ante maximus auctor vitae quis arcu. Cras in dapibus leo, vel scelerisque libero. Nulla sagittis nunc eu maximus pulvinar. Donec sed ornare erat, nec porttitor eros. Vivamus iaculis nisl ac tincidunt condimentum. Curabitur euismod, leo sed mattis hendrerit, sem dui lobortis tellus, eget fringilla tellus risus quis ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur congue libero maorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta justo lectus. Fusce dapibus diam sit amet mi hendrerit condimentum. Vivamus risus odio, faucibus ac auctor vitae, vestibulum eu erat. Aenean sit amet porta ante, eu placerat purus. Vivamus vehicula lacus ac leo eleifend dignissim. Sed ac fermentum ex, non eleifend nibh. Sed lacinia ornare posuere. Maecenas auctor mollis rhoncus. Phasellus nec porttitor lorem. Phasellus felis sapien, laoreet consectetur ligula at, condimentum tempus libero. Maecenas rutrum lacus massa, ut ullamcorper lacus convallis eget. Maecenas magna nisi, interdum sit amet sapien sed, rutrum accumsan dolor.

                        Nunc in tellus odio. Duis eget sem eget turpis cursus elementum vitae sit amet nisl. Mauris non ligula ut quam feugiat facilisis. Curabitur eros purus, condimentum sit amet erat sed, dapibus auctor enim. Aenean tristique posuere sem eget consectetur. Etiam ultricies aliquam nisl congue ultrices. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas eget sodales tortor. Donec pulvinar, velit eu vestibulum ornare, urna velit commodo odio, at interdum lectus augue et lacus. Nunc suscipit, elit ac suscipit maximus, velit urna congue risus, dictum scelerisque nulla risus non ex. Morbi efficitur sapien in elit ultrices, in tristique felis tincidunt. Morbi eu est rutrum, semper leo ut, varius nulla. Aliquam at libero in orci auctor mollis. Sed at magna ultricies, tincidunt velit non, sagittis ante.

                        Phasellus vehicula, orci vel fringilla semper, neque enim pretium felis, vitae tincidunt nulla libero ut enim. Etiam et molestie elit, sit amet maximus diam. Nunc rutrum hendrerit aliquet. Etiam rhoncus placerat ante, sit amet egestas magna mattis nec. Nullam ligula quam, tempus convallis quam eu, mattis accumsan nunc. Duis sem nisl, tincidunt in ullamcorper vitae, tristique et lectus. Sed porta massa at porta convallis. In at turpis ut ante maximus auctor vitae quis arcu. Cras in dapibus leo, vel scelerisque libero. Nulla sagittis nunc eu maximus pulvinar. Donec sed ornare erat, nec porttitor eros. Vivamus iaculis nisl ac tincidunt condimentum. Curabitur euismod, leo sed mattis hendrerit, sem dui lobortis tellus, eget fringilla tellus risus quis ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur congue libero maorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta justo lectus. Fusce dapibus diam sit amet mi hendrerit condimentum. Vivamus risus odio, faucibus ac auctor vitae, vestibulum eu erat. Aenean sit amet porta ante, eu placerat purus. Vivamus vehicula lacus ac leo eleifend dignissim. Sed ac fermentum ex, non eleifend nibh. Sed lacinia ornare posuere. Maecenas auctor mollis rhoncus. Phasellus nec porttitor lorem. Phasellus felis sapien, laoreet consectetur ligula at, condimentum tempus libero. Maecenas rutrum lacus massa, ut ullamcorper lacus convallis eget. Maecenas magna nisi, interdum sit amet sapien sed, rutrum accumsan dolor.

                        Nunc in tellus odio. Duis eget sem eget turpis cursus elementum vitae sit amet nisl. Mauris non ligula ut quam feugiat facilisis. Curabitur eros purus, condimentum sit amet erat sed, dapibus auctor enim. Aenean tristique posuere sem eget consectetur. Etiam ultricies aliquam nisl congue ultrices. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas eget sodales tortor. Donec pulvinar, velit eu vestibulum ornare, urna velit commodo odio, at interdum lectus augue et lacus. Nunc suscipit, elit ac suscipit maximus, velit urna congue risus, dictum scelerisque nulla risus non ex. Morbi efficitur sapien in elit ultrices, in tristique felis tincidunt. Morbi eu est rutrum, semper leo ut, varius nulla. Aliquam at libero in orci auctor mollis. Sed at magna ultricies, tincidunt velit non, sagittis ante.

                        Phasellus vehicula, orci vel fringilla semper, neque enim pretium felis, vitae tincidunt nulla libero ut enim. Etiam et molestie elit, sit amet maximus diam. Nunc rutrum hendrerit aliquet. Etiam rhoncus placerat ante, sit amet egestas magna mattis nec. Nullam ligula quam, tempus convallis quam eu, mattis accumsan nunc. Duis sem nisl, tincidunt in ullamcorper vitae, tristique et lectus. Sed porta massa at porta convallis. In at turpis ut ante maximus auctor vitae quis arcu. Cras in dapibus leo, vel scelerisque libero. Nulla sagittis nunc eu maximus pulvinar. Donec sed ornare erat, nec porttitor eros. Vivamus iaculis nisl ac tincidunt condimentum. Curabitur euismod, leo sed mattis hendrerit, sem dui lobortis tellus, eget fringilla tellus risus quis ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur congue libero maorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta justo lectus. Fusce dapibus diam sit amet mi hendrerit condimentum. Vivamus risus odio, faucibus ac auctor vitae, vestibulum eu erat. Aenean sit amet porta ante, eu placerat purus. Vivamus vehicula lacus ac leo eleifend dignissim. Sed ac fermentum ex, non eleifend nibh. Sed lacinia ornare posuere. Maecenas auctor mollis rhoncus. Phasellus nec porttitor lorem. Phasellus felis sapien, laoreet consectetur ligula at, condimentum tempus libero. Maecenas rutrum lacus massa, ut ullamcorper lacus convallis eget. Maecenas magna nisi, interdum sit amet sapien sed, rutrum accumsan dolor.

                        Nunc in tellus odio. Duis eget sem eget turpis cursus elementum vitae sit amet nisl. Mauris non ligula ut quam feugiat facilisis. Curabitur eros purus, condimentum sit amet erat sed, dapibus auctor enim. Aenean tristique posuere sem eget consectetur. Etiam ultricies aliquam nisl congue ultrices. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas eget sodales tortor. Donec pulvinar, velit eu vestibulum ornare, urna velit commodo odio, at interdum lectus augue et lacus. Nunc suscipit, elit ac suscipit maximus, velit urna congue risus, dictum scelerisque nulla risus non ex. Morbi efficitur sapien in elit ultrices, in tristique felis tincidunt. Morbi eu est rutrum, semper leo ut, varius nulla. Aliquam at libero in orci auctor mollis. Sed at magna ultricies, tincidunt velit non, sagittis ante.

                        Phasellus vehicula, orci vel fringilla semper, neque enim pretium felis, vitae tincidunt nulla libero ut enim. Etiam et molestie elit, sit amet maximus diam. Nunc rutrum hendrerit aliquet. Etiam rhoncus placerat ante, sit amet egestas magna mattis nec. Nullam ligula quam, tempus convallis quam eu, mattis accumsan nunc. Duis sem nisl, tincidunt in ullamcorper vitae, tristique et lectus. Sed porta massa at porta convallis. In at turpis ut ante maximus auctor vitae quis arcu. Cras in dapibus leo, vel scelerisque libero. Nulla sagittis nunc eu maximus pulvinar. Donec sed ornare erat, nec porttitor eros. Vivamus iaculis nisl ac tincidunt condimentum. Curabitur euismod, leo sed mattis hendrerit, sem dui lobortis tellus, eget fringilla tellus risus quis ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur congue libero maorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta justo lectus. Fusce dapibus diam sit amet mi hendrerit condimentum. Vivamus risus odio, faucibus ac auctor vitae, vestibulum eu erat. Aenean sit amet porta ante, eu placerat purus. Vivamus vehicula lacus ac leo eleifend dignissim. Sed ac fermentum ex, non eleifend nibh. Sed lacinia ornare posuere. Maecenas auctor mollis rhoncus. Phasellus nec porttitor lorem. Phasellus felis sapien, laoreet consectetur ligula at, condimentum tempus libero. Maecenas rutrum lacus massa, ut ullamcorper lacus convallis eget. Maecenas magna nisi, interdum sit amet sapien sed, rutrum accumsan dolor.

                        Nunc in tellus odio. Duis eget sem eget turpis cursus elementum vitae sit amet nisl. Mauris non ligula ut quam feugiat facilisis. Curabitur eros purus, condimentum sit amet erat sed, dapibus auctor enim. Aenean tristique posuere sem eget consectetur. Etiam ultricies aliquam nisl congue ultrices. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas eget sodales tortor. Donec pulvinar, velit eu vestibulum ornare, urna velit commodo odio, at interdum lectus augue et lacus. Nunc suscipit, elit ac suscipit maximus, velit urna congue risus, dictum scelerisque nulla risus non ex. Morbi efficitur sapien in elit ultrices, in tristique felis tincidunt. Morbi eu est rutrum, semper leo ut, varius nulla. Aliquam at libero in orci auctor mollis. Sed at magna ultricies, tincidunt velit non, sagittis ante.

                        Phasellus vehicula, orci vel fringilla semper, neque enim pretium felis, vitae tincidunt nulla libero ut enim. Etiam et molestie elit, sit amet maximus diam. Nunc rutrum hendrerit aliquet. Etiam rhoncus placerat ante, sit amet egestas magna mattis nec. Nullam ligula quam, tempus convallis quam eu, mattis accumsan nunc. Duis sem nisl, tincidunt in ullamcorper vitae, tristique et lectus. Sed porta massa at porta convallis. In at turpis ut ante maximus auctor vitae quis arcu. Cras in dapibus leo, vel scelerisque libero. Nulla sagittis nunc eu maximus pulvinar. Donec sed ornare erat, nec porttitor eros. Vivamus iaculis nisl ac tincidunt condimentum. Curabitur euismod, leo sed mattis hendrerit, sem dui lobortis tellus, eget fringilla tellus risus quis ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur congue libero maorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta justo lectus. Fusce dapibus diam sit amet mi hendrerit condimentum. Vivamus risus odio, faucibus ac auctor vitae, vestibulum eu erat. Aenean sit amet porta ante, eu placerat purus. Vivamus vehicula lacus ac leo eleifend dignissim. Sed ac fermentum ex, non eleifend nibh. Sed lacinia ornare posuere. Maecenas auctor mollis rhoncus. Phasellus nec porttitor lorem. Phasellus felis sapien, laoreet consectetur ligula at, condimentum tempus libero. Maecenas rutrum lacus massa, ut ullamcorper lacus convallis eget. Maecenas magna nisi, interdum sit amet sapien sed, rutrum accumsan dolor.

                        Nunc in tellus odio. Duis eget sem eget turpis cursus elementum vitae sit amet nisl. Mauris non ligula ut quam feugiat facilisis. Curabitur eros purus, condimentum sit amet erat sed, dapibus auctor enim. Aenean tristique posuere sem eget consectetur. Etiam ultricies aliquam nisl congue ultrices. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas eget sodales tortor. Donec pulvinar, velit eu vestibulum ornare, urna velit commodo odio, at interdum lectus augue et lacus. Nunc suscipit, elit ac suscipit maximus, velit urna congue risus, dictum scelerisque nulla risus non ex. Morbi efficitur sapien in elit ultrices, in tristique felis tincidunt. Morbi eu est rutrum, semper leo ut, varius nulla. Aliquam at libero in orci auctor mollis. Sed at magna ultricies, tincidunt velit non, sagittis ante.

                        Phasellus vehicula, orci vel fringilla semper, neque enim pretium felis, vitae tincidunt nulla libero ut enim. Etiam et molestie elit, sit amet maximus diam. Nunc rutrum hendrerit aliquet. Etiam rhoncus placerat ante, sit amet egestas magna mattis nec. Nullam ligula quam, tempus convallis quam eu, mattis accumsan nunc. Duis sem nisl, tincidunt in ullamcorper vitae, tristique et lectus. Sed porta massa at porta convallis. In at turpis ut ante maximus auctor vitae quis arcu. Cras in dapibus leo, vel scelerisque libero. Nulla sagittis nunc eu maximus pulvinar. Donec sed ornare erat, nec porttitor eros. Vivamus iaculis nisl ac tincidunt condimentum. Curabitur euismod, leo sed mattis hendrerit, sem dui lobortis tellus, eget fringilla tellus risus quis ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur congue libero maorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta justo lectus. Fusce dapibus diam sit amet mi hendrerit condimentum. Vivamus risus odio, faucibus ac auctor vitae, vestibulum eu erat. Aenean sit amet porta ante, eu placerat purus. Vivamus vehicula lacus ac leo eleifend dignissim. Sed ac fermentum ex, non eleifend nibh. Sed lacinia ornare posuere. Maecenas auctor mollis rhoncus. Phasellus nec porttitor lorem. Phasellus felis sapien, laoreet consectetur ligula at, condimentum tempus libero. Maecenas rutrum lacus massa, ut ullamcorper lacus convallis eget. Maecenas magna nisi, interdum sit amet sapien sed, rutrum accumsan dolor.

                        Nunc in tellus odio. Duis eget sem eget turpis cursus elementum vitae sit amet nisl. Mauris non ligula ut quam feugiat facilisis. Curabitur eros purus, condimentum sit amet erat sed, dapibus auctor enim. Aenean tristique posuere sem eget consectetur. Etiam ultricies aliquam nisl congue ultrices. Interdum et malesuada fames ac ante ipsum primis in faucibus. Maecenas eget sodales tortor. Donec pulvinar, velit eu vestibulum ornare, urna velit commodo odio, at interdum lectus augue et lacus. Nunc suscipit, elit ac suscipit maximus, velit urna congue risus, dictum scelerisque nulla risus non ex. Morbi efficitur sapien in elit ultrices, in tristique felis tincidunt. Morbi eu est rutrum, semper leo ut, varius nulla. Aliquam at libero in orci auctor mollis. Sed at magna ultricies, tincidunt velit non, sagittis ante.

                        Phasellus vehicula, orci vel fringilla semper, neque enim pretium felis, vitae tincidunt nulla libero ut enim. Etiam et molestie elit, sit amet maximus diam. Nunc rutrum hendrerit aliquet. Etiam rhoncus placerat ante, sit amet egestas magna mattis nec. Nullam ligula quam, tempus convallis quam eu, mattis accumsan nunc. Duis sem nisl, tincidunt in ullamcorper vitae, tristique et lectus. Sed porta massa at porta convallis. In at turpis ut ante maximus auctor vitae quis arcu. Cras in dapibus leo, vel scelerisque libero. Nulla sagittis nunc eu maximus pulvinar. Donec sed ornare erat, nec porttitor eros. Vivamus iaculis nisl ac tincidunt condimentum. Curabitur euismod, leo sed mattis hendrerit, sem dui lobortis tellus, eget fringilla tellus risus quis ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur congue libero ma
                    </p>
                        </GridList >
                    }

                </Grid>
                <Grid container xs={8} sm={8} md={8} lg={8} direction='column' alignItems='stretch' style={{ position: 'absolute', bottom: 0, right: 0 }}>
                    {this.state.isSelected &&
                        <Paper style={{backgroundColor: '#B0C4DE'}}>
                            <TextField
                                placeholder="MultiLine with rows: 2 and rowsMax: 4"
                                multiline
                                rows={2}
                                rowsMax={4}
                                style={{width: (2 * window.innerWidth / 3) - 80}}
                                onChange = {e => this.props.messageChanged(e.target.value)}
                                value = {this.props.message}
                            />
                            <IconButton  aria-label="Send" color='primary' onClick={() => this.handleClickSend(this.state.selectedUser)}>
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
    const {message} = MessageResponse;
    const usersArray = _.map(UserResponse, (val, uid) => {
        return { ...val, uid };
    });
    return {
        loading,
        loggedIn,
        loginSucces,
        usersArray,
        message
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        usersAllData: bindActionCreators(usersAllData, dispatch),
        messageChanged: bindActionCreators(messageChanged, dispatch),
        sendMessage: bindActionCreators(sendMessage, dispatch)
    };
}

export default connect(mapStatetoProps, mapDispatchToProps)(HomePage);