import React, { useState, useEffect } from 'react';
import TopicSelector from '../components/TopicSelector'
import API from '../utils/API';
import Colors from '../themes/colors';

export default function NewSnippetForm(props) {

  const [title, setTitle] = useState('');
  const [snippetType, setSnippetType] = useState('text');
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

  const submitCreationRequest = () => {
    if (snippetType === 'text') {
      API.saveSnippet({
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
      API.saveSnippet({
        title,
        snippetType,
        topics
      })
      .then(function (response) {
        const imageFile = document.getElementById('snippetImage').files[0];
        let data = new FormData();  
        data.append('file', imageFile)
        const config = {
          headers: {
          'Accept': 'application/json',
          // 'Content-Type': 'multipart/form-data',
          }
        };
        console.log(imageFile)
        API.updateSnippetImage(response.data._id, data, config)
        .then(function(response) {
          console.log(response);
          window.location.replace("/archive");
        })
        .catch(err => {
          err.response.status === 401
          ?
          props.redirect("/auth/login")
          :
          console.log(err)
        });
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
      <header style={styles.header}>
        <h1>Submit a new snippet</h1>
      </header>
      <div style={styles.formContent}>
          <label htmlFor="snippetTitle">Title</label>
          <input style={styles.titleInput} onChange={event => setTitle(event.target.value)} value={title} type="text" id="snippetTitle" name="snippetTitle" />
  
          <label htmlFor="content-types">Choose a content type:</label>
          <div id="content-types" style={styles.snippetTypes}>
            <span onClick={() => setSnippetType('text')} style={snippetType === 'text' ? styles.snippetTypeSelected : styles.snippetTypeUnselected}>Text</span>
            <span onClick={() => setSnippetType('image')} style={snippetType === 'image' ? styles.snippetTypeSelected : styles.snippetTypeUnselected}>Image</span>
          </div>
          {
          snippetType === 'text'
          ?
          <div style={styles.contentContainer}>
            <label htmlFor="snippetContent">Content</label>
            <textarea onChange={event => setContent(event.target.value)} value={content} id="snippetContent" name="snippetContent" style={styles.contentInput} />
          </div>
          :
          <div style={styles.contentContainer}>
            <label htmlFor="snippetImage">Upload image</label>
            <input onChange={loadImagePreview} type="file" accept="image/*" id="snippetImage" name="snippetImage" style={styles.contentInput} />
            <img id="preview-image" style={styles.previewImage} />
          </div>
          }
          <label htmlFor="snippetTopics">Topics</label>
          <div>{topics.map((item) => <span key={item} onClick={(event) => removeTopic(item)} style={styles.topic}>{item}</span>)}</div>

          <TopicSelector type="snippet" pass={{ newTopic, setNewTopic: event => setNewTopic(event.target.value), topicsList, addTopic  }} />

          <button style={styles.createButton} onClick={submitCreationRequest} className="btn btn-lg btn-dark">Create</button>
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
    radioGroup: {
      marginTop: 10
    },
    radio: {
      margin: "0 10px"
    },
    contentInput: {
      borderRadius: '7px',
      width: '70%',
      border: '2px solid ' + Colors.border1,
    },
    previewImage: {
      margin: 10,
      width: '50%',
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
      background: Colors.color1,
      color: Colors.text2,
      borderRadius: "7px",
      cursor: 'pointer'
    },
    snippetTypeUnselected: {
      padding: 5,
      margin: 5,
      color: Colors.greyedText,
      cursor: 'pointer'
    },
    createButton: {
      margin: 10
    }
}