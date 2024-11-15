import { useDispatch } from "react-redux";
import "./register-form.css";
import { register } from "../../redux/auth/auth-operations.js";

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    dispatch(
      register({
        name: form.elements.name.value,
        email: form.elements.email.value,
        password: form.elements.password.value,
      })
    );
    form.reset();
  };

  return (
    <div className="container">
      <p className="title">Please Sign Up !</p>
      <form className="form" onSubmit={handleSubmit} autoComplete="off">
        <label className="label">
          Username
          <input className="input" type="text" name="name" />
        </label>
        <label className="label">
          Email
          <input className="input" type="email" name="email" />
        </label>
        <label className="label">
          Password
          <input className="input" type="password" name="password" />
        </label>
        <button className="btn" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};
