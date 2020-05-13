import React, { useState, useEffect } from 'react';
import TopicSelector from '../components/TopicSelector'
import API from '../utils/API';
import Colors from '../themes/colors';

export default function NewEventSuggestionForm(props) {

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState('');

  const [topicsList, setTopicsList] = useState([]);
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

  const submitSuggestionRequest = () => {
    API.saveEvent({
        title,
        content,
        date,
        topics
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
      <header style={styles.header}>
        <h1>Suggest a new event</h1>
      </header>
      <div style={styles.formContent}>
          <label htmlFor="eventTitle">Title</label>
          <input style={styles.titleInput} onChange={event => setTitle(event.target.value)} value={title} type="text" id="eventTitle" name="eventTitle" />

          <label htmlFor="eventDate">Date and Time (your local time)</label>
          <input type="datetime-local" onChange={event => {console.log(event.target.value);setDate(event.target.value)}} value={date} id="eventDate" name="eventDate" style={{...styles.contentInput, ...styles.dateTimeInput}} />

          <label htmlFor="eventContent">Description of event</label>
          <textarea onChange={event => setContent(event.target.value)} value={content} id="eventContent" name="eventContent" style={styles.contentInput} />

          <label htmlFor="eventTopics">Topics</label>
          <div>{topics.map((item) => <span key={item} onClick={(event) => removeTopic(item)} style={styles.topic}>{item}</span>)}</div>

          <TopicSelector type="event" pass={{ newTopic, setNewTopic: event => setNewTopic(event.target.value), topicsList, addTopic  }} />

          <button style={styles.submitButton} onClick={submitSuggestionRequest} className="btn btn-lg btn-dark">Submit</button>
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
      fontSize: '2rem',
      width: '70%',
      textAlign: 'center',
      borderBottom: '2px solid ' + Colors.border1,
      borderTop: 'none',
      borderRight: 'none',
      borderLeft: 'none',
    },
    dateTimeInput: {
      textAlign: 'center',
    },
    contentInput: {
      borderRadius: '7px',
      width: '70%',
      border: '2px solid ' + Colors.border1,
    },
    newTopicInput: {
      border: '2px solid ' + Colors.border1,
      borderTopLeftRadius: '7px',
      borderBottomLeftRadius: '7px',
      margin: 0,
      height: 38,
      padding: 5
    },
    newTopicButton: {
      border: '2px solid ' + Colors.border1,
      borderLeft: '0px solid ' + Colors.border1,
      borderTopRightRadius: '7px',
      borderBottomRightRadius: '7px',
      backgroundColor: Colors.color2,
      margin: 0,
      padding: 5,
      fontWeight: 'bold'
    },
    topic: {
      margin: '5px',
      padding: '3px',
      borderRadius: '7px',
      backgroundColor: Colors.color2,
      border: '2px solid ' + Colors.border1,
      cursor: 'pointer'
    },
    formContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitButton: {
      margin: 10
    }
}