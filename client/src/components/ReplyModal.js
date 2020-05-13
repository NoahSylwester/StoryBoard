import React, { useState } from 'react';
import API from '../utils/API';

export default function ReplyModal(props) {

    const [content, setContent] = useState('');

    const reply = () => {
        API.saveReply(props.repliedTo._id, {
          content,
        //   author,
          parentEntityType: props.parentEntityType,
          entityId: props.parentEntityId,
        })
        .then(function (response) {
          props.updatePost();
          setContent('');
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    
    return (
        <div className="modal fade" id="replyModal" tabIndex="-1" role="dialog" aria-labelledby="replyModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="replyModalLabel">Reply to</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <i style={styles.repliedToText}>{props.repliedTo.content ? props.repliedTo.content.slice(0, 180) + "..." : ''}</i>
                <div className="modal-body">
                    <textarea value={content} onChange={(event) => setContent(event.target.value)} style={{width: '100%', border: 'none'}} placeholder="Reply text..." />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={reply} >Reply</button>
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