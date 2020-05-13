import React, { useState, useEffect } from 'react';
import API from '../utils/API';
import AdminAPI from '../utils/AdminAPI';
import EventItem from '../components/EventItem';
import ForumItem from '../components/ForumItem';
import ArchiveItem from '../components/ArchiveItem';
import AdminContentContainer from '../components/AdminContentContainer';
import AdminTopicsContainer from '../components/AdminTopicsContainer';
import AdminUsersContainer from '../components/AdminUsersContainer';
import Colors from '../themes/colors';
import styled from 'styled-components';

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

export default function Admin(props) {

  // instantiate hooks to store fetched data
  const [eventsData, setEventsData] = useState([]);
  const [forumData, setForumData] = useState([]);
  const [archiveData, setArchiveData] = useState([]);
  const [topicsData, setTopicsData] = useState([]);
  const [usersData, setUsersData] = useState([]);

  // set state of search option
  const [searchOption, setSearchOption] = useState('title');
  const [searchInput, setSearchInput] = useState('');

  // stores what data is displayed
  const [display, setDisplay] = useState('');

  // decides on placeholder text for search box
  const constructPlaceholderText = () => {
    switch (searchOption) {
      case "title":
        return "Search by title";
      case "author":
        return "Search by author";
      case "date":
        return "Search by date"
      case "topics":
        return "Search by topic";
      case "content":
          return "Search by content";
      case "name":
          return "Search by name";
      case "email":
          return "Search by email";
      case "authority":
          return "Search by authority";
      default:
        return "Search";
    }
  }

  // sends search request for snippets/threads/events
  const search = (event) => {
    event.preventDefault();
    async function fetchSearchedData() {
      let APItype;
      if (display === 'events') {
        APItype = AdminAPI;
      }
      else {
        APItype = API;
      }
      APItype[`search${display[0].toUpperCase() + display.slice(1)}`]({ searchInput, searchOption })
      .then((response) => {
        if (display === "snippets"){
          setArchiveData(response.data)
        }
        else if (display === "threads"){
          setForumData(response.data)
        }
        else if (display === "events"){
          setEventsData(response.data)
        }
        else if (display === "users"){
          setUsersData(response.data)
        }
      })
      .catch(err => {
        err.response.status === 401
        ?
        props.redirect("/auth/login")
        :
        console.log(err)
      })
    }
    fetchSearchedData();
  }
  
  // fill page with data on load
  useEffect(() => {
    async function fetchData(APICall, setStateHook){
      APICall()
      .then((response) => setStateHook(response.data))
      .catch(err => {
        err.response.status === 401
        ?
        props.redirect("/auth/login")
        :
        console.log(err)
      });
    }
    fetchData(AdminAPI.getEvents, setEventsData);
    fetchData(API.getThreads, setForumData);
    fetchData(API.getSnippets, setArchiveData);
    fetchData(API.getTopics, setTopicsData);
    fetchData(API.getUsers, setUsersData);
  }, [])

  // display content according to what display variable value is
  const renderContent = () => {
    if (display === "snippets") {
      return (
        <div style={styles.contentContainer}>
          <AdminContentContainer key={'contentContainer1'} redirect={(path) => props.redirect(path)} component={ArchiveItem} dataStateHook={archiveData} type={'snippet'} />
        </div>
      )
    }
    else if (display === "threads") {
      return (
        <div style={styles.contentContainer}>
          <AdminContentContainer key={'contentContainer2'} redirect={(path) => props.redirect(path)} component={ForumItem} dataStateHook={forumData} type={'thread'} />
        </div>
      )
    }
    else if (display === "events") {
      return (
        <div style={styles.contentContainer}>
          <AdminContentContainer key={'contentContainer3'} redirect={(path) => props.redirect(path)} component={EventItem} dataStateHook={eventsData} type={'event'} />
        </div>
      )
    }
    else if (display === "topics") {
      return (
        <div style={styles.contentContainer}>
          <AdminTopicsContainer key={'contentContainer4'} redirect={(path) => props.redirect(path)} dataStateHook={topicsData} type={'topic'} />
        </div>
      )
    }
    else if (display === "users") {
      return (
        <div style={styles.contentContainer}>
          <AdminUsersContainer key={'contentContainer5'} redirect={(path) => props.redirect(path)} searchOption={searchOption} searchInput={searchInput} dataStateHook={usersData} type={'user'} />
        </div>
      )
    }
    else {
      // if nothing is selected
      return (
        <h1 style={{textAlign:'center'}}>
          Welcome to the admin page!
          <br/>
          Please select one of the above options.
        </h1>
      )
    }
  }

  return (
    <div>
      <a href="/" style={{margin: 10}}>← Back</a>
      <div style={styles.flexCenter} >
          <h1 style={styles.title}>Lore Content Management System</h1>
          <div style={styles.displayOptions}>
            <h5 onClick={() => {setDisplay('snippets');setSearchOption('title')}} style={display === 'snippets' ? styles.displayOptionSelected : styles.displayOptionUnselected} >Snippets</h5>
            <h5 onClick={() => {setDisplay('threads');setSearchOption('title')}} style={display === 'threads' ? styles.displayOptionSelected : styles.displayOptionUnselected} >Threads</h5>
            <h5 onClick={() => {setDisplay('events');setSearchOption('title')}} style={display === 'events' ? styles.displayOptionSelected : styles.displayOptionUnselected} >Events</h5>
            <h5 onClick={() => {setDisplay('topics');setSearchOption('title')}} style={display === 'topics' ? styles.displayOptionSelected : styles.displayOptionUnselected} >Topics</h5>
            <h5 onClick={() => {setDisplay('users');setSearchOption('name')}} style={display === 'users' ? styles.displayOptionSelected : styles.displayOptionUnselected} >Users</h5>
          </div>

          {/* is search displayed? */}
          {
          display && display !== "topics"
          ? 
          <div style={styles.search}>
            <form onSubmit={search}>
              {
              searchOption === 'date' ?
              <SearchInput type="date" style={styles.searchInputDate} value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
              :<SearchInput placeholder={constructPlaceholderText()} type='text' style={styles.searchInput} value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
              }
              <SearchButton style={styles.searchButton} onClick={search} >Search</SearchButton>
            </form>
          </div>
          :
          <div/>
          }
          
          {/* search options, displayed when search is */}
          {
          display && display !== "topics" && display !== "users"
          ? 
          <div style={styles.searchOptions}>
            <span onClick={() => setSearchOption('title')} style={searchOption === 'title' ? styles.searchOptionSelected : styles.searchOptionUnselected}>Title</span>
            {
            display === "events"
            ?
            <span onClick={() => setSearchOption('date')} style={searchOption === 'date' ? styles.searchOptionSelected : styles.searchOptionUnselected}>Date</span>
            :
            <span onClick={() => setSearchOption('author')} style={searchOption === 'author' ? styles.searchOptionSelected : styles.searchOptionUnselected}>Author</span>
            }
            <span onClick={() => setSearchOption('topics')} style={searchOption === 'topics' ? styles.searchOptionSelected : styles.searchOptionUnselected}>Topic</span>
            <span onClick={() => setSearchOption('content')} style={searchOption === 'content' ? styles.searchOptionSelected : styles.searchOptionUnselected}>Content</span>
          </div>
        :
        display === "users" ?
        <div style={styles.searchOptions}>
          <span onClick={() => setSearchOption('name')} style={searchOption === 'name' ? styles.searchOptionSelected : styles.searchOptionUnselected}>Name</span>
          <span onClick={() => setSearchOption('email')} style={searchOption === 'email' ? styles.searchOptionSelected : styles.searchOptionUnselected}>Email</span>
          <span onClick={() => setSearchOption('authority')} style={searchOption === 'authority' ? styles.searchOptionSelected : styles.searchOptionUnselected}>Authority</span>
        </div>
        :
        <div/>
        }
          
          {/* generate relevant page content */}
          {renderContent()}
      </div>
    </div>
  );
}

const styles = {
    flexCenter: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    },
    title: {
      textAlign: 'center',
      fontFamily: "'Playfair Display', serif",
      color: Colors.title,
      // border: "2px solid " + Colors.border1,
      borderRadius: 15,
      // background: Colors.color1,
      margin: 5,
      padding: 10,
    },
    contentContainer: {
      width: '90%'
    },
    displayOptionSelected: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '20%',
      padding: 10,
      margin: 10,
      cursor: 'pointer',
      borderRadius: '10px',
      background: Colors.color1
    },
    displayOptionUnselected: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '20%',
      padding: 10,
      margin: 10,
      cursor: 'pointer'
    },
    displayOptions: {
      width: '70%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center'
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
      background: Colors.color1,
      color: Colors.text1,
      borderRadius: "7px",
      cursor: 'pointer'
    },
    searchOptionUnselected: {
      padding: 5,
      margin: 5,
      color: Colors.greyedText,
      cursor: 'pointer'
    },
}
