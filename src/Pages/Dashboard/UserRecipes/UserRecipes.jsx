
import { useState, useEffect } from "react";
import Axios from 'axios';
import { Link } from "react-router-dom";


function UserRecipes(props) {
    const recipe = props.name;
    console.log('recipe ', recipe._id);

    return (
        <div >
            <div>
                <div>
                    <h1>{recipe.title}</h1>
                    <h3>ingredientes</h3>
                    {recipe.ingredients.map((item, index)=>
                    <p key={index.toString()}>{item}</p>
                    )}
                    <p>{recipe.ingredients}</p>
                    <img alt={recipe.title} src={recipe.img} width="300px"></img>
                    <Link to={`/detail/${recipe._id}`}><button>view detail</button></Link>
                </div>
            </div>
        </div>
    );
} 


export default UserRecipes;


