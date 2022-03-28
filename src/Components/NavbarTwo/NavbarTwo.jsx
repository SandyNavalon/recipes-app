import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../Context/actions";
import { useAuthDispatch, useAuthState } from "../../Context/contexts";

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
      <NavLink className="navbar__items-box-logo" to={'/'}>
            <img  src={logo} alt="logo" />
      </NavLink>

      {user.email ? (
        <div className="navbar__items">
          <div className="navbar__items-box">
            <img className="navbar__items-box-lang" src={lang} />
          </div>

            <div className="navbar__items-box">
                <NavLink className="navbar__items-box-user" to="/dashboard">
                  <img src={icon}/>
                  <p className="navbar__items-box-user-name">Chef {user.user}</p>
                </NavLink>

            {/* <p>Bienvenida/o {user.user}</p> */}
            <div className="navbar__items-box-logout">
              <NavLink onClick={handleLogout} className={({ isActive }) => (isActive ? "active" : "inactive")} to="/">
                Logout
              </NavLink>
            </div>
          </div>
        </div>
      ) : (
        <div className="navbar__items">
        <div className="navbar__items-box">
            <img className="navbar__items-box-lang" src={lang} />
          </div>

          <div className="navbar__items-box-log">
              <NavLink onClick={handleLogout} className={({ isActive }) => (isActive ? "active" : "inactive")} to="/login">
                Login
              </NavLink>
          </div>

        </div>
      )}
    </div>
  );
};

export default NavbarTwo;
