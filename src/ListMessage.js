import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List} from '@material-ui/core';
import ListItemMessage from './ListItemMessage';
import {loadMessages} from './actions/messageActions';

class ListMessage extends Component {
    componentDidMount() {
        const { selectedUser } = this.props;
        this.props.loadMessages({selectedUser});
    }
    render() {
        const { selectedUser } = this.props;
        return (
            <List style={{ overflow: 'auto', maxHeight: window.innerHeight - 120 }}>
                {this.props.messagesArray.map((value, index) =>
                    <ListItemMessage
                    selectedUser = {selectedUser}
                    value = {value.message}
                    index = {index}
                    />
                )}
            </List>

        )
    }

}
const mapStatetoProps = ({ MessageResponse }) => {
    const {loadingMessage} = MessageResponse;
    const messagesArray = _.map(MessageResponse, (val) => {
        return { ...val };
    });
    return {
        messagesArray,
        loadingMessage,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadMessages: bindActionCreators(loadMessages, dispatch)
    };
}
export default connect(mapStatetoProps, mapDispatchToProps)(ListMessage);