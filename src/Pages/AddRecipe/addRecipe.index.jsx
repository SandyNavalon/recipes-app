import React from 'react'
import { useAuthState } from '../../Context/contexts';
import { Navigate } from 'react-router-dom';
import ingredients from './ingredients';
import { useState } from 'react';



const AddRecipe = () => {

const submitForm = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
    }




const newIngredients = ['tomate'];
const [ingredientsList, setIngredientsList] = useState(newIngredients);

const handleInput = (ev) => {
  
    const { value } = ev.target;
  
    setIngredientsList(value );
console.log('ingredientsList',ingredientsList);

}


    const { user } = useAuthState();
    return (<>
  
        {user ?

            <div>
                <form>
                    <label>
                        <h2>Nombre Receta:</h2>
                    </label>
                <input id="title" name="title"  />


                <label htmlFor="user">Tipo</label>
                <select>
                <option> Desayuno </option>
                <option> Almuerzo </option>
                <option> Merienda </option>
                <option> Cena </option>
                </select>


                <label htmlFor="password">Categoría</label>
                <select>
                <option> Mediterranea </option>
                <option> Americana </option>
                <option> Asiática </option>
                <option> Turca </option>
                <option> Marroquí </option>
                <option> Italiana </option>
                <option> Sudamericana </option>
                <option> Griega </option>
                <option> Postre </option>
                <option> Repostería </option>
                <option> Batidos </option>
                <option> Vegana </option>
                <option> Healthy </option>
                <option> Vegetariano </option>
                <option> Sin gluten </option>
                </select>
              


                <label>Ingredientes</label>
                <input id="ingredients" name="newIngredient"  value={ingredientsList.newIngredient} onChange={handleInput}   />
                <p>{ingredientsList}</p>
               

                <button type="submit" onClick={() => newIngredients.push(ingredientsList)}>añadir</button>
            
                </form>

            </div>

            : <Navigate to="/" />
        }

    </>
    )
}

export default AddRecipe