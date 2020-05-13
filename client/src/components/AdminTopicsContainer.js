import React, { useState } from 'react';
import API from '../utils/API';
import AdminAPI from '../utils/AdminAPI';
import AdminDeleteConfirmModal from '../components/AdminDeleteConfirmModal';
import Colors from '../themes/colors';
import styled from 'styled-components'

const SearchInput = styled.input`
  :focus {
    outline: none;
    box-shadow: 0 0 5px 1px ${Colors.text1};
  }
`

const SearchButton = styled.button`
  :hover {
    background-color: ${Colors.greyedText} !important;
    color: ${Colors.color2};
  }
  :focus {
    outline: none;
    box-shadow: 0 0 5px 1px ${Colors.text1};
  }
`

export default function AdminContentContainer(props) {

    const [topicId, setTopicId] = useState('')
    const [topics, setTopics] = useState(props.dataStateHook)
    const [newTopicKeyword, setNewTopicKeyword] = useState('')
    const submitNewTopic = (event) => {
        setNewTopicKeyword('');
        event.preventDefault()
        API.saveTopic({ keyword: newTopicKeyword })
        .then(() => {
            API.getTopics()
            .then((response) => setTopics(response.data))
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
    const deleteTopic = (id) => {
        AdminAPI.deleteTopic(id)
        .then(() => {
            API.getTopics()
            .then((response) => setTopics(response.data))
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

    return (
        <div style={{ textAlign: 'center'}}>
            <AdminDeleteConfirmModal delete={() => deleteTopic(topicId)} />
            <form onSubmit={submitNewTopic} style={styles.newTopic}>
                <SearchInput type='text' placeholder="New topic" style={styles.newTopicInput} value={newTopicKeyword} onChange={(event) => setNewTopicKeyword(event.target.value)} />
                <SearchButton style={styles.newTopicButton} >Add New Topic</SearchButton>
            </form>
            {topics ? topics.slice().reverse().map((item, i) => {
                return (<div key={i} style={styles.contentGrid} >
                            <div style={styles.topicContainer}>
                                <div style={styles.topic}>{item.keyword}</div>
                                <div>Date created: {item.date_created}</div>
                            </div>
                            <div style={styles.buttonContainer}>
                                <button onClick={() => setTopicId(item._id)} data-toggle="modal" data-target="#deleteConfirmModal" className="btn btn-lg btn-danger">Delete</button>
                            </div>
                        </div>)
            }) : <div />}
        </div>
    );
}

const styles = {
    contentGrid: {
        display: 'grid',
        gridTemplateColumns: '75% 25%',
        margin: 5
    },
    buttonContainer: {
        borderLeft: "0px",
        borderRadius: "0px 20px 20px 0px",
        borderLeft: "0px",
        margin: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: Colors.color1
    },
    topicContainer: {
        width: "100%",
        // border: "2px solid " + Colors.border1,
        backgroundColor: Colors.color1,
        margin: '5px 0',
        padding: 5,
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
      newTopic: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginBottom: 0
      },
      newTopicInput: {
        border: '2px solid ' + Colors.border1,
        borderRight: '1px solid ' + Colors.border1,
        borderTopLeftRadius: '7px',
        borderBottomLeftRadius: '7px',
        margin: 0,
        padding: 5
      },
      newTopicButton: {
        border: '2px solid ' + Colors.border1,
        borderLeft: '1px solid ' + Colors.border1,
        borderTopRightRadius: '7px',
        borderBottomRightRadius: '7px',
        backgroundColor: Colors.color2,
        margin: 0,
        padding: 5,
        fontWeight: 'bold',
        cursor: 'pointer'
      },
}

