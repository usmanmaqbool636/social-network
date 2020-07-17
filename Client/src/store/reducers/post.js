import { GETALLPOST, SINGLEPOST, POSTBY_USER } from '../actions/types';
const initialState = {
    posts: [],
    post: null,
    postbyUser: []
}
const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case GETALLPOST:
            return {
                ...state,
                posts: action.payload
            };
        case SINGLEPOST:
            return {
                ...state,
                post: action.payload
            }
        case POSTBY_USER:
            return {
                ...state,
                postbyUser: action.payload
            }
        default:
            return state
    }
}

export default postReducer;