import { getItem } from "../Services/storage.service";

const user = getItem("currentUser");

export const initialState = {
  user: user ? user : "",
  // _id: ""  || _id,
  email: user ? user.email : "",
  recipes: user ? user.recipes : "",
  token: user ? user.auth_token : "",
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
        // _id: action.payload._id,
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