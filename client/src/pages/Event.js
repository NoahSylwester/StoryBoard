import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import CommentsContainer from '../components/CommentsContainer';
import CommentModal from '../components/CommentModal';
import ReplyModal from '../components/ReplyModal';
import Colors from '../themes/colors';

export default function Event(props) {
  // set state of forum contents
  const [event, setEvent] = useState([]);

  // fill forum with Events on load

  async function fetchEvent(){
    API.getEvent(props.match.params.id)
    .then(fetchedEvent => setEvent(fetchedEvent.data))
    .catch(err => {
      err.response.status === 401
      ?
      props.redirect("/auth/login")
      :
      console.log(err)
    });
  }
  useEffect(() => {
    fetchEvent();
  }, [props.match.params.id])

  const parseDate = (dateInput) => {
    const date = new Date(dateInput);
    return date.toUTCString();
  }

  // comment architecture
  const [repliedTo, setRepliedTo] = useState({});
  const [repliedToPostFn, setRepliedToPostFn] = useState(() => () => undefined)

  return (
    <div style={styles.page}>
        <CommentModal update={() => fetchEvent()} parentEntityType={"event"} parentEntityId={event._id} />
        <ReplyModal repliedTo={repliedTo} updatePost={repliedToPostFn} parentEntityType={"event"} parentEntityId={event._id} />

        <header style={styles.header}>
            <h1>{event.title}</h1>
            <i>{parseDate(event.date)}</i>
            <div>{event.topics ? event.topics.map((item) => <span key={item} style={styles.topic}>{item}</span>) : <div/>}</div>
        </header>

        <div style={styles.body}>
          <p style={styles.content}>{event.content}</p>  
        </div>
        
        {/* comments area */}
        <h2>Comments</h2>
        <button className="btn btn-md btn-dark" data-toggle="modal" data-target="#commentModal">Comment</button>
        
        <CommentsContainer pass={{ parent: event, setRepliedTo, setRepliedToPostFn }} />
    </div>
  );
}

const styles = {
    page: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    header: {
      width: '80%',
      padding: 20,
      textAlign: 'center',
      // backgroundColor: Colors.color1,
      // border: "1px solid " + Colors.border1,
      borderRadius: '7px',
      margin: 10
    },
    topic: {
      margin: '5px',
      padding: '3px',
      borderRadius: '7px',
      backgroundColor: Colors.color2,
      border: '2px solid ' + Colors.border1,
      cursor: 'default',
      display: 'inline-block',
      color: Colors.text1,
  },
    body: {
      width: '80%',
      // border: "1px solid " + Colors.border1,
      backgroundColor: Colors.color1,
      borderRadius: "7px",
      margin: 10,
      wordWrap: "break-word"
    },
    content: {
      padding: 20,
      whiteSpace: 'pre-wrap',
      overflowWrap: 'break-word'
    },
}
