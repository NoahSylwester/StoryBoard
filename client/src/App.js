import React from 'react';
import { Redirect } from "react-router-dom";

import MainClient from './clientSections/MainClient';
import AuthClient from './clientSections/AuthClient';
import AdminClient from './clientSections/AdminClient';

import Colors from './themes/colors';

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null
    }
  }

  render() {
  return (
    <Router>
      {this.state.redirect ? <Redirect to={this.state.redirect} /> : <div/>}
        <div style={{ height: '100%' }}>
          <Switch>
            <Route path="/admin" render={(props) => <AdminClient {...props} redirect={(path) => this.setState({ redirect: path })} />} />
            <Route path="/auth" render={(props) => <AuthClient {...props} redirect={(path) => this.setState({ redirect: path })} />} />
            <Route path="/" component={(props) => <MainClient {...props} redirect={(path) => this.setState({ redirect: path })} />} />
          </Switch>
        </div>
      </Router>
  );
      }
}