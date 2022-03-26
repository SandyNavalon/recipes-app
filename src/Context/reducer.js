import { getItem } from "../Services/storage.service";

const user = getItem("currentUser");

export const initialState = {
  user: user ? user.user: "",
  id: user ? user._id : "",
  email: user ? user.email : "",
  recipes: user ? user.recipes : [],
  loading: false, //estado de la carga
  errorMessage: null, //si el inicio de sesion falla
};


///esta es la lista de casos que te vas a poder encontrar
export const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...state,
        loading: true
      };
    case "LOGIN_SUCCESS":
      const {user, email, recipes, _id} = action.payload;
      return { ...state, user, email, recipes, id: _id, loading: false};
    case "LOGOUT":
      return {
        ...state,
        user: "",
      };

    case "LOGIN_ERROR":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    case "ADD_RECIPE":
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
        loading: false,
      };
    case "EDIT_RECIPE":
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
        loading: false,
      };  

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};