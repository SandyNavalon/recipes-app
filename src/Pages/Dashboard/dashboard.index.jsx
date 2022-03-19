// Pages/Dashboard/index.js
import React from "react";
import { useAuthDispatch, logoutUser, useAuthState } from "../../Context/context.index";
import { Link, useNavigate } from "react-router-dom";
import UserRecipes from "./UserRecipes/UserRecipes";

import '../../Styles/dashboard.scss'

const ROOT = 'http://localhost:3000/';

function Dashboard(_props) {
  let navigate = useNavigate();
  const dispatch = useAuthDispatch(); // lee el método dispatch del contexto
  const user = useAuthState(); //lee los detalles del usuario del contexto
  const email = useAuthState();

  const recipesItem = user.recipes
  const recipesList = recipesItem.map((item)=>
  <li className='recipeList 'key={item.toString()}><UserRecipes name={item}/></li>
  );




  const handleLogout = () => {
    logoutUser(dispatch); //llama a la acción logout
    navigate("/"); //navega de nuevo al login sin usuario
  }

  return (
    <div style={{ padding: 10 }}>
      <div>
        <h1>Dashboard</h1>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
      <p>Welcome {user.user}</p>
      <p>Tu email es {email.email}</p>

      <div>
        <hr></hr>
      <div className='recipebtns'>
          <h1>Recetas</h1>
          <Link to='/dashboard/add-recipes'>añadir receta</Link>
        
      </div>
        <ul>{recipesList}</ul>
      </div>
    </div>

  );
}

export default Dashboard;