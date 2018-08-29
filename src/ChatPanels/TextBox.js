import React , {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Grid,
    Paper,
    IconButton,
    TextField,
} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import {
    messageChanged,
    sendMessage,
} from '.././actions/messageActions';
import {
    sendGroupMessage,
} from '.././actions/groupActions';

import '.././styles.css'

class TextBox extends Component{
    handleResize = () => {
        this.forceUpdate();
    };
    componentWillMount() {
        this.handleResize();
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }

    componentDidUpdate = () => {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        const elem = document.querySelector('.scrollableContianer ul');
        if (elem) {
            elem.scrollTop = elem.scrollHeight;
        }
    };

    handleClickSend = () => {
        const { message, myName } = this.props;
        const { selectedUser, selectedUserName, selectedUserType } = this.props;
        if (message && selectedUser && myName) {
            if (selectedUserType === 'User') {
                this.props.sendMessage({ message, selectedUser, myName, selectedUserName });
            }
            else {
                this.props.sendGroupMessage({ message, selectedUser, myName })
            }
        }
    };

    render(){
        const {message} = this.props;
        return(
            <Grid container xs={8} sm={8} md={8} lg={8} direction='column' alignItems='stretch' className='GridText'>
                    {
                        this.props.isSelected &&
                        <Paper className='PaperText'>
                            <TextField
                                placeholder="Type Something..."
                                multiline
                                rowsMax={2} 
                                onChange={e => this.props.messageChanged(e.target.value)}
                                value={message}
                                className={'TextMessage-' + (window.innerWidth < 800 ? 'small' : 'large')}
                            />
                            <IconButton aria-label="Send" color='primary'
                                disabled={message.length === 0}
                                onClick={this.handleClickSend}>
                                <SendIcon />
                            </IconButton>
                        </Paper >
                    }
                </Grid>
        )
    }
}

const mapStatetoProps = ({ UserResponse, MessageResponse, PanelResponse }) => {
    var { message } = MessageResponse;
    const { Users, myName } = UserResponse;
    const {selectedUserType, selectedUser, isSelected, selectedUserName} = PanelResponse;
    return {
        usersArray: (Users || []),
        message,
        myName: (myName || []),
        selectedUserType,
        selectedUser,
        isSelected,
        selectedUserName,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        messageChanged: bindActionCreators(messageChanged, dispatch),
        sendMessage: bindActionCreators(sendMessage, dispatch),
        sendGroupMessage: bindActionCreators(sendGroupMessage, dispatch),
    };
}
export default connect(mapStatetoProps, mapDispatchToProps)(TextBox);