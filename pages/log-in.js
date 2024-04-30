import React from "react";
import Login from "../components/Login";

const LogIn = () => {
  return (
    <div className="center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Log In</h2>
      <Login />
    </div>
  );
}

export default LogIn;