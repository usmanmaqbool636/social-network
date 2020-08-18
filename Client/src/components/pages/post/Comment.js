import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';


import { comment, unComment } from "../../../store/actions/post";
import SingleComment from "./commentRender";
class Comment extends React.Component {
    state = {
        text: ""
    }
    commentRef = React.createRef();

    componentDidUpdate(prevprops) {
        if (prevprops.comments.length !== this.props.comments.length) {
            console.log("updated");
        }
    }
    submitHandler = (evt) => {
        evt.preventDefault();

        const { postId } = this.props;
        const { isAuthenticated } = this.props;
        const text = this.commentRef.current.value
        if (text.length && isAuthenticated) {
            this.props.comment(postId, { text }, localStorage.jwt, (err) => {
                if (!err) {
                    this.setState({ text: "" })
                    this.props.socket.emit("postUpdate", postId)
                    this.commentRef.current.value=""
                }
            })
        }
        else {


        }
    }


    deleteComment = (commentId) => {
        const { postId } = this.props;
        console.log(commentId,postId);

        this.props.unComment(postId, commentId, localStorage.jwt, (err) => {
            if (err) {
                console.log("comment not deleted");
            }
            else {
                this.props.socket.emit("postUpdate", postId)
            }
        })

    }


    render() {
        const { comment, comments, isAuthenticated, user,postId } = this.props;
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
                    <form onSubmit={this.submitHandler} >
                        <div className="form-group">
                            <input
                                placeholder="Write comment"
                                className="form-control"
                                type="text"
                                ref={this.commentRef}
                            />
                        </div>
                        <button type="submit" className="btn btn-raised btn-success ">post</button>
                    </form>
                    <hr />
                    <div className="col-12">
                        <h2> ({comments.length}) Comments </h2>
                        {newComments.map(comment => (
                            <SingleComment isAuthenticated={isAuthenticated} deleteComment={this.deleteComment} user={user} comment={comment} key={`comment/${postId} ${comment._id}`} />
                        ))}


                    </div>
                </div>
            )
        }
    }
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        socket: state.socket
    }
}
export default connect(mapStateToProps, { comment, unComment })(Comment);