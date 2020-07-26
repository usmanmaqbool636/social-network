import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { getRandomColor } from '../../helper';
class Comment extends React.Component {
    componentDidUpdate(prevProps){
        if(prevProps.comment._id!==this.props.comment._id){
            console.log("comment updated ")
        }
    }
    imgError = async (evt) => {
        // evt.target.src = "https://source.unsplash.com/random";
        evt.target.style.backgroundColor = getRandomColor()
        evt.target.style.overflow = "hidden"
    }
    render() {
        const { comment, user, isAuthenticated } = this.props
        return (
            <div key={`tabfollower${comment._id}`}>
                <div className="row mt-2 p-2">
                    <div className="col-12">

                        <div className="d-flex justify-content-between">
                            <div class="media">
                                <Link to={`/user/${comment.commentedBy._id}`} title={comment.commentedBy.name}>
                                    <img
                                        src={`http://localhost:8080/api/user/photo/${comment.commentedBy._id}?${new Date().getTime()}`} class="mr-3" onError={this.imgError} />

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
                                <button type="button" onClick={() => this.deleteComment(comment._id)} className="btn  btn-danger">delete</button>
                            }

                        </div>
                    </div>

                </div>
            </div>
        )

    }
}

export default Comment;