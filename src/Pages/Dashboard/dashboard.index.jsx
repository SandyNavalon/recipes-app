// Pages/Dashboard/index.js

import React from "react";
import { useAuthDispatch, logoutUser, useAuthState } from "../../Context/context.index";
import { useNavigate } from "react-router-dom";
import UserRecipes from "./UserRecipes/UserRecipes";

function Dashboard(_props) {
  let navigate = useNavigate();
  const dispatch = useAuthDispatch(); // lee el método dispatch del contexto
  const user = useAuthState(); //lee los detalles del usuario del contexto
const email = useAuthState();

const recipesItem = user.recipes
const recipesList = recipesItem.map((item)=>
<li key={item.toString()}><UserRecipes name={item}/></li>
);


console.log('user:', user);

  const handleLogout = () => {
    logoutUser(dispatch); //llama a la acción logout
    navigate("/"); //navega de nuevo al login sin usuario
  }
  return (
    <div style={{ padding: 10 }}>
      <div >
        <h1>Dashboard</h1>
        <button  onClick={handleLogout}>
          Logout
        </button>
      </div>
      <p>Welcome {user.user}</p>
      <p>Tu email es {email.email}</p>

      <div>
        <hr></hr>
      <h1>Recetas:</h1>
      <ul>{recipesList}</ul>

      </div>
    </div>
  );
}

export default Dashboard;