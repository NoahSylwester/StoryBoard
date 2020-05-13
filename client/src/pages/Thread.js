import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import CommentsContainer from '../components/CommentsContainer';
import CommentModal from '../components/CommentModal';
import ReplyModal from '../components/ReplyModal';
import Colors from '../themes/colors';

export default function Thread(props) {

  // set state of forum contents
  const [thread, setThread] = useState(undefined);
  const [repliedTo, setRepliedTo] = useState({});
  const [repliedToPostFn, setRepliedToPostFn] = useState(() => () => undefined)

  async function updateThread(id) {
    API.getThread(id)
    .then((fetchedThread) => setThread(fetchedThread.data))
    .catch(err => {
      err.response.status === 401
      ?
      props.redirect("/auth/login")
      :
      console.log(err)
    });
  }
  // fill forum with threads on load
  useEffect(() => {
    updateThread(props.match.params.id);
  }, [props.match.params.id])

  const parseDate = (dateInput) => {
    const date = new Date(dateInput);
    return date.toUTCString();
  }

  return (
    thread ?
    <div style={styles.page}>
        <CommentModal update={() => updateThread(props.match.params.id)} parentEntityType={"thread"} parentEntityId={thread._id} />
        <ReplyModal repliedTo={repliedTo} updatePost={repliedToPostFn} parentEntityType={"thread"} parentEntityId={thread._id} />
        <header style={styles.firstPost}>
          <h1>{thread.title}</h1>
          <i>{parseDate(thread.date_created)}</i>
          <p>Author:</p>
          <h3>{thread.author.name}</h3>

          <div>{thread.topics ? thread.topics.map((item) => <span key={item} style={styles.topic}>{item}</span>) : <div/>}</div>

          <hr />
          <p style={styles.content}>{thread.content}</p>
        </header>
        <button className="btn btn-md btn-dark" data-toggle="modal" data-target="#commentModal">Comment</button>

        <CommentsContainer pass={{ parent: thread, setRepliedTo, setRepliedToPostFn }} />

    </div>
    :
    <div/>
  );
}

const styles = {
    page: {
      padding: "0 4%",
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    firstPost: {
      width: '100%',
      padding: 30,
      backgroundColor: Colors.color1,
      borderRadius: "7px",
      // border: "1px solid " + Colors.border1,
      margin: 10,
    },
    content: {
      whiteSpace: 'pre-wrap',
      overflowWrap: 'break-word'
    },
    topic: {
      margin: '5px',
      padding: '3px',
      borderRadius: '7px',
      backgroundColor: Colors.color2,
      border: '2px solid ' + Colors.border1,
      color: Colors.text1,
      display: 'inline-block'
    },
}