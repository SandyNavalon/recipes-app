import React, { useEffect } from "react";
import { useAuthDispatch, logoutUser, useAuthState } from "../../Context/context.index";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ingredients from "../../Components/AddRecipes/IngredientsList/ingredients";
import "./dashboard.scss";
import axios from "axios";
//import '../general.scss'

function Dashboard(props) {
  let navigate = useNavigate();
  const dispatch = useAuthDispatch(); // lee el método dispatch del contexto
  const user = useAuthState(); //lee los detalles del usuario del contexto

  const [recipes, setRecipes] = useState([]);


  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [filterResults, setFilterResults] = useState([]);
  const [filterContent, setFilterContent] = useState([]);

  //de entrada te saca las recetas
  useEffect(() => {
    console.log("update user recipes", user.recipes);
    setRecipes(user.recipes);
  }, [user]);

// te recoge los cambios del input de filtro y te extrae value
  const onTextChanged = (ev) => {
    const { value } = ev.target;

    //si el value tiene contenido..
    if (value.length) {
      const regex = new RegExp(`^${value}`, "i");
      const filter = ingredients.sort().filter((v) => regex.test(v));
      //añademe ese contenido a sugerencias
      setSuggestions(filter);
    } else {
      //si no, sugerencias permanece vacío
      setSuggestions([]);
    }
  //despues seteame InputValue con el contenido
    setInputValue(value);
  };

  //no me entero de nada aquí ....
  //SUPUESTAMENTE ACTUALIZA EL FILTRO DE BUSQUEDA. le entran los ingredientes del array + value.(linea 75)
  const updateSearchFilter = (arrayOfIngredients) => {

    const results = arrayOfIngredients.reduce((acc, curr, index) => {
      if (index === 0) {
        return user.recipes.filter((recipe) => recipe.ingredients.includes(curr));
      } else {
        return acc.filter((recipe) => recipe.ingredients.includes(curr));
      }
    }, []);
    setFilterContent(arrayOfIngredients);
    setFilterResults(results)
    console.log(results);
  };



/// ESTA FUNCIÓN ES LA QUE ENCUENTRA EL INGREDIENTE DEL VALUE EN UN ARRAY DE INGREDIENTES PREVIO
  const suggestionSelected = (value) => {
    //1. si encuentra un ingrediente en el selected ingredients que sea igual a value, lo retorna
    if (selectedIngredients.find((ingredient) => ingredient === value)) return;

    //2. guarda en la constante newIngredients el array de ingredientes + el nuevo de value
    const newIngredients = [...selectedIngredients, value];
    //3. y con esta variable actualiza selected ingredients y le pasa este array de ingredientes a
    //la función updateSearchFilter que es la funcion que no sabes bien qué hace
    updateSearchFilter(newIngredients);
    //4. también actualizas selectedIngredients, claro. 
    setSelectedIngredients(newIngredients);
    setSuggestions([]);
    setInputValue("");
  };



  const deleteSeletedIngredients = (ingredients) => {
    const newIngredients = selectedIngredients.filter((i) => i !== ingredients);
    setSelectedIngredients(newIngredients);
    updateSearchFilter(newIngredients);
  };

  const renderSelected = () => {
    if (!selectedIngredients.length) return null;

    return (
      <>
        <div>
          <h2>LISTA INGREDIENTES</h2>
          <ul>
            {selectedIngredients.map((item) => (
              <li key={item}>
                <span onClick={() => deleteSeletedIngredients(item)}>X </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  };

  const renderSuggestions = () => {
    if (!suggestions.length) return null;

    return (
      <>
        <ul>
          {suggestions.map((item, index) => (
            //al hacer click disparas la funcion de sugerencia seleccionada
            //que envia item que es un array de sugerencias 
            <li key={index} onClick={() => suggestionSelected(item)}>
              {item}
            </li>
          ))}
        </ul>
      </>
    );
  };
  
  const deleteRecipe = async (id) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/recipes/${id}`
      );
      console.log(data);
      const arrayFiltrado = recipes.filter(item=>item._id !== id);
      setRecipes(arrayFiltrado)
      console.log(id)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: 10 }}>
      <div>
        <h1>Dashboard</h1>
      </div>
      <p>Welcome {user.user}</p>
      <div>
        <p>Filtrito</p>

        <input type="search" value={inputValue} onChange={onTextChanged} placeholder="Filtrito"></input>
        <div>{renderSuggestions()}</div>
        <div>{renderSelected()}</div>
      </div>

      <div>
        <hr></hr>
        <div className="recipebtns">
          <h1>Recetas</h1>
          <Link to="/dashboard/add-recipes">añadir receta</Link>
        </div>
        {filterResults.length > 0 && filterContent.length > 0 ?
          filterResults.map((item) => (
            <div key={item._id} className="recipeList">
              <h1>{item.title}</h1>
              <h3>ingredientes</h3>
              {item.ingredients.map((item, index) => (
                <p key={index.toString()}>{item}</p>
              ))}
              <p>
                <img alt={item.title} src={item.img} width="300px"></img>
              </p>
              <Link to={`/detail/${item._id}`}>
                <button>view detail</button>
              </Link>
                {/*<button>delete recipe</button>*/}
              <hr></hr>
            </div>
          ))
        :null}

        {filterContent.length && !filterResults.length ? <div>No hay resultados, ponte a dieta mamón</div> : null}


        {!filterContent.length && recipes.map((item) => (
          <div key={item._id}>
            <h1>{item.title}</h1>
            <h3>ingredientes</h3>
            {item.ingredients.map((item, index) => (
              <p key={index.toString()}>{item}</p>
            ))}
            <p>
              <img alt={item.title} src={item.img} width="300px"></img>
            </p>
            <Link to={`/detail/${item._id}`}>
              <button>view detail</button>
            </Link>
              <button onClick={() => deleteRecipe(item._id)}>delete recipe</button>
            <hr></hr>
          </div>
        ))}
      </div>

      <div></div>
    </div>
  );
}

export default Dashboard;