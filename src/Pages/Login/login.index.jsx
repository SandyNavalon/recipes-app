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
    <div className="container">
      <div className='containerlogin'>
            <form className="containerlogin-form">
              <h1 className="containerlogin-form-title">Login</h1>
              <div className="containerlogin-form-items">
                <div className="containerlogin-form-items">
                  <input
                    className="containerlogin-form-items-input"
                    type="email"
                    id="email"
                    value={email}
                    placeholder='email'
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="containerlogin-form-items">
                  <input
                    className="containerlogin-form-items-input"
                    type="password"
                    id="password"
                    value={password}
                    placeholder='contraseña'
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <button className="containerlogin-form-items-btn" onClick={handleLogin} disabled={loading}>
                Login
                </button>
              </div>
                {errorMessage ? <p className='containerlogin-form-items-error'>{errorMessage}</p> : null}
            </form>

        <div className="new">
          <Link to='/register'>
          <button className="new__btn">¿Todavía no tienes cuenta?</button>
          </Link>
        </div>

      </div>
    </div>
  );
}
export default Login;