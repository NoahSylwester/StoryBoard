import React from "react";
import Colors from "../themes/colors";
import styled from 'styled-components';

const Link = styled.a`
    color: ${Colors.color1} !important;
    :hover {
        color: ${Colors.text1} !important;
    }
`

export default function Footer() {
  return (
    <footer style={styles.footer} className="page-footer font-small blue pt-4">
        <div className="container-fluid text-center text-md-left">
            <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
                <h5 className="text-uppercase" style={styles.header}>StoryBoard</h5>
                <p style={styles.header}>Join the community and share your stories!</p>
            </div>
            <hr className="clearfix w-100 d-md-none pb-3" />
            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase" style={styles.header}>Other Sites</h5>
                <ul className="list-unstyled">
                <li>
                    <Link href="http://www.scp-wiki.net/">SCP Foundation</Link>
                </li>
                <li>
                    <Link href="https://www.lorepodcast.com/now">Lore Podcast</Link>
                </li>
                <li>
                    <Link href="https://www.reddit.com/r/nosleep/">NoSleep</Link>
                </li>
                </ul>
            </div>
            <div className="col-md-3 mb-md-0 mb-3">
                <h5 className="text-uppercase" style={styles.header}>Contact</h5>
                <ul className="list-unstyled">
                <li>
                    <p style={styles.contact}>noahsylwester@gmail.com</p>
                </li>
                <li>
                    <Link href="https://www.linkedin.com/in/noah-sylwester-8536b6141/">Linkedin</Link>
                </li>
                <li>
                    <Link href="https://github.com/NoahSylwester">GitHub</Link>
                </li>
                <li>
                    <Link href="https://noahsylwester.github.io/Portfolio/">Portfolio</Link>
                </li>
                </ul>
            </div>
            </div>
        </div>
        <div className="footer-copyright text-center py-3">© 2020 Copyright:
            StoryBoard
        </div>
    </footer>
  );
};

const styles = {
    footer: {
        // backgroundColor: Colors.main,
        backgroundImage: `url("${Colors.image}")`,
        backgroundPosition: "0 100%",
        backgroundSize: "cover",
        position: 'relative',
    },
    header: {
        color: Colors.color1
    },
    contact: {
        color: Colors.color1
    }
}