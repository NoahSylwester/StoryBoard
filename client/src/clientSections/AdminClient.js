import React, { useState, useEffect } from 'react';

import Admin from '../pages/Admin';
import AdminEvent from '../pages/AdminEvent';
import AdminSnippet from '../pages/AdminSnippet';
import AdminThread from '../pages/AdminThread';

import Auth from '../utils/Auth';

import { Route, Switch, useRouteMatch } from "react-router-dom";

export default function AdminClient(props) {
    let { path } = useRouteMatch();

    const [authStatus, setAuthStatus] = useState(false)
    
    useEffect(() => {
        async function check(){
          Auth.CheckAdminCredentials()
          .then((res) => {
              console.log(res)
              setAuthStatus(true)
          })
          .catch(err => {
            err.response.status === 401
            ?
            props.redirect("/auth/login")
            :
            console.log(err)
          });
        }
        check();
      }, [])

    const renderer = (Component) => (innerProps) => <Component {...innerProps} redirect={(path) => props.redirect(path)} />;

    return (
        authStatus ?
        <div style={{ height: '100%' }}>
          <Switch>
            <Route exact path={`${path}/`} render={(innerProps) => <Admin {...innerProps} redirect={(path) => props.redirect(path)} /> } />
            <Route exact path={`${path}/event/:id`} render={(innerProps) => <AdminEvent {...innerProps} redirect={(path) => props.redirect(path)} /> } />
            <Route exact path={`${path}/snippet/:id`} render={(innerProps) => <AdminSnippet {...innerProps} redirect={(path) => props.redirect(path)} /> } />
            <Route exact path={`${path}/thread/:id`} render={(innerProps) => <AdminThread {...innerProps} redirect={(path) => props.redirect(path)} /> } />
            {/* <Route path="*" component={NotFound} /> */}
          </Switch>
        </div>
        :
        <div>Authenticating</div>
        )
    
}