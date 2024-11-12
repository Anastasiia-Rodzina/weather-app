import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import WeatherList from "./components/WeatherList/WeatherList";
import { RegisterForm } from "./components/RegisterForm/RegisterForm";
import { LoginForm } from "./components/LoginForm/LoginForm";
import Home from "./components/Home/Home";
import NavMenu from "./components/NavMenu.js/NavMenu";
import PublicRoute from "./components/PublicRoute/PublicRoute";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useDispatch } from "react-redux";
import { current } from "./redux/auth/auth-operations";

function App() {
  const [weatherBlocks, setWeatherBlocks] = useState([]);
  const [mainWeather, setMainWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourlyTemps, setHourlyTemps] = useState([]);
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [searchData, setSearchData] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(current());
  }, [dispatch]);

  const handleSearchChange = (data) => {
    setSearchData(data);
  };

  const handleDataFetched = ({ mainWeather, forecast, hourlyTemps }) => {
    setMainWeather(mainWeather);
    setForecast(forecast);
    setHourlyTemps(hourlyTemps);
  };

  const addCityToWeatherList = () => {
    if (mainWeather && weatherBlocks.length < 5) {
      const newWeatherData = {
        id: Date.now(),
        city: mainWeather.city,
        currentWeather: mainWeather,
      };
      setWeatherBlocks((prevBlocks) => [...prevBlocks, newWeatherData]);
    }
  };

  const handleRemoveCity = (id) => {
    setWeatherBlocks((prevBlocks) =>
      prevBlocks.filter((block) => block.id !== id)
    );
  };

  const handleSelectCity = (block) => {
    setSelectedWeather(block);
    setForecast(block.forecast);
    setHourlyTemps(block.hourlyTemps);
  };

  const isCityInWeatherList =
    mainWeather &&
    weatherBlocks.some((block) => block.city === mainWeather.city);

  return (
    <Suspense fallback={<>Loading ...</>}>
      <div className="container">
        <NavMenu />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                mainWeather={mainWeather}
                forecast={forecast}
                hourlyTemps={hourlyTemps}
                searchData={searchData}
                onSearchChange={handleSearchChange}
                onDataFetched={handleDataFetched}
                addCityToWeatherList={addCityToWeatherList}
                isCityInWeatherList={isCityInWeatherList}
                selectedWeather={selectedWeather}
              />
            }
          />
          <Route element={<PublicRoute />}>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route
              path="/favorites"
              element={
                <WeatherList
                  weatherBlocks={weatherBlocks}
                  onRemoveCity={handleRemoveCity}
                  onSelectCity={handleSelectCity}
                />
              }
            />
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
