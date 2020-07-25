import { combineReducers } from 'redux'
import user from './user';
import post from './post';
import socket from "./socketReducer";
export default combineReducers({
    auth: user,
    post,
    socket
})