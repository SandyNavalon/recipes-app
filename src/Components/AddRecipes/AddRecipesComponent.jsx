import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AutoCompleteText from "./IngredientsList/AutoCompleteText";
import { useAuthState } from "../../Context/contexts";

import "../../Pages/AddRecipe/addRecipe.scss";
import { getItem } from "../../Services/storage.service";

const AddRecipe = ({ handleSubmit }) => {
  // const {user, _id} = useAuthState();
  let navigate = useNavigate();

  const { user } = useAuthState();

  const { ingredients } = AutoCompleteText;

  // console.log('current', userParsed._id);

  const [formState, setFormState] = useState({
    title: "",
    type: "",
    category: "",
    ingredients: [],
    img: "",
    description: "",
    userId: user._id,
  });

  // console.log(formState);

  // const [ingredientChoosen, setIngredientChoosen] = useState()

  const changeIngredients = (ingredients) => {
    setFormState({ ...formState, ingredients });
  };

  //handleChange
  const handleInput = (ev) => {
    const { name, value } = ev.target;
    setFormState({ ...formState, [name]: value });
  };

  const submitForm = (ev) => {
    ev.preventDefault(); //prevenir comportamiento nativo navegador
    handleSubmit({ ...formState, userId: user._id });

    navigate("/dashboard"); //redirige a dashboard cuando posteas la receta
    console.log(formState);
    console.log("ingredientessssss:", ingredients);

    // const { title, type, category, ingredients, description } = formState;

    // if(!title || !type || !category || !ingredients || !description) {
    //     console.log('Faltan datos');
    //     return;
    // }
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

              <input type="file" name="img" onChange={handleInput}></input>

              <button type="submit">Guardar receta</button>
            </fieldset>
          </form>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default AddRecipe;
