import { login } from "../../redux/auth/auth-operations.js";
import { useDispatch } from "react-redux";
import "./login-form.css";

export const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    dispatch(
      login({
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

  return (
    <div className="container">
      <p className="title">Please Log in !</p>
      <form className="form" onSubmit={handleSubmit} autoComplete="off">
        <label className="label">
          Email
          <input className="input" type="email" name="email" />
        </label>
        <label className="label">
          Password
          <input className="input" type="password" name="password" />
        </label>
        <button className="btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};
