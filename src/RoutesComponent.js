import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home.jsx";
import PublicRoute from "./components/PublicRoute/PublicRoute.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import { RegisterForm } from "./components/RegisterForm/RegisterForm.jsx";
import { LoginForm } from "./components/LoginForm/LoginForm.jsx";
import WeatherList from "./components/WeatherList/WeatherList.jsx";

const RoutesComponent = (props) => (
  <Routes>
    <Route path="/" element={<Home {...props} />} />
    <Route element={<PublicRoute />}>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
    </Route>
    <Route element={<PrivateRoute />}>
      <Route path="/favorites" element={<WeatherList {...props} />} />
    </Route>
  </Routes>
);

export default RoutesComponent;
