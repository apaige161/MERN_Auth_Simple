import React, { createContext, useEffect, useState } from 'react'
import axios from "axios";
const AuthContext = createContext();

// function will provide the value true/false if logged in or not
// run this fuction at the start of the app
function AuthContextProvider(props) {

    const [loggedIn, setLoggedIn] = useState(undefined);

    // request to server
    async function getLoggedIn() {
        const loggedInRes = await axios.get(
          "http://localhost:5000/auth/loggedIn"
        );
        setLoggedIn(loggedInRes.data); 
    }

    // detect start up
    // only run on first start, not when the components update
    useEffect(() => {
        getLoggedIn();
    }, []);

  return (
    <AuthContext.Provider value={{loggedIn, getLoggedIn}}>
        {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
export { AuthContextProvider };