import React, { useState } from 'react';
import API from '../utils/API';

export default function CommentModal(props) {

    const [content, setContent] = useState('');

    const post = () => {
        API.savePost({
          content,
        //   author,
          parentEntityType: props.parentEntityType,
          entityId: props.parentEntityId,
        })
        .then(function (response) {
          console.log(response);
          props.update();
          setContent('');
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    
    return (
        <div className="modal fade" id="commentModal" tabIndex="-1" role="dialog" aria-labelledby="commentModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="commentModalLabel">Post</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <textarea value={content} onChange={(event) => setContent(event.target.value)} style={{width: '100%', border: 'none'}} placeholder="Post text..." />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={post} >Post to thread</button>
                </div>
                </div>
            </div>
        </div>
    )
}