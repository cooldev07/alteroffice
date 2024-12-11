import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoutes() {
  const token = useSelector((state) => state.auth.token);
  return token ? <Outlet /> : <Navigate to={"/"} />;
}

export default ProtectedRoutes;
