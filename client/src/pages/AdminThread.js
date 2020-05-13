import React, { useState, useEffect } from 'react';
import TopicSelector from '../components/TopicSelector';
import API from '../utils/API';
import AdminAPI from '../utils/AdminAPI';
import AdminPost from '../components/AdminPost';

export default function AdminThread(props) {

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState('');
  const [topicsList, setTopicsList] = useState([]);
  const [posts, setPosts] = useState('');

  async function fetchThread(){
    API.getThread(props.match.params.id)
    .then(fetchedThread => {
      setId(fetchedThread.data._id)
      setTitle(fetchedThread.data.title);
      setContent(fetchedThread.data.content);
      setTopics(fetchedThread.data.topics);
      setPosts(fetchedThread.data.posts);
    }) ///"1212-12-12T00:12"
    .catch(err => {
      err.response.status === 401
      ?
      props.redirect("/auth/login")
      :
      console.log(err)
    });
  }

  useEffect(() => {
    fetchThread();
  }, [props.match.params.id])

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

  const submitUpdateRequest = () => {
    AdminAPI.updateThread(id, {
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
      <a href="/admin" style={{margin: 10, fontSize: '2rem'}}>← Back</a>
      <header style={styles.header}>
        <h1>Edit thread</h1>
      </header>
      <div style={styles.formContent}>
          <label htmlFor="threadTitle">Title</label>
          <input onChange={event => setTitle(event.target.value)} value={title} style={styles.titleInput} type="text" id="threadTitle" name="threadTitle" />
          <label htmlFor="threadContent">Content</label>
          <textarea onChange={event => setContent(event.target.value)} value={content} style={styles.contentInput} id="threadContent" name="threadContent" />

          <label htmlFor="threadTopics">Topics</label>
          <div>{topics.map((item) => <span key={item} onClick={(event) => removeTopic(item)} style={styles.topic}>{item}</span>)}</div>

          <TopicSelector type="thread" pass={{ newTopic, setNewTopic: event => setNewTopic(event.target.value), topicsList, addTopic  }} />

          <button onClick={submitUpdateRequest} style={styles.createButton} className="btn btn-lg btn-dark">Create</button>

          <div style={styles.posts}>
            {posts ? posts.slice().reverse().map((post) => <AdminPost key={post._id} post={{ ...post }} />) : <div/>}
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
    contentInput: {
      borderRadius: '7px',
      width: '70%',
      border: '2px black solid',
      whiteSpace: 'pre-wrap',
      overflowWrap: 'break-word'
    },
    topic: {
      margin: '5px',
      padding: '3px',
      borderRadius: '7px',
      backgroundColor: '#eb6864',
      border: '2px black solid',
      cursor: 'pointer'
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
    formContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    createButton: {
      margin: 10
    },
    posts: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
}