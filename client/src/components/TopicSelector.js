import React from 'react'
import Colors from '../themes/colors'

export default function TopicSelector(props) {
    const { newTopic, setNewTopic, topicsList, addTopic } = props.pass

    return (
        <div style={{ textAlign: 'center' }}>
            <label htmlFor={`${props.type}NewTopic`}>Add New Topic</label>
            <form style={styles.topicForm}>
                <select style={styles.newTopicInput} onChange={setNewTopic} value={newTopic} id={`${props.type}NewTopic`} name={`${props.type}NewTopic`}>
                <option disabled value={''}>Select a topic</option>
                {topicsList ? topicsList.map((item) => <option key={item.keyword + 'option'} value={item.keyword}>{item.keyword}</option>) : <div/>}
                </select>
                <button style={styles.newTopicButton} onClick={addTopic} >Add topic</button>
            </form>
        </div>
    )
}

const styles = {
    topicForm: {
        background: Colors.border1,
        borderRadius: '7px',
        display: 'flex',
        alignItems: 'center'
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
}