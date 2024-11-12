import { NavLink } from "react-router-dom";
import "./nav-menu.css";

const NavAuth = () => {
  return (
    <>
      <NavLink to="/register" className="link">
        Register
      </NavLink>
      <NavLink to="/login" className="link">
        Login
      </NavLink>
    </>
  );
};
export default NavAuth;
