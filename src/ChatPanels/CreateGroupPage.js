import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    ListItemSecondaryAction,
    Dialog,
    Button,
    DialogActions,
    DialogTitle,
    ListItemText,
    ListItemAvatar,
    ListItem,
    List,
    Avatar,
    TextField
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import PersonIcon from '@material-ui/icons/Person';
import { createGroup } from '.././actions/groupActions';

class CreateGroupPage extends Component {
    state = {
        checked: [],
        groupName: '',
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

    handleCreate = () => {
        const { checked, groupName } = this.state;
        this.props.createGroup({ checked, groupName });
        this.handleClose();
    };

    handleClose = () => {
        this.props.onClose();
    };

    render() {
        const { groupName, checked } = this.state;
        const { open, usersArray } = this.props;
        return (
            <Dialog open={open} onClose={this.handleClose} fullWidth maxWidth={'md'} aria-labelledby="simple-dialog-title">
                <DialogTitle id="simple-dialog-title">Create A Group</DialogTitle>
                <Fragment>
                    <TextField margin='normal' fullWidth style={{ maxWidth: window.innerWidth / 2, marginLeft: window.innerWidth / 24 }}
                        type="text" placeholder="Write Group Name" name="group" value={groupName}
                        onChange={text => this.setState({ groupName: text.target.value })} />
                    <List>
                        {usersArray.map((value, index) => (
                            <ListItem key={index} dense button onClick={this.handleToggle(value.uid)}>
                                <ListItemAvatar style={{ backgroundColor: '#303f9f' }}>
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={value.name} secondary={value.email} />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        onChange={this.handleToggle(value.uid)}
                                        checked={checked.indexOf(value.uid) !== -1}
                                        color='primary'
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </Fragment>
                <DialogActions>
                    <Button size='large' variant="contained" onClick={this.handleCreate} color="primary">
                        <b>Create</b>
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createGroup: bindActionCreators(createGroup, dispatch)
    }
}
export default connect(null, mapDispatchToProps)(CreateGroupPage);