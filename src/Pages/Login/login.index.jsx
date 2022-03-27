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
      return <p>ha habido un error en {`${error}`}</p>
    }
  };

  return (
    <div className='container'>
        <h1>Login</h1>
        {errorMessage ? <p className='error'>{errorMessage}</p> : null}
          <form>
            <div className="loginForm">
              <div className="loginForm__item">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="loginForm__item">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <button className="loginForm__btn" onClick={handleLogin} disabled={loading}>
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