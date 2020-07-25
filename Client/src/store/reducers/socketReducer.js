import { SOCKETCONNECTED } from "../actions/types";

const initialState = null

const Socket = (state = initialState, action) => {
    switch (action.type) {
        case SOCKETCONNECTED:
            return action.payload
        default:
            return state
    }
}


export default Socket;