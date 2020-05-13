import React, { useState, useEffect } from 'react';

import Splash from '../pages/Splash';
import Archive from '../pages/Archive';
import Forum from '../pages/Forum';
import EventsPage from '../pages/EventsPage';
import Thread from '../pages/Thread';
import Snippet from '../pages/Snippet';
import Event from '../pages/Event';
import NewSnippetForm from '../pages/NewSnippetForm';
import NewThreadForm from '../pages/NewThreadForm';
import NewEventSuggestionForm from '../pages/NewEventSuggestionForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NotFound from '../pages/NotFound';

import Auth from '../utils/Auth';

import { Route, Switch, useRouteMatch } from "react-router-dom";

export default function MainClient(props) {
    let { path } = useRouteMatch();

    const [authStatus, setAuthStatus] = useState(false)
    const [currentPage, setCurrentPage] = useState('')
    
    useEffect(() => {
        async function check(){
          Auth.CheckCredentials()
          .then((res) => {
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

    const renderer = (Component, selectedPage = '') => (innerProps) => {
      setCurrentPage(selectedPage);
      return <Component {...innerProps} redirect={(path) => props.redirect(path)} />
    };

    return (
        authStatus ?
        <div style={{ height: '100%' }}>
            <Navbar pageType={currentPage} />
            <Switch>
                <Route exact path={path} render={renderer(Splash)} /> } />
                <Route path={`${path}archive`} render={renderer(Archive, 'archive')} />
                <Route path={`${path}thread/:id`} render={renderer(Thread, 'forum')} />
                <Route path={`${path}events_page`} render={renderer(EventsPage, 'events')} />
                <Route path={`${path}event/:id`} render={renderer(Event, 'events')} />
                <Route path={`${path}snippet/:id`} render={renderer(Snippet, 'archive')} />
                <Route path={`${path}submit/snippet`} render={renderer(NewSnippetForm, 'archive')} />
                <Route path={`${path}submit/event`} render={renderer(NewEventSuggestionForm, 'events')} />
                <Route path={`${path}forum`} render={renderer(Forum, 'forum')} />
                <Route path={`${path}submit/thread`} render={renderer(NewThreadForm, 'forum')} />
                <Route path="*" render={renderer(NotFound)} />
            </Switch>
            <Footer />
        </div>
        :
        <div>Authenticating</div>
        )
    
}