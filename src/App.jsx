import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./Config/routes.js";
import AppRoutes from "./Components/AppRoute";
import { AuthProvider } from "./Context/context.index";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
          <Route element={<AppRoutes />} path="/dashboard" />
          <Route element={<AppRoutes />} path="/dashboard/add-recipe" />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;