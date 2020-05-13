import React from 'react'
import Post from './Post'
import Colors from '../themes/colors'

export default function CommentsContainer(props) {

    const { parent, setRepliedTo, setRepliedToPostFn } = props.pass

    return (
        <div style={styles.posts}>
            {parent.posts ? parent.posts.slice().reverse().map((post) => <Post replyTo={(postItem) => setRepliedTo(postItem)} setRepliedToPostFn={setRepliedToPostFn} key={post._id} post={{ ...post }} />) : <div />}
        </div>
    )
}

const styles = {
    posts: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    post: {
        backgroundColor: Colors.color1,
        borderRadius: '7px',
        width: '75%',
        padding: 10,
        border: "1px solid " + Colors.border1,
        margin: 10
    },
}