import React from "react";
import AddRecipe from "../Pages/AddRecipe/addRecipe.index";
import Login from '../Pages/Login/login.index'
import PageNotFound from '../Pages/NotFound/notFound.index'
import Register from "../Pages/Register/Register.index";

// Config/routes.js

const routes = [
    {
      path: "/",
      element: <Login />,
      isPrivate: false

    },

    {
      path: "/*",
      element: <PageNotFound />,
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
  ];

  export default routes;