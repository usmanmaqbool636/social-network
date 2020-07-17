import { GETALLPOST, SINGLEPOST, POSTBY_USER } from './types'
import axios from 'axios'
import { token } from 'morgan'

export const createPost = (post, token, cb) => {
    return async dispatch => {
        try {
            await axios.post(`/post/createpost`, post, {
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
            const res = await axios.get(`/post/single/${postId}`)
            dispatch({ type: SINGLEPOST, payload: res.data })
            cb(null, res.data)
        } catch (err) {
            console.log(err);
            cb("Post not fetched")
        }
    }
}
export const getAllPost = (cb) => {
    return async dispatch => {
        try {
            const res = await axios.get(`/post/getAllpost`)
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
            const res = await axios.get(`/post/by/${_id}`)
            dispatch({ type: POSTBY_USER, payload: res.data });
            cb();
        } catch (error) {
            console.log(error);
            cb("user post not fetched")
        }
    }
}
export const deletePost = async (_id, token, cb) => {
    return async dispatch => {
        try {
            await axios.delete(`/post/${_id}`, {
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
            await axios.put(`/post/${updatedpost._id}`, updatedpost, {
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