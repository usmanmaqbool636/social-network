import { FETCH_DATA, SIGNUP, SIGNIN } from './types'
import axios from 'axios'
export const fetchData = (api) => {
    return async (dispatch, state) => {
        try {
            const res = await axios.get(api)
            dispatch({
                type: FETCH_DATA,
                payload: res.data
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}
export const signUp = (user, done) => {
    return async dispatch => {
        axios.post("http://localhost:8080/auth/signup")
            .then(res => {
                localStorage.setItem("jwttoken", res.data.token)
                dispatch({ type: SIGNUP, payload: res.data })
                return done()
            })
            .catch(err => {
                if (err.response.status === 403) {
                    done(err.response.data)
                }
                return done({ error: "Network Error" })
            })
    }
}
export const signIn = (user, done) => {
    return async dispatch => {
        axios.post("http://localhost:8080/auth/signin")
            .then(res => {
                localStorage.setItem("jwttoken", res.data.token)
                dispatch({ type: SIGNUP, payload: res.data })
                return done()
            })
            .catch(err => {
                if (err.response.status === 403) {
                    done(err.response.data)
                }
                return done({ error: "Network Error" })
            })
    }
}