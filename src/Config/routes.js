import React from "react";

import AddRecipe from "../Pages/AddRecipe/addRecipe.index";
import Login from '../Pages/Login/login.index'
import PageNotFound from '../Pages/NotFound/notFound.index'
import RecipeDetail from "../Pages/RecipeDetail/recipeDetail.index";
import Register from "../Pages/Register/Register.index";
import Home from "../Pages/Home/Home.index";

// Config/routes.js

const routes = [
    {
      path: "/*",
      element: <PageNotFound />,
      isPrivate: false

    },
    {
      path: "/",
      element: <Home />,
      isPrivate: false

    },
    {
      path: "/login",
      element: <Login />,
      isPrivate: false

    },
    {
      path:"/register",
      element: <Register/>,
      isPrivate: false
    },

    {
      path:"/dashboard/add-recipes",
      element: <AddRecipe/>,
      isPrivate: false
    },
    {
      path:"/detail/:id",
      element: <RecipeDetail/>,
      isPrivate: false
    },

];

  export default routes;