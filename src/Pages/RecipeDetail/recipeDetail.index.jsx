import React from 'react'
import { useEffect, useState } from 'react';
import Axios  from 'axios';
import { Link } from 'react-router-dom';
import { useAuthState } from '../../Context/contexts';


const RecipeDetail = () => {

  //sacamos el id de la url del browser troceándolo
  const url = window.location.href;
  const urlId = url.slice(-24);

  //securizamos ruta usando user
  const {user} = useAuthState();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [recipe, setRecipe] = useState({
    id: "",
    title: "",
    type: "",
    category: "",
    ingredients: [],
    description: "",
    img: ""
  });


  useEffect(() => {
    Axios(`http://localhost:4000/recipes/${urlId}`)
      .then(res => {

        setRecipe({

          title: res.data.title,
          type: res.data.type,
          category: res.data.category,
          ingredients: res.data.ingredients,
          description: res.data.description,
          img: res.data.img
        });
      },

        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  return (
    <div>

      <h1>{recipe.title}</h1>
      <img alt={recipe.title} src={recipe.img} width="500px"></img>
      <h2>Tipo: {recipe.type}</h2>
      <ul>Ingredientes: {recipe.ingredients.map((item, index) => {
        return (<li key={index}>{item}</li>)
      })}</ul>
      <p>Categoría: {recipe.category}</p>

      <p>{recipe.description}</p>
      <Link to="/dashboard/"> Volver</Link>
      {user ? <Link to="*"> Editar</Link> : null}
    </div>
  )
}

export default RecipeDetail