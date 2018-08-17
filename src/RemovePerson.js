import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    List, Avatar, DialogContent, DialogContentText, ListItem, ListItemAvatar,
    ListItemText, DialogTitle, DialogActions, Button, Dialog, ListItemSecondaryAction, Checkbox
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import { removePerson } from './actions/groupActions';

import './styles.css';

class RemovePerson extends Component {
    state = {
        checked: [],
        groupName: '',
        personsArray: []
    };
    handleToggle = (uid) => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(uid);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(uid);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        this.setState({
            checked: newChecked,
        });
    };
    handleRemove = () => {
        const { checked } = this.state;
        const users = this.props.groupUsersInfoArray;
        const uid = this.props.selectedUser
        const groupName = this.props.selectedUserName;
        this.props.removePerson({ checked, groupName, uid, users });
        this.handleClose();
    };
    handleClose = () => {
        this.props.onClose();
    };
    render() {
        const {groupUsersInfoArray} = this.props;
        return (
            <Dialog open={this.props.open} onClose={this.handleClose} fullWidth maxWidth={'md'} aria-labelledby="simple-dialog-title">
                <DialogTitle id="simple-dialog-title">Remove Person From This Group</DialogTitle>
                {
                    groupUsersInfoArray.length === 1 &&
                    <DialogContent>
                        <DialogContentText >
                            You are the only person in this group.
                            Its not fun to be alone why dont you add someone, so you have fun :)
                                </DialogContentText>
                    </DialogContent>
                }

                <List>

                    {groupUsersInfoArray.map((value, index) => (
                        <ListItem key={index} dense button onClick={this.handleToggle(value.uid)}>
                            <ListItemAvatar className='ListItemAvatar'>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={value.name} secondary={value.email} />
                            <ListItemSecondaryAction>
                                <Checkbox
                                    onChange={this.handleToggle(value.uid)}
                                    checked={this.state.checked.indexOf(value.uid) !== -1}
                                    color='primary'
                                />
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                <DialogActions>
                    <Button size='large' variant="contained" onClick={this.handleClose} color="primary">
                        <b>Cancel</b>
                    </Button>
                    <Button size='large' variant="contained" onClick={this.handleRemove} color="primary">
                        <b>Remove</b>
                    </Button>
                </DialogActions>

            </Dialog>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        removePerson: bindActionCreators(removePerson, dispatch)
    }
}
export default connect(null, mapDispatchToProps)(RemovePerson);