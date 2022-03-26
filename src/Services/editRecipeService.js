import axios from "axios";

//const ENDPOINT = "http://localhost:4000";

export async function editRecipeService(id, recipeData) {
  try {
    const {data} = await axios.put(
      `http://localhost:4000/recipes/edit/${id}`,
      {
          "title": recipeData.title,
          "type": recipeData.type,
          "category": recipeData.category,
          "ingredients": recipeData.ingredients,
          "description": recipeData.description,
          "img": recipeData.img,
      }
    );
    console.log('receta antes de editar', recipeData);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
/*
export async function editRecipeService(id, recipeData) {
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
    //formData.set("userId", recipeData.userId);

    console.log('receta antes de editar', recipeData);

    const response = await axios({
      url: `${ENDPOINT}/recipes/edit/${id}`,
      method: "PUT",
      data: formData,
      headers: {'Content-Type': 'multipart/form-data'},
    });

    return response.data;
  } catch (error) {
    console.log(error);
  }
}
*/
