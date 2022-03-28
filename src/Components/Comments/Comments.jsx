import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";

const Comments = ({urlId}) => {
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    const [userAndComment, setUserAndComment] = useState([]);

    //Hacemos llamada para acceder al nombre del usuario de dicho comentario
    useEffect(()=> {
        const getUserComment = async () => {
            const { data } = await Axios.get(
            `http://localhost:4000/user`
            );
            console.log('data user:',data)
            setUsers(data);
        }
        getUserComment();
    }, []);

    //Hacemos peticion para obtener todos los comentarios de la receta indicada
    useEffect(()=> {
        const getCommentsByRecipe = async () => {
          const { data } = await Axios.get(
            `http://localhost:4000/comments/recipes/${urlId}`
          );
          //console.log('data comments:',data)
          setComments(data);
        }
        getCommentsByRecipe();
    }, []);

 
    //console.log('useandcomments', userAndComment);
    return ( 
    <div>
        <h3>Comentarios: </h3>
        {
            comments.map((itemcm, indexcm)=>{
                return (<div key={indexcm}>
                    <p>{itemcm.content}</p>
                </div>
                )
            })

        }
    </div>
    )
}

export default Comments;