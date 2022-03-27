import React from "react";
import { saveRecipeService } from "../../Services/saveRecipeService";
import AddRecipeComponent from "../../Components/AddRecipes/AddRecipesComponent";
import { useAuthDispatch } from "../../Context/context.index";
import { addToExistingArrayNested } from "../../Services/storage.service";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";

const AddRecipe = () => {
  const dispatch = useAuthDispatch();

  const handleSubmit = async (data) => {
    const newRecipe = await saveRecipeService(data);
    dispatch({type: 'ADD_RECIPE', payload: newRecipe});
    addToExistingArrayNested('currentUser','recipes', newRecipe);
  };

  return (
    <>
      <NavbarTwo/>
      <div className="container">
        <h1>Añade una receta</h1>
        <AddRecipeComponent handleSubmit={handleSubmit} />
      </div>
    </>
  );
};

export default AddRecipe;
