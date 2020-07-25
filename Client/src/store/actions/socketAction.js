import { SOCKETCONNECTED, DISSOCKETCONNECTED } from "./types";
// import io from "socket.io-client";

export const connectSocket = (socket) => {
    return {
        type: SOCKETCONNECTED,
        payload: socket
    }
}