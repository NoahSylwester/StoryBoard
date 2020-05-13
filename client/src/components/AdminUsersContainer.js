import React, { useState, useEffect } from 'react';
import AdminAPI from '../utils/AdminAPI';
import API from '../utils/API';
import AdminDeleteConfirmModal from './AdminDeleteConfirmModal';
import Colors from '../themes/colors';

export default function AdminUsersContainer(props) {

    const [userId, setUserId] = useState('')
    const [users, setUsers] = useState(props.dataStateHook)
    const [searchInput, setSearchInput] = useState(props.searchInput)
    const [searchOption, setSearchOption] = useState(props.searchOption)

    useEffect(() => {
        setUsers(props.dataStateHook)
    }, [props.dataStateHook])

    useEffect(() => {
        setSearchInput(props.searchInput)
        setSearchOption(props.searchOption)
    }, [props.searchInput, props.searchOption])

    const sendAuthorizationRequest = (id, authority) => {
        let newAuthority;
        if (authority === "Unauthorized") {
            newAuthority = "Authorized";
        }
        else if (authority === "Authorized") {
            newAuthority = "Unauthorized";
        }
        else {
            newAuthority = authority;
        }
        AdminAPI.updateUser(id, {authority: newAuthority})
        .then(() => {
            let APICall;
            let searchArguments = {}
            if (searchOption === "authority") {
                APICall = API.searchUsers;
                searchArguments = {
                    searchOption,
                    searchInput
                }
            }
            else {
                APICall = API.getUsers;
            }
            APICall(searchArguments)
            .then((response) => {
                setUsers(response.data)
            })
            .catch(err => {
                console.log(err)
                err.response.status === 401
                ?
                props.redirect("/auth/login")
                :
                console.log(err)
              });
        })
        .catch(err => {
            console.log(err)
            err.response.status === 401
            ?
            props.redirect("/auth/login")
            :
            console.log(err)
          });
    }

    const sendDeleteUserRequest = (id) => {
        AdminAPI.deleteUser(id)
        .then(() => {
            API.getUsers()
            .then((res) => {
                console.log(res)
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
                err.response.status === 401
                ?
                props.redirect("/auth/login")
                :
                console.log(err)
              });
        })
        .catch(err => {
            console.log(err)
            err.response.status === 401
            ?
            props.redirect("/auth/login")
            :
            console.log(err)
          });
    }

    return (
        <div>
            <AdminDeleteConfirmModal delete={() => sendDeleteUserRequest(userId)} />
            {users ? users.map((item, i) => {
                return (<div key={i} style={styles.contentGrid} >
                            <div style={styles.userContainer}>
                                <h4>{item.name}</h4>
                                <div>{item.email}</div>
                                <div>Posts: {item.posts.length}</div>
                                <div>Threads: {item.threads.length}</div>
                                <div>Snippets: {item.snippets.length}</div>
                            </div>
                            <div style={styles.buttonContainer}>
                                <button style={styles.authorizeButton} onClick={() => sendAuthorizationRequest(item._id, item.authority)} className={`btn btn-lg btn-${item.authority === "Unauthorized" ? "info": "success"}`}>{item.authority}</button>
                                <button onClick={() => setUserId(item._id)} data-toggle="modal" data-target="#deleteConfirmModal" className="btn btn-lg btn-danger">Delete</button>
                            </div>
                        </div>)
            }) : <div />}
        </div>
    );
}

const styles = {
    contentGrid: {
        display: 'grid',
        gridTemplateColumns: '75% 25%',
        margin: 5
    },
    buttonContainer: {
        borderLeft: "0px",
        borderRadius: "0px 20px 20px 0px",
        borderLeft: "0px",
        margin: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: Colors.color1,
    },
    userContainer: {
        width: "100%",
        backgroundColor: Colors.color1,
        margin: '5px 0',
        padding: 5,
      },
}
