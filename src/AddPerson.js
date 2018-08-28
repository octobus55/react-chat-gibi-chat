import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    List,
    Avatar,
    DialogContent,
    DialogContentText,
    ListItem,
    ListItemAvatar,
    ListItemText,
    DialogTitle,
    DialogActions,
    Button,
    Dialog,
    ListItemSecondaryAction,
    Checkbox
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import { addPerson } from './actions/groupActions';

import './styles.css';

class AddPerson extends Component {
    state = {
        checked: [],
        users: [],
    };

    componentWillMount() {
        var counter = 0;
        const tempUser = []
        this.props.groupUsersArray.forEach(user => {
            tempUser[counter++] = user;
        });
        this.setState({ users: tempUser })
    }

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

    handleAdd = () => {
        const { checked, users } = this.state;
        const uid = this.props.selectedUser
        const groupName = this.props.selectedUserName
        this.props.addPerson({ checked, groupName, uid, users });
        this.handleClose();
    };

    handleClose = () => {
        this.props.onClose();
    };

    render() {
        const { groupName } = this.props;
        return (
            <Dialog open={this.props.open} onClose={this.handleClose} fullWidth maxWidth={'md'} aria-labelledby="simple-dialog-title" >
                <DialogTitle id="simple-dialog-title">Add Person To This Group</DialogTitle>
                {
                    this.props.personsArray.length === 0 &&
                    <DialogContent>
                        <DialogContentText >
                            {groupName}
                        </DialogContentText>
                        <DialogContentText >
                            Everyone already in this Group. Have fun chatting iwth everyone :)
                        </DialogContentText>
                    </DialogContent>
                }
                <DialogContent>
                    <DialogContentText >
                        {groupName}
                    </DialogContentText>
                </DialogContent>
                <List>
                    {this.props.personsArray.map((value) => (
                        <ListItem key={value.uid} dense button onClick={this.handleToggle(value.uid)}>
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
                    <Button size='large' variant="contained" onClick={this.handleAdd} color="primary">
                        <b>Add</b>
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addPerson: bindActionCreators(addPerson, dispatch)
    }
}
export default connect(null, mapDispatchToProps)(AddPerson);