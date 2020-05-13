import React from 'react';
import styled from 'styled-components';
import Colors from "../themes/colors";

const HoverAnchor = styled.a`
    :hover {
      width: 100% !important;
      padding: 10px 0px !important;
      margin: 0px !important;
      background-color: ${Colors.color1} !important;
      text-decoration: none !important;
      border: white 2px solid !important;
    }
    :active {
      background-color: white !important;
      text-decoration: none !important;
      border: black 2px solid !important;
      color: black;
    }
  `

export default function ForumItem(props) {

    const parseDate = (dateInput) => {
      const date = new Date(dateInput);
      return date.toUTCString();
    }

    return (
      !props.splash ?
      <div style={styles.wrapper}>
        <HoverAnchor style={styles.forumItem} className="row" href={`/thread/${props.item._id}`}>
            <span className="col-6">
              <h2>{props.item.title}</h2>
              <div><strong>Comments: {props.item.posts.length}</strong></div>
              <i>{parseDate(props.item.date_created)}</i>
              <p style={styles.noMarginBottom}>
                Author: {props.item.author ? props.item.author.name : ''}
              </p>
              <p style={{...styles.noMarginBottom, margin: 10}}>
                {props.item.content.slice(0,30) + "..."}
              </p>
            </span>
            <div className="col-6">
              {props.item.topics ? props.item.topics.map((item) => <div key={item} style={styles.topic}>{item}</div>) : <div/>}
            </div>
        </HoverAnchor>
      </div>
        :
        <div style={styles.wrapper}>
          <HoverAnchor style={styles.forumItem} className="row" href={`/thread/${props.item._id}`}>
            <div className="col container">
              <div className="row">
                <div className='col'>
                  <h2>{props.item.title}</h2>
                  <div><strong>Comments: {props.item.posts.length}</strong></div>
                  <div><i>{parseDate(props.item.date_created)}</i></div>
                  <p style={styles.noMarginBottom}>
                    Author: {props.item.author ? props.item.author.name : ''}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className='col'>
                  <p style={{...styles.noMarginBottom, margin: 10}}>
                    {props.item.content.slice(0,30) + "..."}
                  </p>
                </div>
              </div>
              <div className="row">
                <div className='col'>
                  {props.item.topics ? props.item.topics.map((item) => <div key={item} style={styles.topic}>{item}</div>) : <div/>}
                </div>
              </div>
            </div>
          </HoverAnchor>
        </div>
    );
}

const styles = { 
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%'
    },
    forumItem: {
      width: "99%",
      background: Colors.color2,
      border: "2px solid " + Colors.color2,
      margin: '5px 0',
      padding: 5,
      color: Colors.text2,
      transition: "0.3s"
    },
    noMarginBottom: {
      marginBottom: 0
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
  }
