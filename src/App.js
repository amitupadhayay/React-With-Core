import logo from './logo.svg';
import './App.css';
import Navbar from './components/Core/Navbar';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Core/Login';
import React, { useState, useEffect } from 'react';
import CoreService from './components/Core/CoreService';

function App() {

  //const [authenticated, setAuthenticated] = useState(false);

  // useEffect(() => {
  //   setAuthenticated(CoreService.checkToken());
  // }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar></Navbar>
        {/* {authenticated == false ?
          <Switch>
            <Route exact path='/' component={Login}></Route>
            <Route exact path='/login' component={Login}></Route>
          </Switch>
          : null} */}
      </BrowserRouter>

    </>
  );
}

export default App;
