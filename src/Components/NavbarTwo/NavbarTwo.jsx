import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../Context/actions";
import { useAuthDispatch, useAuthState } from "../../Context/contexts";
import About from "../../Pages/About/About";

import icon from "../../assets/chef-icon.svg"
import logo from "../../assets/LOGO-boilbook-blanco.png";
import lang from "../../assets/eng-switch.png";

import "./Navbar.scss";

const NavbarTwo = () => {
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
          <div className="navbar__items-box">
            <img className="navbar__items-box-lang" src={lang} />
            <NavLink className={({ isActive }) => (isActive ? "active" : "inactive")} to="/about">
                <p className="navbar__items-box-about">About</p>
            </NavLink>
          </div>

          <div className="navbar__items-box">
          <NavLink to={'/'}>
            <img className="navbar__items-box-logo" src={logo} alt="logo" />
          </NavLink>
          </div>

            <div className="navbar__items-box">
              <NavLink className={({ isActive }) => (isActive ? "active" : "inactive")} to="/dashboard">
                <p className="navbar__items-box-user"> <img src={icon}/>Chef {user.user}</p>
              </NavLink>

            {/* <p>Bienvenida/o {user.user}</p> */}
            <div className="navbar__items-box-logout">
              <NavLink onClick={handleLogout} className={({ isActive }) => (isActive ? "active" : "inactive")} to="/">
                LOGOUT
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <div className="navbar__items">
        <div className="navbar__items-box">
            <img className="navbar__items-box-lang" src={lang} />
            <About className="navbar__items-box-about"/>
          </div>

          <div className="navbar__items-box">
          <NavLink to={'/'}>
            <img className="navbar__items-box-logo" src={logo} alt="logo" />
          </NavLink>
          </div>
          <div className="navbar__items-box-log">
              <NavLink onClick={handleLogout} className={({ isActive }) => (isActive ? "active" : "inactive")} to="/login">
                LOGIN
              </NavLink>
          </div>

        </div>
      )}
    </div>
  );
};

export default NavbarTwo;
