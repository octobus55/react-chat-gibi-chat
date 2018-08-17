import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { emailChanged, passwordChanged, passwordConfirmChanged, registerUser, nameChanged } from "./actions/authActions";
import './styles.css';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const { email, password, passwordConfirm, name } = this.props;
        if (email && password && passwordConfirm && (password === passwordConfirm)) {
            this.props.registerUser({ email, password, name });
        }
        else{
            console.log("şifreler farklı");
        }
    }
    render() {
        return (
            <Grid container  direction='row' justify='center' style={{padding:200}}>
                <Card >
                    <CardContent>
                        <Typography variant="headline" component="h2">
                            Sign Up
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <TextField className='RegisterTextField' type="text" placeholder="Name" name="name"
                            value={this.props.name} onChange={e => this.props.nameChanged(e.target.value)} />
                    </CardContent>
                    <CardContent>
                        <TextField className='RegisterTextField' type="text" placeholder="Email" name="email"
                            value={this.props.email} onChange={e => this.props.emailChanged(e.target.value)} />
                    </CardContent>
                    <CardContent>
                        <TextField className='RegisterTextField' type="password" placeholder="Password" name="password"
                            value={this.props.password} onChange={e => this.props.passwordChanged(e.target.value)} />
                    </CardContent>
                    <CardContent>
                        <TextField className='RegisterTextField' type="password" placeholder="Password" name="password"
                            value={this.props.passwordConfirm} onChange={e => this.props.passwordConfirmChanged(e.target.value)} />
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" size="large" color="primary"
                                onClick={this.handleSubmit}>Sign Up</Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
}

const mapStatetoProps = ({ AuthResponse }) => {
    const { email, password, passwordConfirm, loading, loggedIn,name } = AuthResponse;
    return {
        email,
        password,
        name,
        passwordConfirm,
        loading,
        loggedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        emailChanged : bindActionCreators(emailChanged, dispatch),
        passwordChanged : bindActionCreators(passwordChanged, dispatch),
        passwordConfirmChanged : bindActionCreators(passwordConfirmChanged, dispatch),
        registerUser : bindActionCreators(registerUser, dispatch),
        nameChanged : bindActionCreators(nameChanged, dispatch),
    };
};

export default connect(mapStatetoProps, mapDispatchToProps)(LoginPage);




