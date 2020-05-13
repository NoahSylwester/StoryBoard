import React, { useState, useEffect } from 'react';
import TopicSelector from '../components/TopicSelector';
import API from '../utils/API';
import AdminAPI from '../utils/AdminAPI';
import AdminPost from '../components/AdminPost';

export default function AdminEvent(props) {

  const [id, setId] = useState('');
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState('');
  const [quarantined, setQuarantined] = useState('');
  const [posts, setPosts] = useState('');

  const [topicsList, setTopicsList] = useState([]);

  async function fetchEvent(){
    API.getEvent(props.match.params.id)
    .then(fetchedEvent => {
      setAuthor(fetchedEvent.data.author.name)
      setId(fetchedEvent.data._id)
      setTitle(fetchedEvent.data.title);
      setDate(fetchedEvent.data.date.slice(0, 16));
      setContent(fetchedEvent.data.content);
      setTopics(fetchedEvent.data.topics);
      setQuarantined(fetchedEvent.data.quarantined);
      setPosts(fetchedEvent.data.posts);
    })
    .catch(err => {
      console.log(err)
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

  // fetch topics list on load
  useEffect(() => {
    async function fetchTopics(){
      API.getTopics()
      .then((topicsRes) => setTopicsList(topicsRes.data))
      .catch(err => {
        err.response.status === 401
        ?
        props.redirect("/auth/login")
        :
        console.log(err)
      });
    }
    fetchTopics();
  }, [])

  const addTopic = (event) => {
    event.preventDefault();
    if (topics.includes(newTopic) || newTopic === '') {
      return;
    }
    else {
      setTopics([...topics, newTopic])
    }
  }

  const removeTopic = (item) => {
    const newTopicsArr = [...topics]
    newTopicsArr.splice(newTopicsArr.indexOf(item), 1)
    setTopics(newTopicsArr)
  }

  const submitUpdateRequest = () => {
    AdminAPI.updateEvent(id, {
        title,
        content,
        date,
        topics,
        quarantined
      })
    .then(function (response) {
      console.log(response);
      props.redirect("/events_page");
    })
    .catch(err => {
      err.response.status === 401
      ?
      props.redirect("/auth/login")
      :
      console.log(err)
    });
  }

  return (
    <div>
      <a href="/admin" style={{margin: 10, fontSize: '2rem'}}>← Back</a>
      <header style={styles.header}>
        <h1>Edit event</h1>
      </header>
      <div style={styles.formContent}>
          <i>Submitted by {author}</i>
          <label htmlFor="eventTitle">Title</label>
          <input style={styles.titleInput} onChange={event => setTitle(event.target.value)} value={title} type="text" id="eventTitle" name="eventTitle" />

          <label htmlFor="eventDate">Date and Time (your local time)</label>
          <input type="datetime-local" onChange={event => setDate(event.target.value)} value={date} id="eventDate" name="eventDate" style={{...styles.contentInput, ...styles.dateTimeInput}} />

          <label htmlFor="eventContent">Description of event</label>
          <textarea onChange={event => setContent(event.target.value)} value={content} id="eventContent" name="eventContent" style={styles.contentInput} />

          <label htmlFor="eventTopics">Topics</label>
          <div>{topics.map((item) => <span key={item} onClick={(event) => removeTopic(item)} style={styles.topic}>{item}</span>)}</div>

          <TopicSelector type="event" pass={{ newTopic, setNewTopic: event => setNewTopic(event.target.value), topicsList, addTopic  }} />

          <button style={styles.quarantineButton} onClick={() => setQuarantined(!quarantined)} className={`btn btn-lg btn-${quarantined ? "info": "success"}`}>{quarantined ? "Quarantined" : "Approved"}</button>

          <button style={styles.submitButton} onClick={submitUpdateRequest} className="btn btn-lg btn-dark">Update</button>

          <div style={styles.posts}>
            {posts ? posts.slice().reverse().map((post) => <AdminPost key={post._id} post={{ ...post }} />) : <div />}
          </div>
      </div>
    </div>
  );
}

const styles = {
    header: {
        width: '100%',
        textAlign: 'center'
    },
    titleInput: {
      borderRadius: '7px',
      width: '70%',
      textAlign: 'center',
      border: '2px black solid',
    },
    dateTimeInput: {
      textAlign: 'center',
    },
    contentInput: {
      borderRadius: '7px',
      width: '70%',
      border: '2px black solid',
      whiteSpace: 'pre-wrap',
      overflowWrap: 'break-word'
    },
    topicForm: {
      background: 'black',
      borderRadius: '7px',
      display: 'flex',
      alignItems: 'center'
    },
    newTopicInput: {
      border: '2px black solid',
      borderTopLeftRadius: '7px',
      borderBottomLeftRadius: '7px',
      margin: 0,
      height: 38,
      padding: 5
    },
    newTopicButton: {
      border: '2px black solid',
      borderLeft: '0px black solid',
      borderTopRightRadius: '7px',
      borderBottomRightRadius: '7px',
      backgroundColor: '#eb6864',
      margin: 0,
      padding: 5,
      fontWeight: 'bold'
    },
    topic: {
      margin: '5px',
      padding: '3px',
      borderRadius: '7px',
      backgroundColor: '#eb6864',
      border: '2px black solid',
      cursor: 'pointer'
    },
    formContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    quarantineButton: {
      margin: 10
    },
    submitButton: {
      margin: 10
    },
    posts: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
}