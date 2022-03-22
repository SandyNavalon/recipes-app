// Pages/Dashboard/index.js
import React from "react";
import { useAuthState } from "../../Context/context.index";
import { Link } from "react-router-dom";
import UserRecipes from "./UserRecipes/UserRecipes";


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
    <div className="dashboardPrivate">

      <div className="dashboardPrivate__top">
          <h1>Mis Recetas</h1>
          <Link to='/dashboard/add-recipes'>
            <button>añadir receta</button>
          </Link>
      </div>

      <div className="dashboardPrivate__list">
        <ul>{recipesList}</ul>
      </div>
    </div>
  );
}

export default Dashboard;