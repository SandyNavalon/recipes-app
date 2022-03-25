import React, { useEffect } from "react";
import { useAuthDispatch, logoutUser, useAuthState } from "../../Context/context.index";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ingredients from "../../Components/AddRecipes/IngredientsList/ingredients";
import "./dashboard.scss";
//import '../general.scss'

function Dashboard(props) {
  let navigate = useNavigate();
  const dispatch = useAuthDispatch(); // lee el método dispatch del contexto
  const user = useAuthState(); //lee los detalles del usuario del contexto

  const [recipes, setRecipes] = useState([]);
  // es el valor del input

  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [filterResults, setFilterResults] = useState([]);
  const [filterContent, setFilterContent] = useState([]);

  useEffect(() => {
    console.log("update user recipes", user.recipes);
    setRecipes(user.recipes);
  }, [user]);

  const onTextChanged = (ev) => {
    const { value } = ev.target;

    if (value.length) {
      const regex = new RegExp(`^${value}`, "i");
      const filter = ingredients.sort().filter((v) => regex.test(v));
      setSuggestions(filter);
    } else {
      setSuggestions([]);
    }

    setInputValue(value);
  };

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

  const suggestionSelected = (value) => {
    if (selectedIngredients.find((ingredient) => ingredient === value)) return;

    const newIngredients = [...selectedIngredients, value];
    updateSearchFilter(newIngredients);
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
                <span onClick={() => deleteSeletedIngredients(item)}>XX</span>
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
            <li key={index} onClick={() => suggestionSelected(item)}>
              {item}
            </li>
          ))}
        </ul>
      </>
    );
  };

  const handleLogout = () => {
    logoutUser(dispatch); //llama a la acción logout
    navigate("/"); //navega de nuevo al login sin usuario
  };

  return (
    <div style={{ padding: 10 }}>
      <div>
        <h1>Dashboard</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <p>Welcome {user.user}</p>
      <p>Tu email es {user.email}</p>

      {/** filtro */}
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
            <hr></hr>
          </div>
        ))}
      </div>

      <div></div>
    </div>
  );
}

export default Dashboard;
