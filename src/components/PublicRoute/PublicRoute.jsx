import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectIsLogin, selectToken } from "../../redux/auth/auth-selectors.js";

const PublicRoute = () => {
  const isLogin = useSelector(selectIsLogin);

  const token = useSelector(selectToken);

  if (!isLogin && token) {
    return <p>...Loading</p>;
  }

  if (isLogin) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};
export default PublicRoute;
