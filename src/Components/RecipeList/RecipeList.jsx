import React from 'react'
import { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";
//import RecipeDetail from "../../RecipeDetail/recipeDetail.index";
const RecipeList = () => {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [recipe, setRecipe] = useState([]);

    //let recipesList =[]
    useEffect(() => {
        Axios(`http://localhost:4000/recipes/`)
            .then(res => {
                const recipesList = res.data;
                setRecipe(recipesList)
            },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    console.log('recipe:', recipe);

    return (
        <>
            <ul >
                {recipe.map((item) =>
                <li key={item._id.toString()}>
                    <h3 >{item.title}</h3>
                    <img alt={item.title} src={item.img} width="300px"></img>
                    <Link to={`detail/${item._id}`}><button>view detail</button></Link>
                </li>
                )}
            </ul>
        </>
    );
}

export default RecipeList