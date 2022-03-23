
//import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./userRecipes.scss";


function UserRecipes(props) {
    //extraigo del prop el array de recetas del user
    const recipes = props.name[0];
    console.log('recipes:', recipes);

    // const ingredientsRecipe = recipe.ingredients;
    // console.log('recipeIngredients', ingredientsRecipe);

    //extraigo del prop el array de ingredientes del form
     const ingredientsForm = props.name[1];
    console.log('ingredientsForm', ingredientsForm);
    //console.log('ingredientsArray', ingredientsArray);

return<>
    {
    recipes.map((item)=> 
    <div key={item._id}>
    <h1>{item.title}</h1>
    <h3>ingredientes</h3>
               {item.ingredients.map((item, index) =>
                    <p key={index.toString()}>{item}</p>
                 )}
    <p><img alt={item.title} src={item.img} width="300px"></img></p>        
    <Link to={`/detail/${item._id}`}><button>view detail</button></Link>
    <hr></hr>
    
    
    </div>)
    }
   
</>

   } 








export default UserRecipes;


