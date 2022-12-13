import React, { useState, useContext } from "react";
import axios from "axios"
import { useHistory } from "react-router-dom";

import AuthContext from "../../Context/AuthContext";

export default function Login() {

  const { getLoggedIn } = useContext(AuthContext); 
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // set the values of each form element with a event listener

  // get form data -> post to server
  async function login(e) {
      e.preventDefault() // keeps browser from creating a query string or refreshing the page
      try {
        const loginData = {
          email,
          password,
        };

        //configure axios to set the header
        await axios.post("http://localhost:5000/auth/login", loginData);
        // update client side of logged in or not data
        await getLoggedIn();
        // redirect to home page
        history.push("/");

      } catch (err) {
          console.log(err)
      }
    }

  return (
    <div>
      <h1>Log in to your account</h1>
      <form onSubmit={login}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
