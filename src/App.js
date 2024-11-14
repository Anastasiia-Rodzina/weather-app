import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import NavMenu from "./components/NavMenu.js/NavMenu";
import { useDispatch } from "react-redux";
import { current } from "./redux/auth/auth-operations";
import RoutesComponent from "./RoutesComponent";
import {
  addCityToWeatherList,
  handleDataFetched,
} from "./helper/weatherHelpers";

function App() {
  const [weatherBlocks, setWeatherBlocks] = useState(() => {
    const savedWeatherBlocks = localStorage.getItem("weatherBlocks");
    return savedWeatherBlocks ? JSON.parse(savedWeatherBlocks) : [];
  });
  const [mainWeather, setMainWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourlyTemps, setHourlyTemps] = useState([]);
  const [selectedWeather, setSelectedWeather] = useState(null);
  const [searchData, setSearchData] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(current());
  }, [dispatch]);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const { city, latitude, longitude } = data;
        handleOnSearchChange({
          label: city,
          value: `${latitude} ${longitude}`,
        });
      })
      .catch(console.log);
  }, []);

  useEffect(() => {
    localStorage.setItem("weatherBlocks", JSON.stringify(weatherBlocks));
  }, [weatherBlocks]);

  const handleOnSearchChange = (data) => {
    setSearchData(data);
  };

  const handleFetchedData = handleDataFetched(
    setMainWeather,
    setForecast,
    setHourlyTemps
  );
  const addCity = () =>
    addCityToWeatherList(mainWeather, weatherBlocks, setWeatherBlocks);

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
        <RoutesComponent
          mainWeather={mainWeather}
          forecast={forecast}
          hourlyTemps={hourlyTemps}
          searchData={searchData}
          onSearchChange={handleOnSearchChange}
          onDataFetched={handleFetchedData}
          addCityToWeatherList={addCity}
          isCityInWeatherList={isCityInWeatherList}
          weatherBlocks={weatherBlocks}
          onRemoveCity={handleRemoveCity}
          onSelectCity={handleSelectCity}
        />
      </div>
    </Suspense>
  );
}

export default App;
