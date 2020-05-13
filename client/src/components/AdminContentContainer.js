import React, { useState, useEffect } from 'react';
import AdminAPI from '../utils/AdminAPI';
import API from '../utils/API';
import AdminDeleteConfirmModal from '../components/AdminDeleteConfirmModal';
import Colors from '../themes/colors';


export default function AdminContentContainer(props) {

    // initialize hook for data fed into container
    const [dataState, setDataState] = useState(props.dataStateHook);
    // hook for feeding id into delete confirm modal
    const [id, setId] = useState('')

    // update dataState hook when props update
    useEffect(() => setDataState(props.dataStateHook), [props.dataStateHook])

    // update container function
    const fetchUpdatedData = () => {
        API[`get${props.type[0].toUpperCase() + props.type.slice(1)}s`]()
        .then((res) => setDataState(res.data))
    }

    // delete item function
    const handleDeleteClick = (id) => {
        AdminAPI[`delete${props.type[0].toUpperCase() + props.type.slice(1)}`](id)
        .then((res) => {
            fetchUpdatedData();
        })
        .catch(err => {
            err.response.status === 401
            ?
            props.redirect("/auth/login")
            :
            console.log(err)
        });
    }

    return (
        <div>
            <AdminDeleteConfirmModal delete={() => handleDeleteClick(id)} />
            {dataState ? dataState.map((item, i) => {
                return (<div key={i} style={styles.contentGrid} >
                            <props.component item={item} />
                            <div style={styles.buttonContainer}>
                                <button onClick={() => props.redirect(`/admin/${props.type}/${item._id}`)} className="btn btn-lg btn-primary">Edit</button>
                                <button onClick={() => setId(item._id)} data-toggle="modal" data-target="#deleteConfirmModal" className="btn btn-lg btn-danger">Delete</button>
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
        borderRadius: "0px 20px 20px 0px",
        margin: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: Colors.color1
    }
}

