import { NavLink } from "react-router-dom";
import NavAuth from "./NavAuth";
import { selectIsLogin } from "../../redux/auth/auth-selectors";
import "./nav-menu.css";
import { useSelector } from "react-redux";
import NavUser from "./NavUser/NavUser.jsx";

const NavMenu = () => {
  const isLogin = useSelector(selectIsLogin);

  return (
    <div className="navigation">
      <NavLink className="link" to="/">
        Home
      </NavLink>

      {isLogin ? <NavUser /> : <NavAuth />}
    </div>
  );
};
export default NavMenu;
