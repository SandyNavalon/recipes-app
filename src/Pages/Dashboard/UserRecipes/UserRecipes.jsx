
import { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";
//import RecipeDetail from "../../RecipeDetail/recipeDetail.index";


function UserRecipes(props) {
    const recipeId = props.name;
    //const prueba = 'soy una prueba';
    console.log('props:', recipeId);

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [recipe, setRecipe] = useState({
        title: "",
        img: ""
    });


    useEffect(() => {
        Axios(`http://localhost:4000/recipes/${recipeId}`)
            .then(res => {
                setRecipe({

                    title: res.data.title,
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
        <div >
            <div >

                <div >

                    <h1>{recipe.title}</h1>

                    <img alt={recipe.title} src={recipe.img} width="300px"></img>
                    <Link to={`/detail/${recipeId}`}><button>¡Quiero hacerlo!</button></Link>


                </div>

            </div>
        </div>
    );
}

export default UserRecipes;


