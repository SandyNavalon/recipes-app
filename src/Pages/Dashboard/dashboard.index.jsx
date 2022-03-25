// Pages/Dashboard/index.js
import React, { useEffect } from "react";
import { useAuthDispatch, logoutUser, useAuthState } from "../../Context/context.index";
import { Link, useNavigate } from "react-router-dom";
// import UserRecipes from "./UserRecipes/UserRecipes";
// import FiltroPrueba from "./FiltroPrueba";
import { useState } from "react";
import './dashboard.scss';
//import '../general.scss'


function Dashboard(_props) {
  let navigate = useNavigate();
  const dispatch = useAuthDispatch(); // lee el método dispatch del contexto
  const user = useAuthState(); //lee los detalles del usuario del contexto

  const [recipes, setRecipes] = useState([]);
  const [seleccionada, setSeleccionada] = useState([]);
  // es el valor del input
  const [ingredient, setIngredient] = useState("");

  const [ingredientsArray, setIngredientsArray] = useState([]);

  useEffect(() => {
    setRecipes(user.recipes);
  }, [user]);

  const filter = (e) => {
    e.preventDefault();
    setIngredientsArray([...ingredientsArray, ingredient]);
    e.target.reset();
    setIngredient("");

    for (const recipe of recipes) {
      for (const item of recipe.ingredients) {
        ingredientsArray.forEach((element) => {
          if (element.localeCompare(item) === 0) {
            setSeleccionada([...seleccionada, recipe]);
            console.log("si entra");
          } else {
            //console.log('no entra');
          }
        });
      }
    }
  };

  const handleLogout = () => {
    logoutUser(dispatch); //llama a la acción logout
    navigate("/"); //navega de nuevo al login sin usuario
  };

  return (
    <div style={{ padding: 10 }}>
      <div>
        <h1>Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <p>Welcome {user.user}</p>
      <p>Tu email es {user.email}</p>

      <div>
        <hr></hr>
        <div className="recipebtns">
          <h1>Recetas</h1>
          <Link to="/dashboard/add-recipes">añadir receta</Link>
        </div>
        {seleccionada.map((item) => (
          <div key={item._id}>
            <h1>{item.title}</h1>
            <h3>ingredientes</h3>
            {item.ingredients.map((item, index) => (
              <p key={index.toString()}>{item}</p>
            ))}
            <p>
              <img alt={item.title} src={item.img} width="300px"></img>
            </p>
            <Link to={`/detail/${item._id}`}>
              <button>view detail</button>
            </Link>
            <hr></hr>
          </div>
        ))}
      </div>

      <div></div>

      {/** filtro */}
      <div>
        <form onSubmit={filter}>
          <p>Filtrito</p>

          <input
            type="search"
            value={ingredient}
            onChange={(event) => setIngredient(event.target.value)}
            placeholder="Filtrito"></input>
          <button type="submit">añadir</button>
          <ul>
            {ingredientsArray.map((i) => <li key={i.toString()}>{i}</li>)}
          </ul>
        </form>
      </div>

    </div>
  );
}

export default Dashboard;
