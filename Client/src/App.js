import React, { useEffect, useState } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { logedIn, notLogedIn } from './store/actions/user';
import MainRouter from './MainRouter'
import { BrowserRouter as Router } from 'react-router-dom';
import { connectSocket } from "./store/actions/socketAction";
import io from "socket.io-client";
require('dotenv').config();
const App = (props) => {
  // const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [dt, setDt] = useState('');
  useEffect(() => {
    if (localStorage.jwt) {
      props.logedIn(localStorage.jwt);
    }
    else {
      props.notLogedIn();
    }
    props.connectSocket(io('http://localhost:8080'));

  }, []);

  useEffect(() => {
    if (props.socket) {
      props.socket.on('connect', () => {
        setSocketConnected(props.socket.connected);
      });
      props.socket.on('disconnect', () => {
        setSocketConnected(props.socket.connected);
      });
      subscribeToDateEvent()
      props.socket.on("getDate", data => {
        setDt(data);
      });
    };
    console.log(props.socket);


  }, [props.socket]);

  const subscribeToDateEvent = (interval = 1000) => {
    props.socket.emit('subscribeToDateEvent', interval);
  }

  return (
    <Router>

      <div>
        <h2>Welcome to Socket.IO App! - <a href="https://www.cluemediator.com/" target="_blank">Clue Mediator</a></h2>
        <div>
          <b>Connection status:</b> {socketConnected ? 'Connected' : 'Disconnected'}
        </div>
        <div style={{ marginTop: 20 }}><b>Date: </b> {dt}</div>
      </div>

      <MainRouter />
    </Router>
  );
}
const mapStateToProps = (state) => {
  return {
    socket: state.socket
  }
}
export default connect(mapStateToProps, { logedIn, notLogedIn, connectSocket })(App);
