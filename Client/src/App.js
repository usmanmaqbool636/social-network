import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { logedIn, notLogedIn } from './store/actions/user';
import MainRouter from './MainRouter'
import { BrowserRouter as Router } from 'react-router-dom';
import { connectSocket } from "./store/actions/socketAction";
import io from "socket.io-client";
require('dotenv').config();
const App = (props) => {
  useEffect(() => {
    if (localStorage.jwt) {
      props.logedIn(localStorage.jwt);
    }
    else {
      props.notLogedIn();
    }
    props.connectSocket(io('https://social-network-re-1.herokuapp.com'));

  }, []);
  return (
    <Router>

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
