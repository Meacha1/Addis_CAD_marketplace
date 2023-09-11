import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const auth = (localStorage.getItem('token'));

  return auth.toString() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;