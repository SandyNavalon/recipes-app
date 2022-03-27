import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, useAuthState, useAuthDispatch } from "../../Context/context.index";
import './login.scss'

function Login(props) {
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
        if(error.response) {
      console.log(error.response.data.errorMessage);
        }

    }
  };

  return (
    <div className='container'>
        <h1>Login</h1>
        {errorMessage ? <p className='error'>{errorMessage}</p> : null}
          <form>
            <div className="loginForm">
              <div className="loginForm__item">
                <input
                  type="email"
                  id="email"
                  value={email}
                  placeholder='email'
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="loginForm__item">
                <input
                  type="password"
                  id="password"
                  value={password}
                  placeholder='contraseña'
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <button className="loginForm__item-btn" onClick={handleLogin} disabled={loading}>
              Login
              </button>
            </div>
          </form>

      <div className="new">
        <h3 className="new__title">¿Todavía no tienes cuenta?</h3>
        <Link to='/register'>
        <button className="new__btn">Regístrate</button>
        </Link>
      </div>

    </div>
  );
}

export default Login;