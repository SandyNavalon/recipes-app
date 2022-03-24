// Pages/Dashboard/index.js
import React, { useEffect } from "react";
import { useAuthDispatch, logoutUser, useAuthState } from "../../Context/context.index";
import { Link, useNavigate } from "react-router-dom";
import UserRecipes from "./UserRecipes/UserRecipes";
import FiltroPrueba from "./FiltroPrueba";
import { useState } from "react";
import './dashboard.scss';
//import '../general.scss'


function Dashboard(_props) {
  let navigate = useNavigate();
  const dispatch = useAuthDispatch(); // lee el método dispatch del contexto
  const user = useAuthState(); //lee los detalles del usuario del contexto
  const email = useAuthState();


  const [recipes, setRecipes] = useState([]);


  // es el valor del input 
  const [ingredient, setIngredient] = useState('');


  const [ingredientsArray, setIngredientsArray] = useState([])
  console.log('ingredientArray', ingredientsArray);
  //console.log('recipesItem ', user.recipes.data);

  const filter = (e) => {
    e.preventDefault()
    //console.log('e:', e);
    setIngredientsArray([
      ...ingredientsArray, ingredient
    ])

    console.log('recipes:', user.recipes.data);
    //console.log('ingredientsArray inside', ingredientsArray);
    e.target.reset();
    setIngredient('');


    for (const recipe of recipes) {
      for (const item of recipe.ingredients) {

        if (item.localeCompare(ingredientsArray) === 0) {
          console.log('entra');
          setRecipes( recipe)
        } else {
          console.log('noentra:');
          // setRecipes(
          //   {
          //     category: "",
          //     comments: [],
          //     description: "",
          //     img: "https://res.cloudinary.com/dlce3cxgc/image/upload/v1648114450/not-found_fdfpdx.jpg",
          //     ingredients: [],
          //     title: "Mala suerte",
          //     type: ""
          //   })
        }
      };
    }
    console.log('recipes2:', recipes);
  }




  //const recipesItem = [user.recipes.data, ingredientsArray];

  useEffect(() => {
    setRecipes(user.recipes.data);
  }, []);

  //console.log('ingredients:',recipesItem);

  //const recipesOfUser = user.recipes.data.map((item)=>
  // {
  //let recipesItem = [item, ingredientsArray];
  //<li key={user.recipes.data._id}><UserRecipes name={user.recipes.data} /></li>
  //},
  //)


  //

  //ahora tengo un array de recetas y no ids. el cual mapeo y paso por prop al componente


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
      <div className="private-recipes">
        {
          recipes.map((item) =>
            <div key={item._id} className='card'>
              <p><img alt={item.title} src={item.img} width="300px"></img></p>
              <h2>{item.title}</h2>
              <h3>ingredientes</h3>
              {item.ingredients.map((item, index) =>
                <ul key={index.toString()}><li>{item}</li></ul>
              )}
              
              <Link to={`/detail/${item._id}`}><button>view detail</button></Link>
              <hr></hr>
            </div>)

        }
      </div>
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