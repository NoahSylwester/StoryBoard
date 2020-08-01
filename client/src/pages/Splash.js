import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import EventItem from '../components/EventItem';
import ForumItem from '../components/ForumItem';
import Colors from "../themes/colors";
import SVGLoadingIcon from "../components/SVGLoadingIcon"

export default function Splash(props) {

  const [eventsData, setEventsData] = useState([]);
  const [forumData, setForumData] = useState([]);
  
  // fill page with events on load
  useEffect(() => {
    async function fetchEvents(){
      API.getSoonestEvents()
      .then((events) => setEventsData(events.data))
      .catch(err => {
        err.response.status === 401
        ?
        props.redirect("/auth/login")
        :
        console.log(err)
      });
    }
    fetchEvents();
  }, [])

  // fill page with threads on load
  useEffect(() => {
    async function fetchThreads(){
      API.getLatestThreads()
      .then((threads) => setForumData(threads.data))
      .catch(err => {
        err.response.status === 401
        ?
        props.redirect("/auth/login")
        :
        console.log(err)
      });
    }
    fetchThreads();
  }, []);

  return (
    <div style={styles.page}>
    {/* <div style={{backgroundImage: 'url("https://images.unsplash.com/photo-1485745492261-a3819c494d11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80")'}}> */}
        {/* <img style={styles.splash} src={'https://images.unsplash.com/photo-1485745492261-a3819c494d11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'} alt="resistthere splash" /> */}
        <h1 style={styles.title}>StoryBoard</h1>
        <h4 style={styles.centerAlign}>Share your stories</h4>
        <div className='container'>
            <div className='row'>
                <div style={styles.centerAlign} className="col-6">
                    <h3 style={styles.columnHeader}>Recent Forum Activity:</h3>
                    {forumData ? forumData.map((item, i) => <ForumItem splash key={i} item={item} />) : <SVGLoadingIcon small />}
                </div>
                <div style={styles.centerAlign} className="col-6">
                    <h3 style={styles.columnHeader}>Upcoming Events:</h3>
                    {eventsData ? eventsData.map((item, i) => <EventItem splash key={i} item={item} />) : <SVGLoadingIcon small />}
                </div>
            </div>
        </div>
    </div>
    // </div>
  );
}

const styles = {
    page: {
      // backgroundImage: 'url("https://images.unsplash.com/photo-1485745492261-a3819c494d11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80")',
      backgroundColor: Colors.color2,
      paddingTop: 20,
      paddingBottom: 20
    },
    title: {
      // backgroundImage: 'url("https://images.unsplash.com/photo-1485745492261-a3819c494d11?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80")',
      backgroundColor: Colors.background2,
      textAlign: 'center',
      color: Colors.title,
      // borderRadius: 30,
      padding: 10,
      // width: '50%',
      margin: 'auto',
      marginBottom: 20,
      fontSize: '5rem',
      fontFamily: "'Playfair Display', serif",
      // border: "2px solid " + Colors.border1
    },
    splash: {
        width: '100%',
        height: '300px',
        objectFit: 'cover',
        // minWidth: '800px',
        // resizeMode: 'cover'
    },
    centerAlign: {
        textAlign: 'center'
    },
    columnHeader: {
      backgroundColor: Colors.background2,
      color: Colors.text2,
      padding: 5,
      margin: 'auto',
      marginTop: 10,
      marginBottom: 30,
      width: '80%',
      // borderRadius: 5,
      borderBottom: '2px solid ' + Colors.color1
    }
}