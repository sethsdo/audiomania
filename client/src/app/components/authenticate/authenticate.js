import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    console.log('from protected route', isAuthenticated);
    return (
        <Route {...rest} render={props => (
            console.log(props),
            isAuthenticated ?
                <Component auth={isAuthenticated} {...props} /> :
                <Redirect to='/login' />
        )} />
    )
}


class Authenticated extends Component {
    componentWillMount() {
        console.log(this.props, 'from component will mount');
        if (this.props.isAuthenticated) {
            console.log('props is authenticated');
            if (this.props.match.path === '/' || this.props.match.path === '/login') {
                return this.props.history.push('/dashboard');
            }
            return
        }
        console.log('about to attempt auth');
        this.props.attemptAuth()
            .then(_ => { })
            .catch(_ => this.props.history.replace('/'));

    }

    render() {
        return (
            <Route {...this.props} render={props => (
                props.isAuthenticated ?
                    <this.props.Component {...props} /> :
                    <Redirect to="/" />
            )} />
        )
    }
}


