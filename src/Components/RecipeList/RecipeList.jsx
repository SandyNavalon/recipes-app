import React from 'react'
import { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";
import '../../Pages/Home/home.scss';

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
    }, []);

    return (
        <div className='recipeCard'>
            <ul className='recipeCard__list'>
                {recipe.map((item) =>
                <li className='recipeCard__list-item' key={item._id.toString()}>
                    <div>
                        <img alt={item.title} src={item.img}/>
                    </div>
                    <h3 >{item.title}</h3>
                    <Link to={`detail/${item._id}`}><button>Preparar</button></Link>
                </li>
                )}
            </ul>
        </div>
    );
}

export default RecipeList