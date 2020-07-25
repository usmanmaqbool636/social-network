import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from "moment";
import _ from 'lodash';
import { getRandomColor } from '../../helper';

import { comment, unComment } from "../../../store/actions/post";
const Comment = ({ isAuthenticated, comments, user, postId, comment, unComment }) => {
    const [text, setText] = useState("")
    const changeHandler = (evt) => {
        setText(evt.target.value)
    }
    const submitHandler = (evt) => {
        evt.preventDefault();
        if (text.length && isAuthenticated) {
            comment(postId, { text }, localStorage.jwt, (err) => {
                if (!err) {
                    setText("")
                }
            })
        }
        else {
            console.log(!text, isAuthenticated)

        }
    }

    const imgError = async (evt) => {
        // evt.target.src = "https://source.unsplash.com/random";
        evt.target.style.backgroundColor = getRandomColor()
        evt.target.style.overflow = "hidden"
    }
    const deleteComment = (commentId) => {
        // evt.preventDefault()
        console.log(commentId);
        unComment(postId, commentId, localStorage.jwt, (err) => {
            if (err) {
                console.log("comment not deleted");
            }
        })

    }

    if (!comment) {
        return <div>Loading</div>
    }
    else {
        const newComments = _.sortBy(comments, [function (o) { return o.createdAt; }]).reverse();
        return (
            <div className="col-12 p-0">
                <h2 className="my-5">
                    Leave a comment
                </h2>
                <form onSubmit={submitHandler} >
                    <div className="form-group">
                        <input
                            placeholder="Write comment"
                            className="form-control"
                            type="text"
                            name="text"
                            value={text}
                            onChange={changeHandler}
                        />
                    </div>
                    <button type="submit" className="btn btn-raised btn-success ">post</button>
                </form>
                <hr />
                <div className="col-12">
                    <h2> ({comments.length}) Comments </h2>
                    {newComments.map(comment => (
                        <div key={`tabfollower${comment._id}`}>
                            <div className="row mt-2 p-2">
                                <div className="col-12">

                                    <div className="d-flex justify-content-between">
                                        <div class="media">
                                            <Link to={`/user/${comment.commentedBy._id}`} title={comment.commentedBy.name}>
                                                <img
                                                    src={`/api/user/photo/${comment.commentedBy._id}?${new Date().getTime()}`} class="mr-3" onError={imgError} />

                                            </Link>

                                            <div class="media-body">
                                                <h5 style={{ lineHeight: ".5" }} class="mt-0"><Link to={`/user/${comment.commentedBy._id}`} title={comment.commentedBy.name}>{comment.commentedBy.name}</Link>  <span className="ml-2" >{moment(comment.createdAt).calendar()}</span> </h5>
                                                <p>
                                                    {comment.text}
                                                </p>
                                            </div>
                                        </div>
                                        {
                                            isAuthenticated
                                            &&
                                            comment.commentedBy._id === user._id
                                            &&
                                            <button type="button" onClick={() => deleteComment(comment._id)} className="btn  btn-danger">delete</button>
                                        }

                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}


                </div>
            </div>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }
}
export default connect(mapStateToProps, { comment, unComment })(Comment);