import { 
    SIGNUP, SIGNIN, 
    SET_USER, LOGOUT, 
    AUTH_ERROR, ALL_USER, 
    SINGLE_USER, DELETE_PROFILE, 
    UPDATE_PROFILE, 
    NOT_LOGED_IN, 
    FOLLOW, UNFOLLOW,
    FINDPEOPLE

} from '../actions/types';

const initialState = {
    user: null,
    isAuthenticated: null,
    token: null,
    userList: null,
    userProfile: null,
    findPeople: null
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGNUP:
        case SIGNIN:
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
                user: action.payload.user
            }

        case SET_USER:
        case UNFOLLOW:
        case FOLLOW:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            }
        case UPDATE_PROFILE:
            return {
                ...state,
                user: action.payload

            }
        case AUTH_ERROR:
        case NOT_LOGED_IN:
        case LOGOUT:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                token: null
            }
        case ALL_USER:
            return {
                ...state,
                userList: action.payload
            }
        case SINGLE_USER:
            return {
                ...state,
                userProfile: action.payload
            }
        case DELETE_PROFILE:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                token: null,
                userProfile: null

            }
        case FINDPEOPLE:
            return {
                ...state,
                findPeople: action.payload
            }
        default:
            return state
    }
}

export default userReducer;