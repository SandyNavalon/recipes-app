// Context/reducer.js

import React, { useReducer } from "react";

//
let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : "";
console.log('user:', user);

  let email = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).email
  : "";

  console.log('email:', email);

  let recipes = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).recipes
  : "";

  console.log('recipes:', recipes);

let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).auth_token
  : "";

  console.log('token->', token);
  //punto de partida
export const initialState = {
  user: "" || user,
  email: "" || email,
  recipes: "" || recipes,
  token: "" || token,
  loading: false, //estado de la carga
  errorMessage: null, //si el inicio de sesion falla
};


///esta es la lista de casos que te vas a poder encontrar
export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.user,
        email: action.payload.email,
        recipes: action.payload.recipes,
        token: action.payload.auth_token,
        loading: false
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: ""
      };

    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      };

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};