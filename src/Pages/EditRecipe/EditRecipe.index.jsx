import { useEffect, useState } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { editRecipeService } from "../../Services/editRecipeService";
import EditRecipeComponent from "../../Components/EditRecipes/EditRecipesComponent";
import { useAuthDispatch } from "../../Context/context.index";
import { addToExistingArrayNested } from "../../Services/storage.service";

const EditRecipe = () => {
  const dispatch = useAuthDispatch();
  const location = useLocation();

  const recipeId = location.pathname.split("/")[3];

  const [recipe, setRecipe] = useState({
    title: "",
    type: "",
    category: "",
    ingredients: [],
    description: "",
    img: "",
  });

  useEffect(() => {
    console.log("location EditRecipe", location);
    if (location.state?.recipe) {
      setRecipe({...location.state.recipe});
    } else {
      axios(`http://localhost:4000/recipes/${recipeId}`).then(
        (res) => {
          setRecipe({...res});
        },
        (error) => {
          // setIsLoaded(true);
          // setError(error);
        }
      );
    }
  }, []);
  
  const handleSubmit = async (data) => {
    const modifyRecipe = await editRecipeService(recipeId, data);
    dispatch({type: 'EDIT_RECIPE', payload: modifyRecipe});
    addToExistingArrayNested('currentUser','recipes', modifyRecipe);
  };

  return (
    <div>
      <h2>EDITAR RECETA</h2>
      <EditRecipeComponent handleSubmit={handleSubmit} recipe={recipe} />
    </div>
  );
};

export default EditRecipe;
