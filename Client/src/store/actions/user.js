import {
    SIGNIN, SIGNUP,
    SET_USER, LOGOUT,
    ALL_USER, SINGLE_USER,
    DELETE_PROFILE, UPDATE_PROFILE,
    AUTH_ERROR, NOT_LOGED_IN,
    FOLLOW,
    UNFOLLOW,
    FINDPEOPLE,
    LIKESANDCOMMENTS,
    LIKERECEIVE,
} from './types'
import Axios from 'axios';
export const likesAndcomments = (token, cb) => {
    return async dispatch => {
        try {
            const res = await Axios.get("/api/user/likesgave", {
                headers: {
                    Authorization: token
                }
            })
            dispatch({ type: LIKESANDCOMMENTS, payload: res.data })
            cb()
        } catch (error) {
            cb("likes and comment not found");
        }
    }
}
export const likesReceive = (token, cb) => {
    return async dispatch => {
        try {
            const res = await Axios.get("/api/user/likesreceive", {
                headers: {
                    Authorization: token
                }
            });
            dispatch({
                type: LIKERECEIVE,
                payload: res.data
            })
            cb();
        } catch (error) {
            cb({ error: "Something went Wrong" })
        }
    }
}
export const signin = (user, cb) => {
    return async dispatch => {
        try {
            const res = await Axios.post(`/api/auth/signin`, user)
            localStorage.setItem("jwt", `Bearer ${res.data.token}`)
            dispatch({ type: SIGNIN, payload: res.data })
            cb()
        }
        catch (err) {
            const status = Boolean(err.response) ? err.response.status : 0
            if (status === 403 || status === 404) {
                cb(err.response.data)
            }
            else {
                cb({ error: "Something went Wrong" })
            }
        }
    }
}

export const signup = (user, cb) => {
    return async dispatch => {
        try {
            const res = await Axios.post(`/api/auth/signup`, user)
            localStorage.setItem("jwt", `Bearer ${res.data.token}`)
            dispatch({ type: SIGNUP, payload: res.data })
            cb()
        }
        catch (err) {
            const status = Boolean(err.response) ? err.response.status : 0
            if (status === 403 || status === 404) {
                cb(err.response.data)
            }
            else {
                cb({ error: "Something went Wrong" })
            }
        }
    }
}

export const logedIn = (token) => {
    return async dispatch => {
        try {
            const res = await Axios.get(`/api/auth/logedin`, {
                headers: {
                    "Authorization": token
                }
            })
            dispatch({ type: SET_USER, payload: res.data })
        }
        catch (err) {
            localStorage.removeItem('jwt')
            dispatch({ type: AUTH_ERROR })
        }
    }
}

export const allUser = (cb) => {
    return async dispatch => {
        try {
            const res = await Axios.get(`/api/user/alluser`)
            dispatch({ type: ALL_USER, payload: res.data })
            cb()
        } catch (err) {
            console.log(err);
            cb("User not fetched")
        }
    }
}

export const findPeople = (token, cb) => {
    return async dispatch => {
        try {
            const res = await Axios.get(`/api/user/suggestion`, {
                headers: {
                    Authorization: token
                }
            })
            dispatch({ type: FINDPEOPLE, payload: res.data })
            cb()
        } catch (err) {
            console.log(err);
            cb("User not fetched")
        }
    }
}
export const singleUser = (id, cb) => {
    return async dispatch => {
        try {
            const res = await Axios.get(`/api/user/${id}`)
            dispatch({ type: SINGLE_USER, payload: res.data })
            cb()
        } catch (err) {
            console.log(err);
            cb("User not fetched")
        }
    }
}
export const logout = (cb) => {
    return async dispatch => {
        try {
            await Axios.get("/api/auth/signout")
            dispatch({ type: LOGOUT })
            cb()
        } catch (err) {
            console.log(err);
        }
    }
}
export const deleteProfile = (userId, token, cb) => {
    return async dispatch => {
        try {
            await Axios.delete(`/api/user/${userId}`, {
                headers: {
                    Authorization: token
                }
            })
            localStorage.removeItem("jwt");
            dispatch({ type: DELETE_PROFILE })
            cb();

        }
        catch (err) {
            console.log(err)
            cb("user not deleted")
        }
    }
}
export const editProfile = (id, user, token, cb) => {
    return async dispatch => {
        try {
            const res = await Axios.put(`/api/user/${id}`, user, {
                headers: {
                    Authorization: token
                }
            });
            dispatch({ type: UPDATE_PROFILE, payload: res.data })
            cb();
        } catch (err) {
            console.log(err);
            cb("user not updated");
        }
    }
}
export const notLogedIn = () => {
    return {
        type: NOT_LOGED_IN
    }
}


export const userfollow = (followid, token, cb) => {
    return async dispatch => {
        try {
            const res = await Axios.put(`/api/user/follow/`, { followid }, {
                headers: {
                    Authorization: token
                }
            });
            dispatch({ type: FOLLOW, payload: res.data })
            cb();
        } catch (err) {
            console.log(err);
            cb("something went wrong please try again");
        }
    }
}
export const unFollow = (unfollowid, token, cb) => {
    return async dispatch => {
        try {
            const res = await Axios.put(`/api/user/unfollow/`, { unfollowid }, {
                headers: {
                    Authorization: token
                }
            });
            dispatch({ type: UNFOLLOW, payload: res.data })
            cb();
        } catch (err) {
            console.log(err);
            cb("something went wrong please try again");
        }
    }

}