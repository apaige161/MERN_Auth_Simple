import React, { useContext } from 'react'
import {useHistory} from 'react-router-dom'
import AuthContext from '../../Context/AuthContext';
import axios from "axios";

export default function LogoutBtn() {

    const { getLoggedIn } = useContext(AuthContext); 
    
    const history = useHistory();

    async function logout() {
        // logout at the server
        await axios.get("http://localhost:5000/auth/logout"); // returns an emtpy cookie that is expired
        // update client side of logged in or not data
        await getLoggedIn();
        // redirect to home page
        history.push("/")
    }


  return (
    <button onClick={logout}>
        Logout
    </button>
  )
}
