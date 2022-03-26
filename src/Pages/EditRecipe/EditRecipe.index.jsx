import React from 'react'
import EditRecipeComponent from '../../Components/EditRecipe/EditRecipe.component.jsx';
import { useAuthDispatch } from '../../Context/contexts.js';
import { editRecipeService } from '../../Services/editRecipeService.js';
import { addToExistingArrayNested } from '../../Services/storage.service.js';

const EditRecipe = () => {

        const dispatch = useAuthDispatch();

    const handleSubmit = async (data) => {
        const newRecipe = await editRecipeService(data);
        dispatch({type: 'EDIT_RECIPE', payload: newRecipe});
        addToExistingArrayNested('currentUser','recipes', newRecipe);
    };

    return (
        <div>
        <h2>Editar Receta</h2>
        <EditRecipeComponent handleSubmit={handleSubmit} />
        </div>
    );
};

export default EditRecipe