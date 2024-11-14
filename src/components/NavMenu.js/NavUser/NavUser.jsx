import { useSelector, useDispatch } from "react-redux";
import "./nav-user.css";
import { selectUser } from "../../../redux/auth/auth-selectors";
import { logout } from "../../../redux/auth/auth-operations";
import { NavLink } from "react-router-dom";

const NavUser = () => {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const onLogout = () => dispatch(logout());

  const email = user && user.email;
  return (
    <div className="user">
      <NavLink className="link" to="/favorites">
        Favorites
      </NavLink>
      {email}
      <button onClick={onLogout} className="btn">
        Logout
      </button>
    </div>
  );
};
export default NavUser;
