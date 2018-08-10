import React, { Component } from 'react';

import firebase from './config/firebase';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ChatPage from './ChatPage';

class HomePage extends Component {
    state = { tabValue: 0, isSelected: false, secondary: false, selectedUser: '', selectedUserName: '', authenticated : false }

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
        console.log(this.props.loginSucces)
        console.log(this.state.authenticated)
        if (!this.props.loginSucces && !this.state.authenticated) {
            return (
                <LoginPage />
            )
        }
        return (
            <ChatPage/>
        )
    }
}


export default HomePage;