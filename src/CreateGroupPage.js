import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import PersonIcon from '@material-ui/icons/Person';
import { usersAllData } from './actions/userActions';
import { Paper } from 'material-ui';
import { createGroup } from './actions/groupActions';


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
    
    handleCreate = () => () => {
        console.log("handle")
        const {checked, groupName} = this.state
        this.props.createGroup({checked, groupName});
        this.handleClose();
        
    };
    handleClose = () => {
        this.props.onClose();
    };

    render() {
        const { onClose, ...other } = this.props;
        return (
            <Dialog onClose={this.handleClose} fullWidth maxWidth={'md'} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">Create A Group</DialogTitle>
                <div>
                    <TextField margin='normal' fullWidth style={{ maxWidth: window.innerWidth / 2, marginLeft: window.innerWidth / 24 }} 
                    type="text" placeholder="Write Group Name" name="group" value={this.state.groupName}
                     onChange={text => this.setState({groupName: text.target.value})}/>
                    <List>
                        {this.props.usersArray.map((value, index) => (
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
                                        checked={this.state.checked.indexOf(value.uid) !== -1}
                                        color='primary'
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </List>
                </div>
                <DialogActions>
                    <Button size='large' variant="contained" onClick={this.handleCreate()} color="primary">
                        <b>Create</b>
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
const mapStatetoProps = ({  }) => {
    return {
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        createGroup : bindActionCreators(createGroup, dispatch)
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(CreateGroupPage);