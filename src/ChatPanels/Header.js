import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Grid,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
} from '@material-ui/core';
import ForumIcon from '@material-ui/icons/Forum';
import CreateGroupPage from './CreateGroupPage';
import {
    offMessageListener
} from '.././actions/messageActions';
import { logout } from '.././actions/authActions';
import {
    offGroupMessageListener,
} from '.././actions/groupActions';

class Header extends Component{
    state = {
        open: false
    }

    handleLogOut = () => {
        const { offGroupMessageListener,offMessageListener, logout } = this.props;
        if (this.state.selectedUserType === 'User') {
            const uid = this.state.selectedUser;
            offMessageListener({ uid })
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

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    render(){
        return(
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
        )
    }
}
const mapStatetoProps = ({ UserResponse}) => {
    const { Users} = UserResponse;
    return {
        usersArray: (Users || []),
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        offMessageListener: bindActionCreators(offMessageListener, dispatch),
        logout: bindActionCreators(logout, dispatch),
        offGroupMessageListener: bindActionCreators(offGroupMessageListener, dispatch),
    };
}
export default connect(mapStatetoProps , mapDispatchToProps)(Header);