import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'

import { user } from '../../utils/models'

import { login } from '../../state/actions/authActions';
import { Header, Footer } from "../../components"
//import { attemptAuth } from '../../utils/services/authhandler';

import styles from './login.css'
import { SIGNING_IN_SUCCESS, SIGNING_IN_ERROR } from '../../state/actions/types';





class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            formValid: false,
            user: { email: user.email, password: user.password },
            newUser: { email: "", password: "" },
        }
    }
    
    handleSubmit(e) {
        e.preventDefault();
        console.log("submitted");
        this.props.login(this.state.newUser)
    }

    handleChange(key, previousState, newValue) {
        const newUser = { ...this.state.newUser }
        newUser[key] = newValue;
        this.setState({ newUser: newUser })
    }

    render() {
        return (
            <div>
                {/* <Header/> */}
                <div className='container'>
                    <form>
                        <h1>Log In</h1>
                        <Input
                            floatingLabelText="Email"
                            name="email"
                            ref="email"
                            fullWidth='true'
                            onChange={this.handleChange.bind(this, 'email')} />
                        <Input
                            floatingLabelText="Password"
                            name="password"
                            ref="password"
                            fullWidth='true'
                            type="password"
                            onChange={this.handleChange.bind(this, 'password')} />
                        <RaisedButton
                            type="submit"
                            label="Submit"
                            fullWidth='true'
                            className="submit"
                            primary={true}
                            onClick={this.handleSubmit.bind(this)} />
                    </form>
                </div>
            </div>
        )
    }
}

const attemptLogin = (dispatch, props) => {
    return {
        login(body) {
            login(body)
                .then(data => {
                    console.log(data)
                    dispatch({type: SIGNING_IN_SUCCESS, payload: data})
                    props.history.push('/dashboard')
                })
                .catch(err => {
                    console.log(err)
                    dispatch({ type: SIGNING_IN_ERROR, payload: err })
                })
        }
    }
}

export default connect(null, attemptLogin)(Login);