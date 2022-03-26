import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AutoCompleteText from "../AddRecipes/IngredientsList/AutoCompleteText";
import { useAuthState } from "../../Context/contexts";
//import "../../Pages/AddRecipe/AddRecipe.scss";

const EditRecipeComponent = ({ handleSubmit, recipe }) => {
  let navigate = useNavigate();

  const user = useAuthState();

  const { ingredients } = AutoCompleteText;

  // console.log('current', userParsed._id);

  console.log(user.id);

  const [formState, setFormState] = useState(recipe);

  const [preview, setPreview] = useState(null);

  const changeIngredients = (ingredients) => {
    setFormState({ ...formState, ingredients });
  };

  //handleChange
  const handleInput = (ev) => {
    const { name, value } = ev.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFileInput = (ev) => {
    const reader = new FileReader();
    let file = ev.target.files[0];

    reader.onloadend = (ev) => {
      setPreview(ev.target.result);
      setFormState({ ...formState, img: file });
    };

    reader.readAsDataURL(file);
  }

  const submitForm = (ev) => {
    ev.preventDefault(); //prevenir comportamiento nativo navegador
    handleSubmit({ ...formState });
    console.log(formState);
    console.log("ingredientessssss:", ingredients);
  };

  return (
    <>
      {user ? (
        <div>
          <form autoComplete="off" onSubmit={submitForm} encType="multipart/form-data">
            <fieldset className="form-style">
              <label>Título</label>
              <input type="text" name="title" value={formState.title} onChange={handleInput}></input>

              <label>Categoría</label>
              <select name="category" value={formState.category} onChange={handleInput}>
                <option value="" defaultValue={""}>
                  Selecciona una opción
                </option>
                <option value="desayuno">Desayuno</option>
                <option value="almuerzo">Almuerzo</option>
                <option value="merienda">Merienda</option>
                <option value="cena">Cena</option>
                <option value="otros">Otros</option>
              </select>

              <label>Tipo</label>
              <select name="type" value={formState.type} onChange={handleInput}>
                <option value="" defaultValue={""}>
                  Selecciona una opción
                </option>
                <option value="italiana">Italiana</option>
                <option value="mediterranea">Mediterránea</option>
                <option value="oriental">Oriental</option>
              </select>

              <label>Ingredientes</label>
              <AutoCompleteText changeIngredients={changeIngredients} />

              <label>Preparación</label>
              <textarea name="description" value={formState.description} onChange={handleInput}></textarea>

              <input type="file" name="img" onChange={handleFileInput}></input>

              {recipe.img ? <img src={recipe.img} alt="product" width="200px"/> : null}

              <button type="submit">Actualizar receta</button>
            </fieldset>
          </form>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default EditRecipeComponent;