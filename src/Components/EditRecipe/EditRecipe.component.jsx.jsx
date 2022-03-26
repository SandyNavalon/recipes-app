import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AutoCompleteText from "../EditRecipe/AutoCompleteText";
import { useAuthState } from "../../Context/contexts";
import RecipeDetail from "../../Pages/RecipeDetail/recipeDetail.index";
import axios, { Axios } from "axios";

const ROOT_URL_RECIPE = "http://localhost:4000/recipes/";

const EditRecipeComponent = (handleSubmit) => {
  let navigate = useNavigate();

  const user = useAuthState();

  const url = window.location.href;
  const urlId = url.slice(-24);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [recipe, setRecipe] = useState({
    id: "",
    title: "",
    type: "",
    category: "",
    ingredients: [],
    description: "",
    img: "",
    userId: user.id
  });

      const [edit, setEdit] = useState({
        title: recipe.title,
        type: recipe.type,
        category: recipe.category,
        ingredients: recipe.ingredients,
        img: recipe.img,
        description: recipe.description,
        userId: recipe.userId,
      });

      useEffect(() => {
        axios(`http://localhost:4000/recipes/${urlId}`)
          .then(res => {
            setEdit({

              id: res.data.id,
              title: res.data.title,
              type: res.data.type,
              category: res.data.category,
              ingredients: res.data.ingredients,
              description: res.data.description,
              img: res.data.img,
              userId:res.data.id
            });
          },

          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])

    const handleInput = (ev) => {
      const { name, value } = ev.target;
      setEdit({ ...edit, [name]: value });
    };

    const [preview, setPreview] = useState(null);

    //subida imagen
    const handleFileInput = (ev) => {
      const reader = new FileReader();
      let file = ev.target.files[0];

      reader.onloadend = (ev) => {
        setPreview(ev.target.result);
        setEdit({ ...edit, img: file });
      };

      reader.readAsDataURL(file);
    }

    const submit = (ev) => {
      ev.preventDefault(); //prevenir comportamiento nativo navegador
      handleSubmit({ ...edit });

      navigate("/dashboard"); //redirige a dashboard cuando posteas la receta
      console.log(edit);
    };

  return (
  //   <>
  //     {user ? (
  //       <div>
  //         <form onClick={submit}>
  //               <label>Título</label>
  //               <input type="text" name="title" defaultValue={edit.title} onChange={handleInput}/>

  //               <label>Categoría</label>
  //               <input defaultValue={edit.category} onChange={handleInput} ></input>

  //               <label>Tipo</label>
  //               <input defaultValue={edit.type} onChange={handleInput}  ></input>

  //               <label>Ingredientes</label>
  //               <input defaultValue={edit.ingredients} onChange={handleInput}></input>


  //               <label>Preparación</label>
  //               <textarea name="description" defaultValue={edit.description} onChange={handleInput}></textarea>

  //             <input type="file" name="img"  defaultValue={edit.img} onChange={handleInput}/>

  //             <img alt="product" width="200px" src ={ROOT_URL_RECIPE+edit.img} />

  //             <button type="submit">Guardar cambios</button>
  //         </form>
  //       </div>
  //     ) : (
  //       <Navigate to="/" />
  //     )}
  //   </>
  // );
    <>
      {user ? (
        <div>
          <form onSubmit={submit} encType="multipart/form-data">
            <fieldset>
                <label>Título</label>
                <input type="text" name="title" defaultValue={edit.title} onChange={handleInput} />
              </fieldset>

              <fieldset>
                <label>Categoría</label>
                <select name="category" defaultValue={edit.category} onChange={handleInput}>
                  <option value="" defaultValue={edit.category}>
                  {edit.category}
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
                <select name="type" defaultValue={edit.type} onChange={handleInput}>
                  <option value="" defaultValue=''>
                  {edit.type}
                  </option>
                  <option value="italiana">Italiana</option>
                  <option value="mediterranea">Mediterránea</option>
                  <option value="oriental">Oriental</option>
                </select>
              </fieldset>

              <fieldset>
                {/* <label>Ingredientes</label>
                <input defaultValue={edit.ingredients}></input> */}
                <AutoCompleteText />
              </fieldset>

              <fieldset>
                <label>Preparación</label>
                <textarea name="description" defaultValue={edit.description} onChange={handleInput}></textarea>
              <fieldset/>

              <input type="file" name="img" onChange={handleFileInput}></input>

              {/* {preview ? <img src={edit.img}} alt="product" width="200px"/> : null} */}

              <button type="submit">Editar receta</button>
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
