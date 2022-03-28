import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "../../Components/Login/login.component";
import NavbarTwo from "../../Components/NavbarTwo/NavbarTwo";
import { loginUser, useAuthState, useAuthDispatch } from "../../Context/context.index";

function LoginPage(props) {

  return (
    <>
      <NavbarTwo />
      <Login/>
    </>
  );
}
export default LoginPage;