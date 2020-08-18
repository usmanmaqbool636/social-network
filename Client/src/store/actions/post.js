import { GETALLPOST, SINGLEPOST, POSTBY_USER, LIKE_UNLIKE, COMMENT, UNCOMMENT } from './types'
import axios from 'axios'

export const createPost = (post, token, cb) => {
    return async (dispatch) => {
        try {
            await axios.post(`/api/post/createpost`, post, {
                headers: {
                    Authorization: token
                }
            })
            // dispatch({ type: "", payload: res.data })
            cb()
        } catch (err) {
            console.log(err);
            cb("Post not created")
        }
    }
}

export const singlePost = (postId, cb) => {
    return async dispatch => {
        try {
            const res = await axios.get(`/api/post/single/${postId}`)
            dispatch({ type: SINGLEPOST, payload: res.data })
            cb(null, res.data)
        } catch (err) {
            console.log(err);
            cb("Post not fetched")
        }
    }
}
export const getAllPost = (cb) => {
    return async (dispatch, state) => {
        try {
            const res = await axios.get(`/api/post/getAllpost`)

            console.log(state().socket.emit("one", { data: "one" }));
            dispatch({ type: GETALLPOST, payload: res.data })

            cb()
        } catch (err) {
            console.log(err);
            cb("Posts not fetched")
        }
    }
}

export const postByUser = (_id, cb) => {
    return async dispatch => {
        try {
            const res = await axios.get(`/api/post/by/${_id}`)
            dispatch({ type: POSTBY_USER, payload: res.data });
            cb();
        } catch (error) {
            console.log(error);
            cb("user post not fetched")
        }
    }
}
export const deletePost = (_id, token, cb) => {
    return async dispatch => {
        try {
            await axios.delete(`/api/post/${_id}`, {
                headers: {
                    Authorization: token
                }
            })
            cb()
        } catch (error) {
            cb("post not deleted")

        }
    }
}

export const updatePost = (updatedpost, token, cb) => {
    return async dispatch => {
        try {
            await axios.put(`/api/post/${updatedpost._id}`, updatedpost, {
                headers: {
                    Authorization: token
                }
            })
            cb()
        } catch (error) {
            cb("post not updated")
        }
    }
}

export const likeUnlike = (postId, token, cb) => {
    return async dispatch => {
        try {
            const res = await axios.put(`/api/post/like/${postId}`, {}, {
                headers: {
                    Authorization: token
                }
            });
            dispatch({ type: LIKE_UNLIKE, payload: res.data });
            cb();
        } catch (error) {
            cb("likes not updated");
        }
    }
}
export const postUpdate = (post) => {
    return {
        type: LIKE_UNLIKE,
        payload: post
    }
}

export const comment = (postId, comment, token, cb) => {
    return async dispatch => {
        try {
            const res = await axios.put(`/api/post/comment/${postId}`, { comment: comment.text }, {
                headers: {
                    Authorization: token
                }
            });
            dispatch({ type: COMMENT, payload: res.data })
            cb();
        } catch (error) {
            cb("comment not posted");
        }
    }
}

export const unComment = (postId, commentId, token, cb) => {
    return async dispatch => {
        try {
            console.log("uncomment");
            const res = await axios.put(`/api/post/uncomment/${postId}/${commentId}`, {}, {
                headers: {
                    Authorization: token
                }
            });
            dispatch({ type: UNCOMMENT, payload: res.data })
            cb();
        } catch (error) {
            console.log("error=>>>>>>", error)
            cb("comment not deleted");
        }
    }
}