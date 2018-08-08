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
import { loginUser, emailChanged, passwordChanged } from "./actions/authActions";
import { recentsData } from './actions/userActions';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const { email, password } = this.props;
        if (email && password) {
            this.props.loginUser({ email, password }).then(() => this.props.recentsData())
        }
    }
    render() {
        return (
            <Grid container xs={12} sm={12} md={12} lg={12} direction='row'  justify='center' style={{padding:200}}>
                <Card >
                    <CardContent>
                        <Typography variant="headline" component="h2">
                            Giriş Yap
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <TextField style={{ width: 500 }} type="text" className="form-control" placeholder="Email" name="email"
                            value={this.props.email} onChange={e => this.props.emailChanged(e.target.value)} />
                    </CardContent>
                    <CardContent>
                        <TextField style={{ width: 500 }} type="password" className="form-control" placeholder="Password" name="password"
                            value={this.props.password} onChange={e => this.props.passwordChanged(e.target.value)} />
                    </CardContent>
                    <CardActions>
                        <Button variant="contained" size="large" color="primary"
                                onClick={this.handleSubmit}>Login</Button>
                    </CardActions>
                </Card>
            </Grid>


        );
    }
}
const mapStatetoProps = ({ AuthResponse }) => {
    const { email, password, loading, loggedIn } = AuthResponse;
    return {
        email,
        password,
        loading,
        loggedIn
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: bindActionCreators(loginUser, dispatch),
        emailChanged: bindActionCreators(emailChanged, dispatch),
        passwordChanged: bindActionCreators(passwordChanged, dispatch),
        recentsData: bindActionCreators(recentsData, dispatch),
    };
}

export default connect(mapStatetoProps, mapDispatchToProps)(LoginPage);




