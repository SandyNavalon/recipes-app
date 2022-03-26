import axios from "axios";

const ENDPOINT = "http://localhost:4000";

export async function editRecipeService(id, recipeData) {
  try {
    // console.log(recipeData);
    const formData = new FormData();
    //crear instancia enviar valores el form
    formData.set("title", recipeData.title);
    formData.set("type", recipeData.type);
    formData.set("category", recipeData.category);
    formData.set("ingredients", recipeData.ingredients);
    formData.set("description", recipeData.description);
    formData.set("img", recipeData.img);
    //formData.set("userId", recipeData.userId);

    console.log('receta antes de editar', recipeData);

    const response = await axios({
      url: `${ENDPOINT}/recipes/${id}`,
      method: "PATCH",
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
