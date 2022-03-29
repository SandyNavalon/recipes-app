import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../Context/actions";
import { useAuthDispatch, useAuthState } from "../../Context/contexts";

import chef from "../../assets/chef-brown.png";
import logo from "../../assets/LOGO-boilbook-blanco.png";
import lang from "../../assets/eng-switch.png";

import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

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

      <div className="navbar__box">
          <div className="navbar__box1">
              <div className="navbar__box1-lang">
                <img className="navbar__box1-lang-icon" src={lang} />
              </div>
              <NavLink className="navbar__box1-about" to="/about">
                  <p className="navbar__box1-about-p">Nosotros</p>
              </NavLink>
          </div>
          <div className="navbar__box0">
            <NavLink  to={'/'}>
                <img className="navbar__box0-logo" src={logo} alt="logo" />
            </NavLink>
          </div>

          <div className="navbar__box2">
                  <NavLink className="navbar__box2-user" to="/dashboard">
                    <img className="navbar__box2-user-img" src={chef}/>
                    <p className="navbar__box2-user-name">Chef {user.user}</p>
                  </NavLink>

              {/* <p>Bienvenida/o {user.user}</p> */}
              <div className="navbar__box2-logout">
                <NavLink className="navbar__box2-logout-link" onClick={handleLogout} to="/">
                | <FontAwesomeIcon className="navbar__box2-logout-icon" icon={ faDoorOpen}/><span className="logout-hover"> Logout</span>
                </NavLink>
              </div>
          </div>
        </div>
      ) : (
        <div className="navbar__box">
          <div className="navbar__box1">
            <div className="navbar__box1-lang">
              <img className="navbar__box1-lang-icon" src={lang} />
            </div>
            <NavLink className="navbar__box1-about" to="/about">
              <p className="navbar__box1-about-p">Sobre nosotros</p>
            </NavLink>
          </div>
          <div className="navbar__box0">
            <NavLink  to={'/'}>
                <img className="navbar__box0-logo" src={logo} alt="logo" />
            </NavLink>
          </div>

          <div className="navbar__box2-login">
            <NavLink className="navbar__box2-login-link" to="/login">
                  Login
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarTwo;
