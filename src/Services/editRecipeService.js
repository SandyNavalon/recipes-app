import axios from "axios";

const ENDPOINT = "http://localhost:4000";

export async function editRecipeService(recipeData) {
  try {
    // console.log(recipeData);
    const formData = new FormData();
    //crear instancia enviar valores el form
    formData.append("title", recipeData.title);
    formData.append("type", recipeData.type);
    formData.append("category", recipeData.category);
    formData.append("ingredients", recipeData.ingredients);
    formData.append("description", recipeData.description);
    formData.append("img", recipeData.img);
    formData.append("userId", recipeData.userId);

    const response = await axios.patch({
      url: `${ENDPOINT}/recipes/:id`,
      method: "POST",
      data: formData,
      headers: {},
    });

    return response.data;
  } catch (error) {
    // console.log(error);
  }
}
