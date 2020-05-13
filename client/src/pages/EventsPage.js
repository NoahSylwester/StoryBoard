import React, { useState, useEffect } from 'react';
import EventItem from '../components/EventItem';
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
  `
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

export default function EventsPage(props) {

  // set state of eventsPage contents
  const [eventsPage, setEventsPage] = useState([]);
  // set state of search option
  const [searchOption, setSearchOption] = useState('title');
  const [searchInput, setSearchInput] = useState('');
  // fill page with events on load
  useEffect(() => {
    async function fetchEvents(){
      API.getEvents()
      .then((events) => setEventsPage(events.data))
      .catch(err => {
        err.response.status === 401
        ?
        props.redirect("/auth/login")
        :
        console.log(err)
      });
    }
    fetchEvents();
  }, [])

  const constructPlaceholderText = () => {
    switch (searchOption) {
      case "title":
        return "Search by title";
      case "topics":
        return "Search by topic";
      case "content":
          return "Search by content";
      case "date":
          return "Search by date";
      default:
        return "Search";
    }
  }

  const search = (event) => {
    event.preventDefault();
    async function fetchSearchedEvents(){
      API.searchEvents({ searchInput, searchOption })
      .then((events) => {console.log(events);setEventsPage(events.data)})
      .catch(err => {
        err.response.status === 401
        ?
        props.redirect("/auth/login")
        :
        console.log(err)
      });
    }
    fetchSearchedEvents();
  }

  return (
    <div style={styles.eventsPage}>
      <header style={styles.header}>
        <h1 style={styles.pageTitle} >Events</h1>
      </header>
      <div style={styles.search}>
        <form onSubmit={search}>
          {searchOption === "date" ? <input type="date" style={styles.searchInputDate} value={searchInput} onChange={(event) => setSearchInput(event.target.value)} /> :
            <SearchInput placeholder={constructPlaceholderText()} type='text' style={styles.searchInput} value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />}
          <SearchButton style={styles.searchButton} onClick={search} >Search</SearchButton>
        </form>
      </div>
      <div style={styles.searchOptions}>
        {/* <span>Search by: </span> */}
        <span onClick={() => setSearchOption('title')} style={searchOption === 'title' ? styles.searchOptionSelected : styles.searchOptionUnselected}>Title</span>
        <span onClick={() => setSearchOption('date')} style={searchOption === 'date' ? styles.searchOptionSelected : styles.searchOptionUnselected}>Date</span>
        <span onClick={() => setSearchOption('topics')} style={searchOption === 'topics' ? styles.searchOptionSelected : styles.searchOptionUnselected}>Topic</span>
        <span onClick={() => setSearchOption('content')} style={searchOption === 'content' ? styles.searchOptionSelected : styles.searchOptionUnselected}>Content</span>
      </div>
      <HoverAnchor href="/submit/event" style={styles.newSuggestionButton}>Suggest an event</HoverAnchor>
      <div style={styles.eventsPageContent} className="container" >
          {eventsPage.slice().reverse().map((item, i) => <EventItem key={i} item={item} />)}
      </div>
    </div>
  );
}

const styles = {
    eventsPage: {
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
    searchInputDate: {
      border: '2px solid ' + Colors.border1,
      borderRight: '1px solid ' + Colors.border1,
      borderTopLeftRadius: '7px',
      borderBottomLeftRadius: '7px',
      margin: 0,
      padding: 4,
      width: 180
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
    newSuggestionButton: {
      background: Colors.color2,
      padding: '5px',
      borderRadius: '7px',
      marginBottom: 10,
      color: Colors.text1,
      transition: "0.5s",
    },
    eventsPageContent: {
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    }
}