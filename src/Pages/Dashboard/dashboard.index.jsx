import React, { useEffect } from "react";
import { useAuthState } from "../../Context/context.index";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import ingredients from "../../Components/AddRecipes/IngredientsList/ingredients";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import NavbarTwo from '../../Components/NavbarTwo/NavbarTwo';
import notFound from "../../assets/not-found.png";
import "./dashboard.scss";

//import '../general.scss'

function Dashboard(props) {
  // let navigate = useNavigate();
  // const dispatch = useAuthDispatch(); // lee el método dispatch del contexto
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
      //en la primera iteracion filtras sobre todas las recetas y esto
      //pasa a ser acc
      if (!index.length) {
        return user.recipes.filter((recipe) => recipe.ingredients.includes(curr));
        //si no es la primera iteracion filtras sobre acc.
        //y devuelves valores que pasarán a su vez a aser acc
      } else {
        return acc.filter((recipe) => recipe.ingredients.includes(curr));
      }
      //en array vacío mostrará el resultado final
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



  const deleteSelectedIngredients = (ingredients) => {
    const newIngredients = selectedIngredients.filter((i) => i !== ingredients);
    setSelectedIngredients(newIngredients);
    updateSearchFilter(newIngredients);
  };

  const renderSelected = () => {
    if (!selectedIngredients.length) return null;

    return (
      <>
        <div>
          <h4>LISTA INGREDIENTES</h4>
          <ul className="dashboard__recommender-list-select">
            {selectedIngredients.map((item) => (
              <li key={item}>
                <span onClick={() => deleteSelectedIngredients(item)}><FontAwesomeIcon icon={faXmark}/> </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  };

  const renderSuggestions = () => {
    if (!suggestions.length) return;

    return (
      <>
        <ul className="dashboard__recommender-list-sugg">
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
      const arrayFiltrado = recipes.filter(item => item._id !== id);
      setRecipes(arrayFiltrado)
      console.log(id)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    <NavbarTwo/>
    <div className="container">
      <div className="dashboard">
      <div className="dashboard__row1">
        <div className="dashboard__user">
          <h1>Hola,<br/> {user.user}</h1>
          <Link to="/dashboard/add-recipes"><button className="dashboard__user-btn">¿Nueva Receta?</button></Link>
        </div>

        <div className="dashboard__recommender">
          <h2>¿Qué tienes en la nevera?</h2>
          <input type="search" value={inputValue} onChange={onTextChanged} placeholder="Introduce ingredientes" className="dashboard__recommender-input"></input>
          <div>{renderSuggestions()}</div>
          <div>{renderSelected()}</div>
        </div>
      </div>

{/**LISTA DE RECETAS */}
        <div className="dashboard__recipeTitle">
          <h2>¿Qué tal algo de esto?</h2>
        </div>



      <div className="recipeCard">

        {/* Caso 3: Tenemos filtros de ingredientes y tenemos resultados */}
        {filterContent.length > 0 && filterResults.length &&
          filterResults.map((item) => (

            <div key={item._id} className="recipeCard__list">
              <Link to={`/detail/${item._id}`} state={{ recipe: item }} className="no-link" >
                <div className="recipeCard__list-item">
                  <div className="img">
                      <img alt={item.title} src={item.img} ></img>
                  </div>
                  <h4 className="no-link">{item.title}</h4>
                  <h4 className="no-link">ingredientes</h4>
                  {item.ingredients.map((item, index) => (
                    <p key={index.toString()} className="no-link">{item}</p>
                  ))}

                    <p className="no-link">Tipo: {item.type}</p>

                </div>
                </Link>
              </div>

          ))
        }

        {/* Caso 2: Tengo filtros, pero no hay resultados */}
        {filterContent.length > 0 && !filterResults.length &&
        <div className="dashboard__notFoundText">
        <img src={notFound} alt="not found image"/>
        <h4>No hay resultados</h4>
        <p>Prueba con otros ingredientes</p>
        </div>
        }


        {/* Caso 1: No tengo filtros, por lo tanto muestro todas las recetas */}
        {!filterContent.length  && recipes.map((item) => (
        <div key={item._id} className="recipeCard__list">

          <Link to={`/detail/${item._id}`} state={{ recipe: item }} className="no-link">
            <div className="recipeCard__list-item">

              <div className="img">
                  <img alt={item.title} src={item.img} width="300px"></img>
              </div>
              {/* <h3>ingredientes</h3>
              {item.ingredients.map((item, index) => (
                <p key={index.toString()}>{item}</p>
              ))} */}
                <h4>{item.title}</h4>
                <p>Tipo: {item.type}</p>
            </div>

          </Link>
          <button onClick={() => deleteRecipe(item._id)} className="recipeCard__delete" ><FontAwesomeIcon icon={faXmark}/></button>
        </div>
        ))}
      </div>

      </div>
    </div></>
  );
}

export default Dashboard;
