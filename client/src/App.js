import React from 'react';
import Router from './router';
import axios from 'axios';
import { AuthContextProvider } from './Context/AuthContext'

// configure axios to allow setting the cookies
axios.defaults.withCredentials = true

//wrap all routes in the authContextProvider to verify if user is logged in or not

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
