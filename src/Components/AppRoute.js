// Components/AppRoutes.js

import { useAuthState } from "../Context/context.index";
import { Navigate } from "react-router-dom";
import Dashboard from "../Pages/Dashboard/dashboard.index";

function AppRoutes() {
  const { user } = useAuthState();

  return <>{user ? <Dashboard /> : <Navigate to="/" />}</>;
}

export default AppRoutes;