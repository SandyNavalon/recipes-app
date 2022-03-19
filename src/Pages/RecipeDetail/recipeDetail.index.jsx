import React from 'react'
import { useEffect, useState } from 'react';
import Axios  from 'axios';


const RecipeDetail = () => {

  //sacamos el id de la url del browser troceándolo
  const url = window.location.href;
  const urlId = url.slice(-24);

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
      
      <h1>Nombre{recipe.title}</h1>
<img alt={recipe.title} src={recipe.img} width="500px"></img>
      <h2>type: {recipe.type}</h2>
      <ul>ingredients: {recipe.ingredients.map((item, index) => {
        return (<li key={index}>{item}</li>)
      })}</ul>
      <p>category: {recipe.category}</p>

      <p>{recipe.description}</p>
    </div>
  )
}

export default RecipeDetail