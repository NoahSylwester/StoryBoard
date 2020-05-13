import React, { useState } from 'react';
import Auth from '../utils/Auth';
import simpleCrypto from 'simple-crypto-js';

function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    const handleLogin = function() {
        setIsButtonDisabled(true)
        setErrorText('');
        setPassword('');
        Auth.Login({ email, password })
        .then(function (response) {
            localStorage.setItem('token', response.data.token)
            props.redirect("/")
          })
        .catch(function (error) {
            console.log(error);
            if (error.response) {
                if (error.response.data.error) {
                    setErrorText(error.response.data.error)
                    setIsButtonDisabled(false)
                }
            }
          });
    }

  return (
    <div style={styles.center}>
        <div className='container' style={styles.center}>
            <div className='row'>
                <div className="col" style={styles.center}>
                    <h1 style={styles.pageTitle} >Login</h1>
                    <div style={styles.centerAlign}>
                        <label htmlFor="email">Email</label>
                        <input value={email} onChange={(event) => setEmail(event.target.value)} type="text" id="email" placeholder="Enter email"></input>
                        <label htmlFor="password">Password</label>
                        <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" id="password" placeholder="Enter password"></input>
                        <button disabled={isButtonDisabled} onClick={handleLogin} style={styles.loginButton} className="btn btn-lg btn-dark">Login</button>
                        <a href="/auth/signup">Don't have an account? Sign up</a>
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
        padding: 50
    },
    loginButton: {
        margin: 20
    },
    errorText: {
        textAlign: "center",
        color: "red"
    }
}

export default Login;