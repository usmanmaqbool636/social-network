import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { logedIn,notLogedIn } from './store/actions/user';
import MainRouter from './MainRouter'
import { BrowserRouter as Router } from 'react-router-dom';
require('dotenv').config();
const App = (props) => {
  useEffect(()=>{
    if(localStorage.jwt){
      props.logedIn(localStorage.jwt);
    }
    else{
      props.notLogedIn();
    }
  })
  return (
    <Router>
      <MainRouter />
    </Router>
  );
}
const mapStateToProps = (state) => {
  return {
    
  }
}
export default connect(mapStateToProps, { logedIn,notLogedIn })(App);
