
import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useAuthState } from "../../Context/contexts";

import Rating from "../../Components/Rating/Rating";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import "./recipeDetail.scss";

const RecipeDetail = () => {
  const location = useLocation();

  //securizamos ruta usando user
  const { user } = useAuthState();

  //const [error, setError] = useState(null);
  //const [isLoaded, setIsLoaded] = useState(false);
  const [comment, setComment] = useState("");

  const [recipe, setRecipe] = useState({
    title: "",
    type: "",
    category: "",
    ingredients: [],
    description: "",
    img: "",
    comments: []
  });

  useEffect(() => {
    console.log("location recipeDetail", location);

    if (location.state?.recipe) {
      setRecipe({...location.state.recipe});

    } else {
      const urlId = location.pathname.split("/")[2];
      Axios(`http://localhost:4000/recipes/${urlId}`).then(
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

  const handleComment = (ev) =>{
    ev.preventDefault();
  }

  return (
    <div className="container">
      <div className="box">
        <div className="details">
          <div className="details__img">
            <img alt={recipe.title} src={recipe.img} className="details__top-img" width='300px'/>
            <Rating/>
          </div>
          <div className="details__info">
            <h1 className="details__info-title">{recipe.title}</h1>
            <h4 className="details__info-type">Tipo: {recipe.type}</h4>
            <h4 className="details__info-category">Categoría: {recipe.category}</h4>
            <div className="details__info-ing">
              <h4 className="details__info-ing-title">Ingredientes:</h4>
              <ul className="details__info-ing-list">
                {recipe.ingredients.map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="details__description">
          <h3 className="details__description-title">Preparación</h3>
          <p className="details__description-text">{recipe.description}</p>
        </div>

        <div className="details__btns">
          <button className="details__btns-back">
            <Link to="/dashboard/"><FontAwesomeIcon className="icon" icon={faAngleLeft} /></Link>
          </button>


          {/* {user ? (
            <Link to={`/detail/edit/${recipe._id}`} state={{ recipe }}>
              <button className="details__btns-edit">Editar</button>
            </Link>
          ) : null} */}
        </div>

        <div>
          {user ? (
            <form onSubmit={handleComment} className="details__comments">
              <input type="text" placeholder="Deja tu comentario" onChange={ (ev) => setComment(ev.target.value) } />
              <button type="submit">Enviar</button>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
