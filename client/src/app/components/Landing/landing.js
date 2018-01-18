import React, { Component } from 'react';
import { Header, Footer } from "../../components"
import { attemptAuthentication } from '../../utils/services/authhandler'
import RaisedButton from 'material-ui/RaisedButton';

import {Login} from '../login/login';
import {Register} from '../register/register';


class Landing extends Component {
    // componentDidMount() {
    //     attemptAuthentication();
    // }
    login() {
        return window.location.href = '/login';
    }
    register() {
        return window.location.href = '/signup';
    }
    render() {
        return (

            <div >
                
                <RaisedButton label="Default" onClick={this.login} />
                <RaisedButton label="Primary" onClick={this.register}   />
                
            </div>
        )
    }
}

export default Landing;