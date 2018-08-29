import React, { Component } from 'react';
import {
    List,
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
    DialogTitle,
    DialogActions,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person';
import '../../.././styles.css';
class GroupInfo extends Component {

    handleClose = () => {
        this.props.onClose();
    };

    render() {
        const { open, groupUsersInfoArray, groupName } = this.props
        return (
            <Dialog open={open} onClose={this.handleClose} fullWidth maxWidth={'md'} aria-labelledby="simple-dialog-title">
                <DialogTitle id="simple-dialog-title">Group Members</DialogTitle>
                <DialogContent>
                    <DialogContentText >
                        {groupName}
                    </DialogContentText>
                </DialogContent>
                <List>
                    {groupUsersInfoArray.map((value, index) => (
                        <ListItem key={index} dense >
                            <ListItemAvatar className='ListItemAvatar'>
                                <Avatar>
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={value.name} secondary={value.email} />
                        </ListItem>
                    ))}
                </List>
                <DialogActions>
                    <Button size='large' variant="contained" onClick={this.handleClose} color="primary">
                        <b>OK</b>
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
export default GroupInfo;