import React, { Component } from 'react';
import { connect } from 'react-redux';
import styles from './register.css'

import Input from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


import { user } from '../../utils/models'
import { register } from '../../state/actions/authActions';
import { Header, Footer } from "../../components"
import {attemptAuth} from '../../state/actions/authActions';


class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formValid: false,
            user,
            newUser: {},
            redirect: false
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        //console.log(this.state.newUser);
        this.props.attemptRegistry(this.state.newUser)

    }

    handleChange(key, previousState, newValue) {
        console.log(key, newValue)
        // let valid;
        // if (key === 'passwordConfirmation') valid = this.state.user.passwordConfirmation.validate(newValue, this.state.user.password);
        // else vlaid = this.state.user[key].validate(newValue);

        const newUser = { ...this.state.newUser }
        newUser[key] = newValue;
        this.setState({ newUser: newUser })

        // if(valid) {
        //     newUser[key] = newValue;
        //     this.setState({newUser: newUser})
        // }
    }

    render() {
        return (
            <div>
                <Header />
                <div className='container'>

                    <form>
                        <h1>Sign Up</h1>
                        <Input
                            floatingLabelText="First Name"
                            name="firstName"
                            ref="firstName"
                            fullWidth='true'
                            onChange={this.handleChange.bind(this, 'firstname')} />
                        <Input
                            floatingLabelText="Last Name"
                            name="lastName"
                            ref="lastName"
                            fullWidth='true'
                            onChange={this.handleChange.bind(this, 'lastname')} />
                        <Input
                            floatingLabelText="Email"
                            name="email"
                            ref="email"
                            fullWidth='true'
                            onChange={this.handleChange.bind(this, 'email')} />
                        <Input
                            floatingLabelText="Password"
                            type="password"
                            name="password"
                            ref="password"
                            fullWidth='true'
                            onChange={this.handleChange.bind(this, 'password')} />
                        <Input
                            floatingLabelText="Confirm Password"
                            type="password"
                            name="passwordConfirmation"
                            ref="passwordConfirmation"
                            fullWidth='true'
                            onChange={this.handleChange.bind(this, 'passwordConfirmation')} />
                        <RaisedButton
                            type="submit"
                            label="Submit"
                            fullWidth='true'
                            primary={true}
                            onClick={this.handleSubmit.bind(this)} />
                    </form>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        attemptRegistry(body) {
            register(body)
                .then(data => {
                    console.log("Register Event occurred and succeeded!", data);
                    dispatch({ type: SIGNING_IN_SUCCESS, payload: data })
                    // props.history.push('/home')
                })
                .catch(err => {
                    console.error("Registration event occurred and failed :(.", err);
                    dispatch({ type: SIGNING_IN_ERROR, payload: err })
                    console.log(props);
                })
        }
    }
}

function attemptRegistry(body) {
    console.log(body)
    register(body)
        .then(data => {
            console.log("registered", data)
            attemptAuth.authenticate();
            console.log(attemptAuth.isAuenticated)
            window.location.href = '/Dashboard';
        })
        .catch(err => {
            console.log("error", err)
        })
}

export default Register;