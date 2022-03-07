// Pages/Dashboard/index.js

import React from "react";
import { useAuthDispatch, logoutUser, useAuthState } from "../../Context/context.index";
import { useNavigate } from "react-router-dom";

function Dashboard(props) {
  let navigate = useNavigate();
  const dispatch = useAuthDispatch(); // lee el método dispatch del contexto
  const userDetails = useAuthState(); //lee los detalles del usuario del contexto

  const handleLogout = () => {
    logoutUser(dispatch); //llama a la acción logout
    navigate("/"); //navega de nuevo al login sin usuario
  };
  return (
    <div style={{ padding: 10 }}>
      <div >
        <h1>Dashboard</h1>
        <button  onClick={handleLogout}>
          Logout
        </button>
      </div>
      <p>Welcome {userDetails.user.email}</p>
    </div>
  );
}

export default Dashboard;