
import { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";
//import RecipeDetail from "../../RecipeDetail/recipeDetail.index";


function UserRecipes(props) {
    const recipeId = props.name;
    //const prueba = 'soy una prueba';
    // console.log('props:', recipeId);

    //NO SE ESTA USANDO
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
            <div className="card">
                <img className="card__img" alt={recipe.title} src={recipe.img}/>

                <div className="card__info">
                    <h1 className="card__info-title">{recipe.title}</h1>
                    <Link to={`/detail/${recipeId}`}>
                        <button className="card__info-btn">Preparar</button>
                    </Link>
                </div>
            </div>
    );
}

export default UserRecipes;


