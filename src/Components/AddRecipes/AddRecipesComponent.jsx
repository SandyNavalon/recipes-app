import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AutoCompleteText from "./IngredientsList/AutoCompleteText";
import { useAuthState } from "../../Context/contexts";

import "../AddRecipes/AddRecipesComponent.scss";

const AddRecipe = ({ handleSubmit }) => {
  let navigate = useNavigate();

  const user = useAuthState();

  // const { ingredients } = AutoCompleteText;

  console.log(user.id);

  const [formState, setFormState] = useState({
    title: "",
    type: "",
    category: "",
    ingredients: [],
    img: null,
    description: "",
    userId: user.id,
  });

  const [preview, setPreview] = useState(null);


  const changeIngredients = (ingredients) => {
    setFormState({ ...formState, ingredients });
  };

  //handleChange
  const handleInput = (ev) => {
    const { name, value } = ev.target;
    setFormState({ ...formState, [name]: value });
  };

  //subida imagen
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

    navigate("/dashboard"); //redirige a dashboard cuando posteas la receta
    console.log(formState);
  };

  return (
    <>
      {user ? (
        <div className="container">
          <form className="form-style" autoComplete="off" onSubmit={submitForm} encType="multipart/form-data">
            <fieldset>
                <label>Título</label>
                <input type="text" name="title" value={formState.title} onChange={handleInput} />
            </fieldset>

              <fieldset>
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
              </fieldset>
              <fieldset>
                <label>Tipo</label>
                <select name="type" value={formState.type} onChange={handleInput}>
                  <option value="" defaultValue={""}>
                    Selecciona una opción
                  </option>
                  <option value="italiana">Italiana</option>
                  <option value="mediterranea">Mediterránea</option>
                  <option value="Japonesa">Japonesa</option>
                  <option value="Americana">Americana</option>
                  <option value="Postre">Postres</option>
                  <option value="Vegana">Vegana</option>
                  <option value="China">China</option>
                  <option value="Turca">Turca</option>
                  <option value="Sudamericana">Sudamericana</option>
                  <option value="Otros">Otros</option>
                </select>
              </fieldset>

              <fieldset>
                <label>Ingredientes</label>
                <AutoCompleteText changeIngredients={changeIngredients} />
              </fieldset>

              <fieldset>
                <label>Preparación</label>
                <textarea name="description" value={formState.description} onChange={handleInput}/>
              </fieldset>

              <fieldset>
                <input type="file" name="img" onChange={handleFileInput}/>

                {preview ? <img src={preview} alt="product" width="200px"/> : null}
              </fieldset>

              <button type="submit">Guardar receta</button>

          </form>
        </div>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default AddRecipe;
