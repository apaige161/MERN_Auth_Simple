import React, { useContext } from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Navbar from './components/layout/Navbar'
import Customers from './components/customers/Customers';

import AuthContext from './Context/AuthContext';



export default function Router() {

  const { loggedIn } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/">
          <div>Home</div>
        </Route>
        {loggedIn === false && (
          <>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
          </>
        )}

        {loggedIn === true && (
          <>
            <Route path="/customer">
              <Customers />
            </Route>
            
          </>
        )}
      </Switch>
    </BrowserRouter>
  );
}
