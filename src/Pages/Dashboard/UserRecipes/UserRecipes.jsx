
import { useState, useEffect } from "react";
import Axios from 'axios';

function UserRecipes(props) {
    const recipeId = props.name;
    console.log('props:',recipeId);

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [recipe, setRecipe] = useState({
        title: "",
        type: "",
        category: "",
        ingredients: [],
        description: "",
        img: ""
    });


    useEffect(() => {
        Axios(`http://localhost:4000/recipes/${recipeId}`)
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
        <div >
            <div >
                

                <div >

                    <h1>{recipe.title}</h1>
                    <h2>type: {recipe.type}</h2>
                    <p>category: {recipe.category}</p>
                    <ul>ingredients: {recipe.ingredients.map((item, index) => {
                        return (<li key={index}>{item}</li>)
                    })}</ul>
                    <p>{recipe.description}</p>
                    <img alt={recipe.title} src={recipe.img} width="300px"></img>


                </div>

            </div>
        </div>
    );
}

export default UserRecipes;


