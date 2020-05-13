import React, { useState, useEffect } from 'react';
import TopicSelector from '../components/TopicSelector'
import API from '../utils/API';
import Colors from '../themes/colors';

export default function NewThreadForm(props) {

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState('');
  const [topicsList, setTopicsList] = useState([]);
  // fetch topics list on load
  useEffect(() => {
    async function fetchTopics(){
      API.getTopics()
      .then(topicsRes => setTopicsList(topicsRes.data))
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

  const submitCreationRequest = () => {
    API.saveThread({
      title,
      content,
      topics
    })
    .then(function (response) {
      console.log(response);
      props.redirect("/forum");
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
        <h1>Create a new thread</h1>
      </header>
      <div style={styles.formContent}>
          <label htmlFor="threadTitle">Title</label>
          <input onChange={event => setTitle(event.target.value)} value={title} style={styles.titleInput} type="text" id="threadTitle" name="threadTitle" />
          <label htmlFor="threadContent">Content</label>
          <textarea onChange={event => setContent(event.target.value)} value={content} style={styles.contentInput} id="threadContent" name="threadContent" />

          <label htmlFor="threadTopics">Topics</label>
          <div>{topics.map((item) => <span key={item} onClick={(event) => removeTopic(item)} style={styles.topic}>{item}</span>)}</div>

          <TopicSelector type="thread" pass={{ newTopic, setNewTopic: event => setNewTopic(event.target.value), topicsList, addTopic  }} />

          <button onClick={submitCreationRequest} style={styles.createButton} className="btn btn-lg btn-dark">Create</button>
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
    contentInput: {
      borderRadius: '7px',
      width: '70%',
      border: '2px solid ' + Colors.border1,
    },
    topic: {
      margin: '5px',
      padding: '3px',
      borderRadius: '7px',
      backgroundColor: Colors.color2,
      border: '2px solid ' + Colors.border1,
      cursor: 'pointer'
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
    formContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    createButton: {
      margin: 10
    }
}