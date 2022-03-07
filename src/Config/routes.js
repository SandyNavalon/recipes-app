import React from "react";
import Login from '../Pages/Login/login.index'
import Dashboard from '../Pages/Dashboard/dashboard.index'
import PageNotFound from '../Pages/NotFound/notFound.index'

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
  ];
  
  export default routes;