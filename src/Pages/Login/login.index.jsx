import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../../Components/Login/login.component";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { loginUser, useAuthState, useAuthDispatch } from "../../Context/context.index";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAuthDispatch();

  let navigate = useNavigate();

  const { loading, errorMessage } = useAuthState(); //lee los valores del loading y errorMessages del contexto


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let response = await loginUser(dispatch, {email, password});
      if (!response.user) return
      navigate("/dashboard")

    } catch (error) {
      return <p>ha habido un error en {`${error}`}</p>
    }
  };

  return (
    <>
      <NavbarTwo />
      <Login/>
    </>
  );
}
export default LoginPage;