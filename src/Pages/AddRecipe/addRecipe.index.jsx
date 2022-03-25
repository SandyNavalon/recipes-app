import React from "react";
import { saveRecipeService } from "../../Services/saveRecipeService";
import AddRecipe from "../../Components/AddRecipes/AddRecipesComponent";
import { addToExistingArray } from "../../Services/storage.service";

const addRecipe = () => {
  const handleSubmit = async (data) => {
    const newRecipe = await saveRecipeService(data);
    addToExistingArray('recipes', newRecipe);
  };

  return (
    <div>
      <h2>AÑADIR RECETA</h2>
      <AddRecipe handleSubmit={handleSubmit} />
    </div>
  );
};

export default addRecipe;
