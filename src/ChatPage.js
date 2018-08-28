import React, { Component } from 'react';
import {
    Grid, 
} from '@material-ui/core';
import Header from './Header';
import LeftPanel from './LeftPanel';
import TextBox from './TextBox';
import ChatPanel from './ChatPanel';

class ChatPage extends Component {
    render() {
        return (
            <Grid container >
                <Header />
                <LeftPanel />
                <ChatPanel />
                <TextBox />
            </Grid>
        )
    }
}
export default ChatPage;