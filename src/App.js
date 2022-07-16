import './App.css';
import Navbar from './components/Core/Navbar';
//import { BrowserRouter as Router} from 'react-router-dom';
import {BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
//import React, { useState, useEffect } from 'react';
// import Sidenav from './components/Core/Sidenav'

// hiiiiii

function App() {

  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <Navbar></Navbar>
    </Router>

  );
}

export default App;
