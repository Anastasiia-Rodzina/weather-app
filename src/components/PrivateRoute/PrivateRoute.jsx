import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectIsLogin, selectToken } from "../../redux/auth/auth-selectors.js";

const PrivateRoute = () => {
  const isLogin = useSelector(selectIsLogin);

  const token = useSelector(selectToken);

  if (!isLogin && token) {
    return <p>...Loading</p>;
  }

  if (!isLogin && !token) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
export default PrivateRoute;
