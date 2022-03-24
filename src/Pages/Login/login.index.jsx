import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, useAuthState, useAuthDispatch } from "../../Context/context.index";
import RecipeList from "../../Components/RecipeList/RecipeList";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAuthDispatch();
  let navigate = useNavigate();
  const { loading, errorMessage } = useAuthState(); //lee los valores del loading y errorMessages del contexto



  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let response = await loginUser(dispatch, { email, password });
      if (!response.user) return;
      navigate("/dashboard");
    } catch (error) {
      return error
    }
  };

  return (
    <div>
        <div className="login">
          <h1>Login</h1>
          {errorMessage ? <p>{errorMessage}</p> : null}
          <form className="login__form">
              <div className="login__form-email">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="login__form-password">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <button className="login__form-btn" onClick={handleLogin} disabled={loading}>
              login
              </button>
          </form>
        </div>

      <div className="new">
        <h3 className="new__title">¿Todavía no tienes cuenta?</h3>
        <Link to='/register'>
        <button className="new__btn">Registrate</button>
        </Link>
      </div>

      <div>
       <RecipeList/>
      </div>
    </div>
  );
}

export default Login;