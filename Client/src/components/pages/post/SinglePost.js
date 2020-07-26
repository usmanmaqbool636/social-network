import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { singlePost, deletePost, likeUnlike, postUpdate } from "../../../store/actions/post"
import { Link } from 'react-router-dom';
import Modal from "../../Modal";
import Comments from "./Comment"


class SinglePost extends React.Component {
    state = {
        isLike: false
    }
    componentDidMount() {
        this.props.singlePost(this.props.match.params.postId, (err) => {
            if (err) {
                console.log(err);
            } else {

            }
        })
        this.SockerHandler()


    }
    componentDidUpdate(prevProps) {
        if (this.props.socket !== prevProps.socket) {
            this.SockerHandler()
        }
    }
    SockerHandler = () => {
        const socket = this.props.socket;
        if (socket) {
            console.log("socket connected")
            socket.on('post', post => {
                this.props.postUpdate(post)
            })
        }
    }
    likeToggle = () => {
        this.props.likeUnlike(this.props.post._id, localStorage.jwt, (err) => {
            if (err) {
                console.log(err);
            } else {
                this.props.socket.emit("postUpdate", this.props.post._id)
            }
        })
    }
    render() {
        const { post, isAuthenticated, user, history } = this.props;
        switch (post) {
            case null:
                return (
                    <div className="text-center">Loading</div>
                )
            default:
                let isLike = false
                if (isAuthenticated && post && user) {
                    isLike = post.likes.find(like => like === user._id)
                }

                return (
                    <div className="container-fluid" style={{ width: "90%" }}>
                        <h2 className="display-2 my-4"> {post.title}</h2>
                        <div className="col-md-12 card m-1 p-1">
                            <img className="card-image-top" style={{
                                width: "100%",
                                height: "400px",
                                objectFit: "contain"
                            }}
                                src={`/api/post/photo/${post._id}`}
                                // onError={imgError}
                                alt={`${post.name}'s Image`} />
                            <div className="card-body p-2">
                                <div className="card-text" dangerouslySetInnerHTML={{ __html: post.body }} />
                                <hr />
                                <p className="font-italic ">
                                    Posted By
                                            <Link to={`/user/${post.postedBy._id}`}>
                                        <span className="mark">
                                            {post.postedBy.name}
                                        </span>
                                    </Link>
                                    <br />
                                    {/* on {new Date(post.createdAt).toDateString()} */}
                                            on {moment(post.createdAt).format('lll')}
                                </p>
                                <h6 style={{ cursor: "pointer" }} className="d-inline-block" onClick={this.likeToggle}  >
                                    {post.likes.length}{" "}
                                    {!isLike ? <i className="fa fa-thumbs-o-up ml-1 " aria-hidden="true"></i> :
                                        <i className="fa fa-thumbs-up text-primary ml-1" aria-hidden="true"></i>
                                    }
                                </h6>
                                <h6 style={{ cursor: "pointer" }} className="d-inline-block ml-3" >
                                    {post.comments.length}
                                    <i className="fa fa-comments-o ml-1" aria-hidden="true"></i>
                                </h6>
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
                                    this.props.deletePost(post._id, localStorage.jwt, (err) => {
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
                        <div className="row">
                            <Comments postId={post._id} comments={post.comments} />
                        </div>
                    </div>
                )
        }
    }
}
const mapStateToProps = (state) => {
    return {
        post: state.post.post,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        socket: state.socket
    }
}
export default connect(mapStateToProps, { singlePost, likeUnlike, deletePost, postUpdate })(SinglePost);