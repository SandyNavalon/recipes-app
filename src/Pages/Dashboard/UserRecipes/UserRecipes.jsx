
<<<<<<< HEAD
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
=======
//import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./userRecipes.scss";


function UserRecipes(props) {
    //console.log('prop:', props);
    //extraigo del prop el array de recetas del user
    const recipes = props.name[0];
    console.log('recipes:', recipes);

    const ingredientsRecipe = recipes.map(item => item.ingredients);
    //console.log('recipeIngredients', ingredientsRecipe);

    //extraigo del prop el array de ingredientes del form
    const ingredientsForm = props.name[1];
    //console.log('ingredientsForm', ingredientsForm);
    //console.log('ingredientsArray', ingredientsArray);

    ingredientsRecipe.map((arrayIngredient)=>
           {
               if(arrayIngredient.includes('sal')){
                 console.log('matchitem', arrayIngredient)
           }
        }
        )


    if (!ingredientsForm.length) {
        return <>
            {
                recipes.map((item) =>
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

            } </>

    } else {
        return <>
            {

                recipes.map((item) =>
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

>>>>>>> jesusc-recommender
}








export default UserRecipes;
