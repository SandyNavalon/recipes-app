// Pages/Dashboard/index.js
import React from "react";
import { useAuthDispatch, logoutUser, useAuthState } from "../../Context/context.index";
import { Link, useNavigate } from "react-router-dom";
import UserRecipes from "./UserRecipes/UserRecipes";

import '../../Styles/dashboard.scss'

function Dashboard(_props) {
  // let navigate = useNavigate();
  // const dispatch = useAuthDispatch(); // lee el método dispatch del contexto
  const user = useAuthState(); //lee los detalles del usuario del contexto
  // const email = useAuthState();

  const recipesItem = user.recipes
  const recipesList = recipesItem.map((item)=>
  <li className='recipeList' key={item.toString()}><UserRecipes name={item}/></li>
  );


  return (
    <div style={{ padding: 10 }}>

        <h1>Dashboard</h1>
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