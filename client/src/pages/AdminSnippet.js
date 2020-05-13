import React, { useState, useEffect } from 'react';
import TopicSelector from '../components/TopicSelector';
import API from '../utils/API';
import AdminAPI from '../utils/AdminAPI';
import AdminPost from '../components/AdminPost';

export default function AdminSnippet(props) {

  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [snippetType, setSnippetType] = useState('text');
  const [content, setContent] = useState('');
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState('');
  const [posts, setPosts] = useState('');

  const [topicsList, setTopicsList] = useState([]);

  async function fetchSnippet(){
    API.getSnippet(props.match.params.id)
    .then(fetchedSnippet => {
      setId(fetchedSnippet.data._id)
      setTitle(fetchedSnippet.data.title);
      setSnippetType(fetchedSnippet.data.snippetType);
      setContent(fetchedSnippet.data.content);
      setTopics(fetchedSnippet.data.topics);
      setPosts(fetchedSnippet.data.posts);
    })
    .catch(err => {
      err.response.status === 401
      ?
      props.redirect("/auth/login")
      :
      console.log(err)
    });
  }

  useEffect(() => {
    fetchSnippet();
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
      return
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
    if (snippetType === 'text') {
      AdminAPI.updateSnippet(id, {
        title,
        content,
        topics
      })
      .then(function (response) {
        console.log(response);
        props.redirect("/archive");
      })
      .catch(err => {
        err.response.status === 401
        ?
        props.redirect("/auth/login")
        :
        console.log(err)
      });
    }
    else if (snippetType === 'image') {
      AdminAPI.updateSnippet(id, {
        title,
        topics
      })
      .then(function (response) {
        console.log(response);
        props.redirect("/archive");
      })
      .catch(err => {
        err.response.status === 401
        ?
        props.redirect("/auth/login")
        :
        console.log(err)
      });
    }
  }

  const loadImagePreview = function(event) {
    var output = document.getElementById('preview-image');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
  };

  return (
    <div>
      <a href="/admin" style={{margin: 10, fontSize: '2rem'}}>← Back</a>
      <header style={styles.header}>
        <h1>Edit snippet</h1>
      </header>
      <div style={styles.formContent}>
          <label htmlFor="snippetTitle">Title</label>
          <input style={styles.titleInput} onChange={event => setTitle(event.target.value)} value={title} type="text" id="snippetTitle" name="snippetTitle" />
  
          {
          snippetType === 'text'
          ?
          <div style={styles.contentContainer}>
            <label htmlFor="snippetContent">Content</label>
            <textarea onChange={event => setContent(event.target.value)} value={content} id="snippetContent" name="snippetContent" style={styles.contentInput} />
          </div>
          :
          <div style={styles.contentContainer}>
            <img src={`/api/snippets/image/${id}`} style={styles.content} />
          </div>
          }
          <label htmlFor="snippetTopics">Topics</label>
          <div>{topics.map((item) => <span key={item} onClick={(event) => removeTopic(item)} style={styles.topic}>{item}</span>)}</div>

          <TopicSelector type="snippet" pass={{ newTopic, setNewTopic: event => setNewTopic(event.target.value), topicsList, addTopic  }} />

          <button style={styles.createButton} onClick={submitUpdateRequest} className="btn btn-lg btn-dark">Create</button>

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
    radioGroup: {
      marginTop: 10
    },
    radio: {
      margin: "0 10px"
    },
    contentInput: {
      borderRadius: '7px',
      width: '70%',
      border: '2px black solid',
      whiteSpace: 'pre-wrap',
      overflowWrap: 'break-word'
    },
    content: {
      padding: 20,
      width: '80%'
    },
    previewImage: {
      margin: 10,
      width: '70%',
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
    contentContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    snippetTypeSelected: {
      padding: 5,
      margin: 5,
      background: 'blue',
      color: 'white',
      borderRadius: "7px",
      cursor: 'pointer'
    },
    snippetTypeUnselected: {
      padding: 5,
      margin: 5,
      color: 'grey',
      cursor: 'pointer'
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