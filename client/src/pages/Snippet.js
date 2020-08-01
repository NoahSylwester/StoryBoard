import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import CommentsContainer from '../components/CommentsContainer';
import CommentModal from '../components/CommentModal';
import ReplyModal from '../components/ReplyModal';
import Colors from '../themes/colors';
import SVGLoadingIcon from '../components/SVGLoadingIcon'
import styled, { keyframes } from 'styled-components'

const fadeIn = keyframes`
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
`;

const FadeInWrapper = styled.div`
    animation: ${fadeIn} 0.8s ease-out;
`

export default function Snippet(props) {
  
  // set state of forum contents
  const [snippet, setSnippet] = useState(undefined);

  // fill forum with snippets on load
  async function fetchSnippet(){
    API.getSnippet(props.match.params.id)
    .then(fetchedSnippet => setSnippet(fetchedSnippet.data))
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

  const parseDate = (dateInput) => {
    const date = new Date(dateInput);
    return date.toUTCString();
  }

  // comment architecture
  const [repliedTo, setRepliedTo] = useState({});
  const [repliedToPostFn, setRepliedToPostFn] = useState(() => () => undefined)

  return (
    snippet ?
    <FadeInWrapper>
      <div style={styles.page}>
          <CommentModal update={() => fetchSnippet()} parentEntityType={"snippet"} parentEntityId={snippet._id} />
          <ReplyModal repliedTo={repliedTo} updatePost={repliedToPostFn} parentEntityType={"snippet"} parentEntityId={snippet._id} />
          <header style={styles.header}>
              <h1>{snippet.title}</h1>
              <h5>{snippet.author.name}</h5>
              <i>{parseDate(snippet.date_created)}</i>
              <div>{snippet.topics ? snippet.topics.map((item) => <span key={item} style={styles.topic}>{item}</span>) : <div/>}</div>
          </header>
          <div style={styles.body}>
            {snippet.snippetType === 'text' ?
              <p style={styles.content}>{snippet.content}</p>
            :
              <div style={{ width: '100%', textAlign: 'center' }}>
                <img src={`/api/snippets/image/${snippet._id}`} style={styles.imageContent} />
              </div>
            }
          </div>
          {/* comments area */}
          <h2>Comments</h2>
          <button className="btn btn-md btn-dark" data-toggle="modal" data-target="#commentModal">Comment</button>
          
          <CommentsContainer pass={{ parent: snippet, setRepliedTo, setRepliedToPostFn }} />
      </div>
    </FadeInWrapper>
    :
    <SVGLoadingIcon />
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
      backgroundColor: Colors.color2,
      width: '80%',
      padding: 20,
      textAlign: 'center',
      borderRadius: '7px 7px 0 0',
      margin: 10,
      marginBottom: 0
    },
    topic: {
      margin: '5px',
      padding: '3px',
      borderRadius: '7px',
      backgroundColor: Colors.color2,
      border: '2px solid ' + Colors.border1,
      cursor: 'default',
      color: Colors.text1,
      display: 'inline-block'
  },
    body: {
      backgroundColor: Colors.color2,
      borderRadius: '0 0 7px 7px',
      width: '80%',
      borderTop: "1px solid lightgrey",
      margin: 10,
      marginTop: 0,
      wordWrap: "break-word",
    },
    content: {
      padding: 20,
      width: '100%',
      whiteSpace: 'pre-wrap',
      overflowWrap: 'break-word'
    },
    imageContent: {
      padding: 20,
      width: '80%',
    }
}