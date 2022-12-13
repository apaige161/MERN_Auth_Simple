import React, { useState, useContext } from "react";
import axios from "axios"
import { useHistory } from "react-router-dom";

import AuthContext from "../../Context/AuthContext";

export default function Register() {

  const { getLoggedIn } = useContext(AuthContext); 
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  
  // set the values of each form element with a event listener

  // get form data -> post to server
  async function register(e) {
      e.preventDefault() // keeps browser from creating a query string or refreshing the page
      try {
        const registerData = {
          email,
          nickname,
          password,
          passwordVerify,
        };

        //configure axios to set the header
        await axios.post("http://localhost:5000/auth/", registerData);
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
      <h1>Register a new account</h1>
      <form onSubmit={register}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="text"
          placeholder="Nickname"
          onChange={(e) => setNickname(e.target.value)}
          value={nickname}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="password"
          placeholder="Verify Password"
          onChange={(e) => setPasswordVerify(e.target.value)}
          value={passwordVerify}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
