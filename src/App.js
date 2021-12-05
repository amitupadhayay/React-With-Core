import logo from './logo.svg';
import './App.css';
import Navbar from './components/Core/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Core/Login';
import React, { useState, useEffect } from 'react';
import CoreService from './components/Core/CoreService';
import Sidenav from './components/Core/Sidenav'

function App() {
 
  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>        
        {/* <Sidenav></Sidenav> */}
      </BrowserRouter>

    </>
  );
}

export default App;
