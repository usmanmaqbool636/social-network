import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { singlePost, deletePost } from "../../../store/actions/post"
import { Link } from 'react-router-dom';
import Modal from "../../Modal";
const SinglePost = ({ match, history, post, singlePost, isAuthenticated, user }) => {
    useEffect(() => {
        singlePost(match.params.postId, (err) => {
            if (err) {
                console.log(err);
            } else {

            }
        })
    }, [singlePost])

    switch (post) {
        case null:
            return (
                <div className="text-center">Loading</div>
            )
        default:
            return (
                <div className="container">
                    <h2 className="display-2 my-4"> {post.title}</h2>
                    <div className="col-md-12 card m-1 p-1">
                        <img className="card-image-top" style={{
                            width: "100%",
                            height: "15vw",
                            objectFit: "contain"
                        }}
                            src={`http://localhost:8080/post/photo/${post._id}`}
                            // onError={imgError}
                            alt={`${post.name}'s Image`} />
                        <div className="card-body p-2">
                            <p className="card-text">{post.body} </p>
                            <hr />
                            <p className="font-italic ">
                                Posted By
                                        <Link to={`/user/${post.postedBy._id}`}>
                                    <span className="mark">
                                        {post.postedBy.name}
                                    </span>
                                </Link>
                                <br />
                                        on {new Date(post.createdAt).toDateString()}
                            </p>
                        </div>
                    </div>
                    {isAuthenticated && user._id === post.postedBy._id && (


                        <div className="d-inline-block my-4 float-right">
                            <Link className="btn btn-raised btn-info mr-3"
                                to={`/post/edit/${post._id}`}
                            >
                                Edit Post
                            </Link>
                            <button className="btn btn-raised btn-danger" data-toggle="modal" data-target={`#post${post._id}`}>Delete Post</button>
                            <Modal text="profile" modelId={`post${post._id}`} deleteHandler={() => {
                                deletePost(post._id, localStorage.jwt, (err) => {
                                    if (err) {
                                        console.log(err)
                                    }
                                    else {
                                        
                                        history.push('/')
                                    }
                                })
                            }} />
                        </div>
                    )}
                </div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.post.post,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user
    }
}
export default connect(mapStateToProps, { singlePost })(SinglePost);