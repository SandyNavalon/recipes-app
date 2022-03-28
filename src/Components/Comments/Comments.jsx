import React from "react";
import { useEffect, useState } from "react";
import Axios from "axios";
import './Comments.scss'

const Comments = ({urlId}) => {
    const [comments, setComments] = useState([]);
    const [users, setUsers] = useState([]);
    

    const usuarios = [];
    const getUserComment = async (data) => {
        for (const com of data) {
            const { data } = await Axios.get(
                `http://localhost:4000/user/${com.userId}`
            ); 
            usuarios.push(data)
            
        }  
        setUsers(usuarios) 
    }
    useEffect(()=> {
        const getCommentsByRecipe = async () => {
          const { data } = await Axios.get(
            `http://localhost:4000/comments/recipes/${urlId}`
          );
            setComments(data)
            getUserComment(data)
        }
        getCommentsByRecipe();
        
    }, []);

 
    //console.log('useandcomments', userAndComment);
    return ( 
    <div className="comments">
        <h3>Comentarios: </h3>
        {(users.length>0 && comments.length>0) &&
            comments.map((itemcm, indexcm)=>{
                return (<div key={indexcm}>
                    <p>{users[indexcm].user} : {itemcm.content} </p>
                </div>
                )
            })
        }
    </div>
    )
}

export default Comments;