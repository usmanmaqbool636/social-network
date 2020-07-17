import React from 'react';
const Modal = ({ deleteHandler,text,modelId }) => {
    return (
        <div className="modal fade" id={modelId} tabIndex="-1" role="dialog" aria-labelledby="mymodal" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Delete {text}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        Are your sure you want to delete {text}?
                     </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={deleteHandler}>Delete</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;