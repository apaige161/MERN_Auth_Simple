import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import AuthContext from '../../Context/AuthContext';
import LogoutBtn from "../auth/Logout";

// show login, register if not logged in
// show customers link if user is logged in


export default function Navbar() {

  const { loggedIn } = useContext(AuthContext)

  return (
    <div>
      <Link to="/">Home</Link>
      {loggedIn === false && (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}

      {loggedIn === true && (
        <>
          <Link to="/customer">Customer</Link>
          <LogoutBtn />
        </>
      )}
    </div>
  );
}
