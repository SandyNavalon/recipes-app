import React from "react";
import { editRecipeService } from "../../Services/editRecipeService";
import EditRecipeComponent from "../../Components/EditRecipes/EditRecipesComponent";
import { useAuthDispatch } from "../../Context/context.index";
import { addToExistingArrayNested } from "../../Services/storage.service";

const EditRecipe = () => {
  const dispatch = useAuthDispatch();
  
  const handleSubmit = async (data) => {
    const modifyRecipe = await editRecipeService(data);
    dispatch({type: 'EDIT_RECIPE', payload: modifyRecipe});
    addToExistingArrayNested('currentUser','recipes', modifyRecipe);
  };

  return (
    <div>
      <h2>EDITAR RECETA</h2>
      <EditRecipeComponent handleSubmit={handleSubmit} />
    </div>
  );
};

export default EditRecipe;
