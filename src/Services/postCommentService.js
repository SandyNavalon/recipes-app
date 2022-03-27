import axios from "axios";
//const ENDPOINT = "http://localhost:4000";

export async function postCommentService(comment, reciId, usId) {
  try {
    const {data} = await axios.post(
      "http://localhost:4000/comments/create",
        {
          content: comment,
          recipeId: reciId,
          userId: usId,
        },
    );
    console.log('comment para enviar', data);
    //console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

/*
export async function postCommentService(comment, reciId, usId) {
    console.log("comentario:", comment, "recipe:", reciId," usuario:", usId)
    try {
        // console.log(recipeData);
        const formData = new FormData();
        formData.append("content", comment);
        formData.append("recipeId", reciId);
        formData.append("userId", usId);

        const response = await axios({
            url: `${ENDPOINT}/comments/create`,
            method: "POST",
            data: formData,
            headers: {'Content-Type': 'multipart/form-data'},
        });

        return response.data;
    } catch (error) {
        console.log(error);
    }
}
*/