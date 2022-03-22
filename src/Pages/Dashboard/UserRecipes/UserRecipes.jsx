
import { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";
//import RecipeDetail from "../../RecipeDetail/recipeDetail.index";


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
    

if(keyword === ''){
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
    );} else {
        return (<p>aqui van recetas con el buscador</p>)
        
    }
}

export default UserRecipes;


