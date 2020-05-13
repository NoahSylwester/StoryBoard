import React, { useState, useEffect } from 'react';
import ForumItem from '../components/ForumItem';
import API from '../utils/API';
import styled from 'styled-components';
import Colors from '../themes/colors';

const HoverAnchor = styled.a`
    :hover {
      background-color: ${Colors.color1} !important;
      text-decoration: none !important;
      color: ${Colors.main} !important;
    }
    :active {
      text-decoration: none !important;
      color: white !important;
      background-color: ${Colors.selected} !important;
    }
  `;

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

export default function Forum(props) {

  // set state of forum contents
  const [forum, setForum] = useState([]);

  // set state of search option
  const [searchOption, setSearchOption] = useState('title');
  const [searchInput, setSearchInput] = useState('');

  // fill forum with threads on load
  useEffect(() => {
    async function fetchThreads(){
      API.getThreads()
      .then((threads) => setForum(threads.data))
      .catch(err => {
        err.response.status === 401
        ?
        props.redirect("/auth/login")
        :
        console.log(err)
      });
    }
    fetchThreads();
  }, []);

  const constructPlaceholderText = () => {
    switch (searchOption) {
      case "title":
        return "Search by title";
      case "author":
        return "Search by author";
      case "topics":
        return "Search by topic";
      case "content":
        return "Search by content";
      default:
        return "Search";
    }
  };

  const search = (event) => {
    event.preventDefault();
    async function fetchSearchedThreads() {
      API.searchThreads({ searchInput, searchOption })
      .then((threads) => setForum(threads.data))
      .catch(err => {
        err.response.status === 401
        ?
        props.redirect("/auth/login")
        :
        console.log(err)
      })
    }
    fetchSearchedThreads();
  }

  return (
    <div style={styles.forum}>
      <header style={styles.header}>
        <h1 style={styles.pageTitle} >Forum</h1>
      </header>
      <div style={styles.search}>
        <form onSubmit={search}>
          <SearchInput placeholder={constructPlaceholderText()} type='text' style={styles.searchInput} value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
          <SearchButton style={styles.searchButton} onClick={search} >Search</SearchButton>
        </form>
      </div>
      <div style={styles.searchOptions}>
        {/* <span>Search by: </span> */}
        <span onClick={() => setSearchOption('title')} style={searchOption === 'title' ? styles.searchOptionSelected : styles.searchOptionUnselected}>Title</span>
        <span onClick={() => setSearchOption('author')} style={searchOption === 'author' ? styles.searchOptionSelected : styles.searchOptionUnselected}>Author</span>
        <span onClick={() => setSearchOption('topics')} style={searchOption === 'topics' ? styles.searchOptionSelected : styles.searchOptionUnselected}>Topic</span>
        <span onClick={() => setSearchOption('content')} style={searchOption === 'content' ? styles.searchOptionSelected : styles.searchOptionUnselected}>Content</span>
      </div>
      <HoverAnchor href="/submit/thread" style={styles.newSubmissionButton}>New Thread</HoverAnchor>
      <div style={styles.forumContent} className="container">
        {forum.slice().reverse().map((item, i) => <ForumItem key={i} item={item} />)}
      </div>
    </div>
  );
}

const styles = {
    forum: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    header: {
        width: '100%',
        textAlign: 'center'
    },
    pageTitle: {
      fontFamily: "'Playfair Display', serif",
      marginTop: 30,
      fontSize: '5rem',
    },
    search: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        marginBottom: 0
      },
    searchInput: {
      border: '2px solid ' + Colors.border1,
      borderRight: '1px solid ' + Colors.border1,
      borderTopLeftRadius: '7px',
      borderBottomLeftRadius: '7px',
      margin: 0,
      padding: 5
    },
    searchButton: {
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
    searchOptions: {
      padding: 20
    },
    searchOptionSelected: {
      padding: 5,
      margin: 5,
      background: Colors.selected,
      color: Colors.text2,
      borderRadius: "7px",
      cursor: 'pointer'
    },
    searchOptionUnselected: {
      padding: 5,
      margin: 5,
      color: Colors.greyedText,
      cursor: 'pointer'
    },
    newSubmissionButton: {
      background: Colors.color2,
      padding: '5px',
      borderRadius: '7px',
      marginBottom: 10,
      color: Colors.text1,
      transition: "0.5s",
    },
    forumContent: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    }
}