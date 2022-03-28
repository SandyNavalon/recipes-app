import axios from "axios";

export async function postCommentService(comment, reciId, usId) {
    console.log("comment: ", comment, " recipe: ", reciId, " user: ", usId)
    try {
      const {data} = await axios.post(
        `http://localhost:4000/comments/create`,
        {
            content: comment,
            recipeId: reciId,
            userId: usId,
        }
      );

      //console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
};