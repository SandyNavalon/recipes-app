import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../Context/actions";
import { useAuthDispatch, useAuthState } from "../../Context/contexts";

import logo from "../../assets/LOGO-boilbook-blanco.png";

import "./Navbar.scss";

const Navbar = () => {
  let navigate = useNavigate();
  const dispatch = useAuthDispatch(); // lee el método dispatch del contexto
  const user = useAuthState(); //lee los detalles del usuario del contexto

  const handleLogout = () => {
    //RECARGA LA PAG, pero tarda un segundo - revisar
    window.location.reload();
    logoutUser(dispatch); //llama a la acción logout
    navigate("/"); //navega de nuevo al login sin usuario
  };

  return (
    <div className="navbar">
      {user.email ? (
        <div className="navbar__items">
          <div className="navbar__items-btn">
            <NavLink className={({ isActive }) => (isActive ? "active" : "inactive")} to="/">
              Ver recetas
            </NavLink>
          </div>

          <div className="navbar__items-btn">
            <NavLink className={({ isActive }) => (isActive ? "active" : "inactive")} to="/dashboard">
              Mi recetario
            </NavLink>
          </div>
          <div className="navbar__items-logo">
            <img src={logo} alt="logo" />
          </div>

          {/* <p>Bienvenida/o {user.user}</p> */}
          <div className="navbar__items-btn-logout">
            <NavLink onClick={handleLogout} className={({ isActive }) => (isActive ? "active" : "inactive")} to="/">
              LOGOUT
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="navbar__items">
          <div className="navbar__items-btn">
            <NavLink className={({ isActive }) => (isActive ? "active" : "inactive")} to="/">
              Ver recetas
            </NavLink>
          </div>

          <div className="navbar__items-logo">
            <img src={logo} alt="logo"/>
          </div>

        </div>
      )}
    </div>
  );
};

export default Navbar;
