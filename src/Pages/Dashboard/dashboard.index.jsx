import React, { useEffect } from "react";
import { useAuthState } from "../../Context/context.index";
import { Link } from "react-router-dom";
import { useState } from "react";
import ingredients from "../../Components/AddRecipes/IngredientsList/ingredients";
import "./dashboard.scss";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

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

      if (!index.length) {
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
          <h3>LISTA INGREDIENTES</h3>
          <ul>
            {selectedIngredients.map((item) => (
              <li key={item}>
                <span onClick={() => deleteSeletedIngredients(item)}><FontAwesomeIcon icon={faXmark}/> </span>
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
      const arrayFiltrado = recipes.filter(item => item._id !== id);
      setRecipes(arrayFiltrado)
      console.log(id)
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
        <div>
          <h2>¿Qué tal algo de ésto?</h2>
        </div>



      <div className="recipeCard">

        {/* Caso 3: Tenemos filtros de ingredientes y tenemos resultados */}
       {filterResults.length && filterContent.length &&
          filterResults.map((item) => (
            
            <div key={item._id} className="recipeCard__list">
              <Link to={`/detail/${item._id}`} state={{ recipe: item }} className="no-link" >
                <div className="recipeCard__list-item">
                  <div className="img">
                      <img alt={item.title} src={item.img} ></img>
                  </div>
                  <h3 className="no-link">{item.title}</h3>
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
        {filterContent.length && !filterResults.length && 
        <div><h4>No hay resultados</h4><p>Prueba con otros ingredientes</p></div>
        }


        {/* Caso 1: No tengo filtros, por lo tanto muestro todas las recetas */}
        {!filterContent.length && recipes.map((item) => (
        <div key={item._id} className="recipeCard__list">
          
          <Link to={`/detail/${item._id}`} state={{ recipe: item }} className="no-link">
            <div className="recipeCard__list-item">
              <button onClick={() => deleteRecipe(item._id)} ><FontAwesomeIcon icon={faXmark}/></button>
              <div className="img">
                  <img alt={item.title} src={item.img} width="300px"></img>
              </div>
              {/* <h3>ingredientes</h3>
              {item.ingredients.map((item, index) => (
                <p key={index.toString()}>{item}</p>
              ))} */}
                <h3>{item.title}</h3>
                <p>Tipo: {item.type}</p>
            </div>
          </Link>
        </div>
        ))}
      </div>

      </div>
    </div>
  );
}

export default Dashboard;
