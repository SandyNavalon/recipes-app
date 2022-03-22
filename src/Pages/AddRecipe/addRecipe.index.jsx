
import React from 'react'
import { saveRecipeService } from '../../Services/saveRecipeService'
import AddRecipe from '../../Components/AddRecipes/AddRecipesComponent'

const addRecipe = () => {

    const handleSubmit = (data) => {
        saveRecipeService(data)
        }

    return (
        <div>
            <h2>AÑADIR RECETA</h2>
            <AddRecipe handleSubmit= {handleSubmit}/>
        </div>
    )
}

export default addRecipe;
