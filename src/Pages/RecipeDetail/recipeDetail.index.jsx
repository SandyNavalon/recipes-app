import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { useAuthState } from "../../Context/contexts";
import { postCommentService } from "../../Services/postCommentService";

import "./recipeDetail.scss";

const RecipeDetail = () => {
  const location = useLocation();

  //securizamos ruta usando user
  const { user, id } = useAuthState();
  const urlId = location.pathname.split("/")[2];
  //const [error, setError] = useState(null);
  //const [isLoaded, setIsLoaded] = useState(false);
  const [comment, setComment] = useState("");
  const [users, setUsers] = useState([]);
  const [listComments, setListComments] = useState([]);

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

  useEffect(()=> {
    const getUserData = async (id) => {
      const { data } = await Axios.get(
        `http://localhost:4000/user/${id}`
      );
      setUsers(data);
    }
    getUserData(id);
  }, []);

  const handleComment = async (ev) =>{
    ev.preventDefault();
    setListComments([...listComments, comment])
    await postCommentService(comment, urlId, id)
    ev.target.reset();
    setComment('')
  }

  return (
    <div className="details">
      <div className="details__top">
        <h1 className="details__top-title">{recipe.title}</h1>
        <img alt={recipe.title} src={recipe.img} className="details__top-img" />
        <h2 className="details__top-type">Tipo: {recipe.type}</h2>
      </div>

      <div className="details__ingredients">
        <h3 className="details__ingredients-title">Ingredientes:</h3>
        <ul className="details__ingredients-list">
          {recipe.ingredients.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </ul>
      </div>

      <div className="details__category">
        <h3 className="details__category-title">Categoría:</h3>
        <p className="details__category-text">{recipe.category}</p>
      </div>

      <div className="details__description">
        <h3 className="details__description-title">Preparación:</h3>
        <p className="details__description-text">{recipe.description}</p>
      </div>

      <div className="details__btns">
        <button className="details__btns-back">
          <Link to="/dashboard/">Volver</Link>
        </button>

        {user ? (
          <Link to={`/detail/edit/${recipe._id}`} state={{ recipe }}>
            <button className="details__btns-edit">Editar</button>
          </Link>
        ) : null}
      </div>
      <div className="details__comments">
        {user ? (
          <form onSubmit={handleComment}>
            <input type="text" placeholder="Agrega un comentario" onChange={ (ev) => setComment(ev.target.value) } />
            <button type="submit">Subir</button>
          </form>
        ) : null}
      </div>
      {listComments.map((item, index)=>{
        return(<div key={index}>
          <p> {user} {item}</p>
        </div>

        )
      })
        
      }
    </div>
  );
};

export default RecipeDetail;