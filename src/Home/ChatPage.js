import React, { Component } from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import {
    Grid, 
} from '@material-ui/core';
import { usersAllData, recentsData} from '.././actions/userActions';
import {
    myGroupsData,
} from '.././actions/groupActions';

import Header from '.././ChatPanels/Header';
import LeftPanel from '.././ChatPanels/LeftPanel';
import TextBox from '.././ChatPanels/TextBox';
import ChatPanel from '.././ChatPanels/ChatPanel';

class ChatPage extends Component {
    componentWillMount() {
        this.props.usersAllData();
        this.props.recentsData();
        this.props.myGroupsData();
    }
    render() {
        return (
            <Grid container >
                <Header /> {/* Navbar */}
                <LeftPanel /> {/* Left Side of the page Tabs and List */}
                <ChatPanel />{/* Messages */}
                <TextBox />{/* Bottom side (textArea) */}
            </Grid>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        usersAllData: bindActionCreators(usersAllData, dispatch),
        recentsData: bindActionCreators(recentsData, dispatch),
        myGroupsData: bindActionCreators(myGroupsData, dispatch),
        
    };
}
export default connect(null,mapDispatchToProps)(ChatPage);