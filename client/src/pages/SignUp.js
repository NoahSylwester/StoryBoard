import React, { useState } from 'react';
import Auth from '../utils/Auth';

function SignUp(props) {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    const validateInput = function() {
        if (email.match(/^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/g) === null) {
            setErrorText('Please enter a valid email.');
            setIsButtonDisabled(false);
            return false;
        }
        else if (username === '') {
            setErrorText('Please enter a username.');
            setIsButtonDisabled(false);
            return false;
        }
        else if (password === '') {
            setErrorText('Please enter a password.');
            setIsButtonDisabled(false);
            return false;
        }
        else if (password.length < 8) {
            setErrorText('Passwords must be at least 8 characters.');
            setIsButtonDisabled(false);
            return false;
        }
        return true;
    }

    const handleSignUp = function() {
        setIsButtonDisabled(true);
        if (validateInput() === true) {
            Auth.SignUp({ email, username, password })
            .then(function (response) {
                props.redirect("/auth/login")
              })
            .catch(function (error) {
                setIsButtonDisabled(false);
                console.log(error.response)
                if (error.response) {
                    console.log(error.response.data.failure)
                    setErrorText(error.response.data.failure)
                }
              });
        }
    }

  return (
    <div style={styles.center}>
        <div className='container' style={styles.center}>
            <div className='row'>
                <div className="col" style={styles.center}>
                    <h1 style={styles.pageTitle} >SignUp</h1>
                    <div style={styles.centerAlign}>
                        <label htmlFor="Email">Email</label>
                        <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" id="email" placeholder="Enter email"></input>
                        <label htmlFor="Username">Username</label>
                        <input value={username} onChange={(event) => setUsername(event.target.value)} type="text" id="username" placeholder="Enter username"></input>
                        <label htmlFor="Password">Password</label>
                        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" id="password" placeholder="Enter password"></input>
                        <button disabled={isButtonDisabled} onClick={handleSignUp} style={styles.signUpButton} className="btn btn-lg btn-dark">SignUp</button>
                        <a href="/auth/login">Return to login</a>
                    </div>
                    <h3 style={styles.errorText}>{errorText}</h3>
                </div>
            </div>
        </div>
    </div>
  );
}

const styles = {
    center: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pageTitle: {
        fontSize: '5rem',
        textAlign: 'center'
    },
    centerAlign: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50,
    },
    signUpButton: {
        margin: 20
    },
    errorText: {
        textAlign: "center",
        color: "red"
    }
}

export default SignUp;