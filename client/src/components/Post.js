import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import Colors from '../themes/colors';

export default function Post(props) {

    const [post, setPost] = useState(props.post);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        API.getPost(post._id)
        .then((response) => {
            setPost(response.data);
        })
    }, [])

    const seeReplies = () => {
        API.getPost(post._id)
        .then((response) => {
            setPost(response.data);
            setExpanded(true)
        })
    }

    const collapseReplies = () => {
        setExpanded(false)
    }

    const replyButtonHandleClick = () => {
        props.replyTo(post);
        props.setRepliedToPostFn(() => seeReplies);
    }

    return (
        <div key={props._id} style={styles.postContainer}>
            {post.content !== null ?
            <div>
                <div style={styles.postBody}>
                    <h5>{post.author.name}</h5>
                    <hr />
                    <p style={styles.content}>{post.content}</p>
                    <button onClick={replyButtonHandleClick} className="btn btn-sm btn-dark" style={styles.replyButton} data-toggle="modal" data-target="#replyModal">Reply</button>
                    {!expanded ?
                    <button onClick={seeReplies} className="btn btn-sm btn-light" style={styles.seeRepliesButton}>See replies ({post.replies.length})</button>
                    :
                    <button onClick={collapseReplies} className="btn btn-sm btn-light" style={styles.collapseButton}>Collapse ({post.replies.length})</button>
                    }
                </div>
                <div style={styles.repliesContainer}>
                    {expanded ? post.replies.reverse().map((reply) => <Post replyTo={(replyItem) => props.replyTo(replyItem)} setRepliedToPostFn={props.setRepliedToPostFn} key={props._id + reply._id} post={{ ...reply }} />) : <div/>}
                </div>
            </div>
            :
            <div>
                <div style={styles.postBody}>
                    <p style={{margin: 0}}>[this post was deleted by an administrator]</p>
                    { !expanded ?
                    <button onClick={seeReplies} className="btn btn-sm btn-light" style={styles.seeRepliesButton}>See replies ({post.replies.length})</button>
                    :
                    <button onClick={collapseReplies} className="btn btn-sm btn-light" style={styles.collapseButton}>Collapse ({post.replies.length})</button>
                    }
                </div>
                <div style={styles.repliesContainer}>
                    {expanded ? post.replies.reverse().map((reply) => <Post replyTo={(replyItem) => props.replyTo(replyItem)} setRepliedToPostFn={props.setRepliedToPostFn} key={post._id + reply._id} post={{ ...reply }} />) : <div/>}
                </div>
            </div>
            }
        </div>
    )
}

const styles = {
    postContainer: {
        width: '98%',
        marginBottom: 20,
      },
    postBody: {
        backgroundColor: Colors.color1,
        borderRadius: '7px',
        padding: 10,
        // border: "1px solid " + Colors.color1,
        margin: 10,
        position: 'relative'
      },
    content: {
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word'
    },
    replyButton: {
        position: 'absolute',
        right: 130,
        bottom: -10,
        border: '1px solid ' + Colors.border1
    },
    seeRepliesButton: {
        position: 'absolute',
        right: 10,
        bottom: -10,
        border: '1px solid ' + Colors.border1
    },
    collapseButton: {
        position: 'absolute',
        right: 15,
        bottom: -10,
        border: '1px solid ' + Colors.border1
    },
    repliesContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    }
}