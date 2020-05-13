import React from 'react';

import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import NotFound from '../pages/NotFound';

import { BrowserRouter as Router, Route, Switch, useRouteMatch } from "react-router-dom";
import Auth from '../utils/Auth';

export default function AuthClient(props) {
    let { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={`${path}/login`} render={(innerProps) => <Login {...innerProps} redirect={(path) => props.redirect(path)} /> } />
            <Route exact path={`${path}/signup`} render={(innerProps) => <SignUp {...innerProps} redirect={(path) => props.redirect(path)} /> } />
            <Route path="*" component={NotFound} />
        </Switch>
    )
}