import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import GridList from 'material-ui/GridList';

import { connect } from 'react-redux';

import { Header, Footer, Login, Register, Dashboard, Landing, NotFound, Authenticate, Audio } from './components';

import './App.css';
import { attemptAuth } from './state/actions/authActions';
import { PrivateRoute } from './components/authenticate/authenticate';
import { SIGNING_IN_ERROR, SIGNING_IN_SUCCESS } from "./state/actions/types"


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount() {
    console.log(this.props.isAuthenticated)
    if(this.props.isAuthenticated) {
      if (this.props.match.path === '/') {
        return this.props.history.push('/dashboard')
      }
      return 
    }
    this.props.attemptAuth()
      .then(_ => {})
      .catch(_ => this.props.history.replace('/login'));
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path="" component={Audio} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Register} />
            <PrivateRoute path="/dashboard" isAuthenticated={this.props.isAuthenticated} component={Dashboard} />
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.authenticationReducer.user,
    isAuthenticated: state.authenticationReducer.isAuthenticated
  }
}

const mapDispatchToProps = (dispatch, otherprops) => {
  return {
    attemptAuth() {
      return new Promise((resolve, reject) => {
        attemptAuth()
          .then(({ data }) => {
            if (data) {
              console.log(data, "inmain app");
              dispatch({ type: SIGNING_IN_SUCCESS, payload: data })
              return window.location.href = '/Dashboard';
            }
            console.log(data, "in main app");
            dispatch({ type: SIGNING_IN_ERROR })
            resolve();
          })
          .catch(err => {
            console.log(`Not authenticated ${err}`);
            dispatch({ type: SIGNING_IN_ERROR })
          })
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
