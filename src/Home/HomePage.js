import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import firebase from '.././config/firebase';
import LoginPage from './Auth/LoginPage';

import ChatPage from './ChatPage';

class HomePage extends Component {
    state = {
        loading: true,
        authenticated: false
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loading: false, authenticated: true });
            } else {
                this.setState({ loading: false, authenticated: false });
            }
        });
    }

    render() {
        if (this.state.loading) return (
            <CircularProgress
                size={50}
                style={{
                    marginLeft: window.innerWidth / 2,
                    marginTop: window.innerHeight / 2
                }}
            />
        )
        if (!this.props.loginSucces && !this.state.authenticated) {
            return (
                <LoginPage />
            )
        }
        return (
            <ChatPage />
        )
    }
}


export default HomePage;