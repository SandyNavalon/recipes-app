
import { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";


function UserRecipes(props) {
    const recipeId = props.name[0];
    const keyword = props.name[1];
    console.log('props:', keyword);

        const [error, setError] = useState(null);
        const [isLoaded, setIsLoaded] = useState(false);

    const [recipe, setRecipe] = useState({
        title: "",
        img: "",
        ingredients: ""
    });


    useEffect(() => {
        Axios(`http://localhost:4000/recipes/${recipeId}`)
            .then(res => {
                console.log('res:', res);
                setRecipe({

                    title: res.data.title,
                    img: res.data.img,
                    ingredients: res.data.ingredients
                });
            },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);
    
    //const recipeIngredients = recipe.ingredients;
    //const ingredientMatch = recipeIngredients.findOne(keyword);

if( !keyword.length ){
    return (
        
        <div>
            <div>
                <div>
                    <h1>{recipe.title}</h1>
                    <h3>ingredientes</h3>
                    <p>{recipe.ingredients}</p>
                    <img alt={recipe.title} src={recipe.img} width="300px"></img>
                    <Link to={`/detail/${recipeId}`}><button>view detail</button></Link>
                </div>
            </div>
        </div>
    );} 
    
    // if (ingredientMatch !== ''){
    //     return (<p>{recipe.title}</p>)
    // }
    else {
       return <p>no concuerdan recetas con ingredientes</p>
    }
}

export default UserRecipes;


