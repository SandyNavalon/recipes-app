// Pages/Dashboard/index.js
import React from "react";
import { useAuthDispatch, logoutUser, useAuthState } from "../../Context/context.index";
import { Link, useNavigate } from "react-router-dom";
import UserRecipes from "./UserRecipes/UserRecipes";
import FiltroPrueba from "./FiltroPrueba";
import { useState } from "react";

import '../../Styles/dashboard.scss'


function Dashboard(_props) {
  let navigate = useNavigate();
  const dispatch = useAuthDispatch(); // lee el método dispatch del contexto
  const user = useAuthState(); //lee los detalles del usuario del contexto
  const email = useAuthState();


  


  // es el valor del input 
  const [name, setName] = useState('');

  const recipesItem = [user.recipes, name]
  console.log('recipesItem .1 ', recipesItem[0].name);

  const filter = (e) => {
      //saca el valor del campo y lo guarda en keyword
      const keyword = e.target.value;
      
      setName(keyword);
  };


  const recipesList = recipesItem[0].map((item)=>
  <li className='recipeList' key={item.toString()}><UserRecipes name={recipesItem}  /></li>
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
<div>
  <p>Filtrito</p>
  <input
   type="search"
   value={name}
   onChange={filter}
   placeholder="Filtrito"></input>
</div>
      {/* <div>
      <FiltroPrueba></FiltroPrueba>
      </div> */}
    </div>

  );
}

export default Dashboard;