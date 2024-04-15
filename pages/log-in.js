import React from "react";
import Login from "../components/Login";

const LogIn = () => {
  return (
    <div className="center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Log In Page</h2>
      <p>Log in to access the full features of the site.</p>
      <Login />
    </div>
  );
}

export default LogIn;