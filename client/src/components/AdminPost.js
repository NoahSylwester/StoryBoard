import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import AdminAPI from '../utils/AdminAPI';

export default function AdminPost(props) {

    const [post, setPost] = useState(props.post);
    const [expanded, setExpanded] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

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

    const confirmButtonHandleClick = () => {
        AdminAPI.deletePost(post._id)
        .then((res) => {
            console.log(res);
            setPost(res.data);
            setDeleteConfirm(false);
        })
    }

    return (
        <div key={props._id} style={styles.postContainer}>
            {post.content !== null ?
            <div>
                <div style={styles.postBody}>
                    <div>
                        <h5>Author: {post.author.name}</h5>
                        <p>{post.content}</p>
                    </div>
                    {
                    deleteConfirm ?
                    <button onClick={confirmButtonHandleClick} className="btn btn-sm btn-danger" style={styles.confirmButton}>Confirm</button>
                    :
                    <div/>
                    }
                    {
                    deleteConfirm ?
                    <button onClick={() => setDeleteConfirm(false)} className="btn btn-sm btn-danger" style={styles.cancelButton}>Cancel</button>
                    :
                    <button onClick={() => setDeleteConfirm(true)} className="btn btn-sm btn-danger" style={styles.deleteButton}>Delete</button>
                    }
                    {!expanded ?
                    <button onClick={seeReplies} className="btn btn-sm btn-light" style={styles.seeRepliesButton}>See replies ({post.replies.length})</button>
                    :
                    <button onClick={collapseReplies} className="btn btn-sm btn-light" style={styles.collapseButton}>Collapse ({post.replies.length})</button>
                    }
                </div>
                <div style={styles.repliesContainer}>
                    {expanded ? post.replies.reverse().map((reply) => <AdminPost key={post._id + reply._id} post={{ ...reply }} />) : <div/>}
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
                    {expanded ? post.replies.reverse().map((reply) => <AdminPost key={post._id + reply._id} post={{ ...reply }} />) : <div/>}
                </div>
            </div>
            }
        </div>
    )
}

const styles = {
    postContainer: {
        width: '98%',
      },
    postBody: {
        padding: 10,
        border: "1px solid black",
        margin: 10,
        position: 'relative'
    },
    content: {
        whiteSpace: 'pre-wrap',
        overflowWrap: 'break-word'
    },
    deleteButton: {
        position: 'absolute',
        right: 130,
        bottom: -10,
        border: '1px red solid',
        backgroundColor: 'red'
    },
    confirmButton: {
        position: 'absolute',
        right: 200,
        bottom: -10,
        border: '1px white dashed',
        backgroundColor: 'red'
    },
    cancelButton: {
        position: 'absolute',
        right: 130,
        bottom: -10,
        border: '1px grey solid',
        backgroundColor: 'grey'
    },
    seeRepliesButton: {
        position: 'absolute',
        right: 10,
        bottom: -10,
        border: '1px black solid'
    },
    collapseButton: {
        position: 'absolute',
        right: 15,
        bottom: -10,
        border: '1px black solid'
    },
    repliesContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    }
}