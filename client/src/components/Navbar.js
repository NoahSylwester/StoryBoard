import React, { useState, useEffect } from "react";
import { Link as RouterLink } from 'react-router-dom'
import Auth from '../utils/Auth';
import Colors from '../themes/colors';
import styled from 'styled-components';

// const StyledNav = styled.nav`
//     background-color: ${Colors.background3} !important
//   `

const StyledNav = styled.nav`
  background-image: url(${Colors.image});
  background-size: cover;
`
const Link = styled(RouterLink)`
  color: ${Colors.color2} !important;
  background-color: rgba(0,0,0,0.4);
  padding: 3px;
  border-radius: 5px;
  :hover {
    text-decoration: none;
    background-color: rgba(0,0,0,0.6);
  }
`

const CurrentPage = styled(RouterLink)`
  color: ${Colors.color1} !important;
  background-color: rgba(0,0,0,0.7);
  padding: 3px;
  border-radius: 5px 5px 0px 0px;
  margin-bottom: -12px;
  padding-bottom: 16px;
  :hover {
    text-decoration: none;
  }
`

// useWindowSize hook taken from https://usehooks.com/useWindowSize/
function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }
    
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowSize;
}

export default function Navbar(props) {
    const size = useWindowSize();

    const logout = () => {
      localStorage.setItem('token', '')
      window.location.reload(true)
    }
    const [authStatus, setAuthStatus] = useState(false)
    
    useEffect(() => {
        async function check(){
          Auth.CheckAdminCredentials()
          .then((res) => {
              setAuthStatus(true)
          })
          .catch(err => {
            setAuthStatus(false)
          });
        }
        check();
      }, [])
    
    return (
      <StyledNav className="navbar navbar-expand-sm navbar-dark bg-dark">
        {console.log(size)}
        <RouterLink className="navbar-brand" to="/" style={styles.brand}>
          StoryBoard
        </RouterLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="nav navbar-nav">
                <li className="px-2" style={styles.linkWrapper}>
                  {props.pageType === "archive"
                    ? 
                    <CurrentPage to="/archive" style={size.width < 576 ? {margin: 0, padding: 3, borderRadius: 5} : {}}>Archive</CurrentPage>
                    :
                    <Link to="/archive" style={styles.link}>Archive</Link>
                  }
                </li>
                <li className="px-2" style={styles.linkWrapper}>
                  {props.pageType === "forum"
                    ? 
                    <CurrentPage to="/forum" style={size.width < 576 ? {margin: 0, padding: 3, borderRadius: 5} : {}}>Forum</CurrentPage>
                    :
                    <Link to="/forum" style={styles.link}>Forum</Link>
                  }
                </li>
                <li className="px-2" style={styles.linkWrapper}>
                  {props.pageType === "events"
                    ? 
                    <CurrentPage to="/events_page" style={size.width < 576 ? {margin: 0, padding: 3, borderRadius: 5} : {}}>Events</CurrentPage>
                    :
                    <Link to="/events_page" style={styles.link}>Events</Link>
                  }
                </li>
                {authStatus ?
                  <li className="px-2" style={styles.linkWrapper}><Link to="/admin" style={styles.link}>Admin</Link></li>
                  :
                  <div/>
                }
    
                <li className="px-2" style={styles.linkWrapper}><button className="btn btn-sm btn-light" style={{ backgroundColor: Colors.color2}} onClick={logout}>Logout</button></li>
            </ul>
        </div>
      </StyledNav>
    );
  }

const styles = {
  brand: {
    color: Colors.color1,
    padding: 5,
    borderRadius: 4,
    background: Colors.background1,
    fontFamily: "'Playfair Display', serif",
  },
  link: {
    textDecoration: 'none',
    color: Colors.text2,
    transition: "0.1s"
  },
  linkWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}