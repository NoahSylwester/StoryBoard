import React, { useState } from 'react';
import API from '../utils/API';

export default function AdminDeleteConfirmModal(props) {
    
    return (
        <div className="modal fade" id="deleteConfirmModal" tabIndex="-1" role="dialog" aria-labelledby="deleteConfirmModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="deleteConfirmModalLabel">Confirm delete</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <h4>Are you sure you want to delete this item? This action cannot be undone, and may affect additional items like associated posts and documents.</h4>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={props.delete} >Yes, delete</button>
                </div>
                </div>
            </div>
        </div>
    )
}

const styles = {
    repliedToText: {
        padding: 10,
        borderBottom: '1px solid #eeeeee'
    }
}