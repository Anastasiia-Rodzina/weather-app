// src/App.js

import React, { useState } from "react";
import "./App.css";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Search from "./components/Search/Search";
import Forecast from "./components/Forecast/Forecast";
import WeatherList from "./components/WeatherList/WeatherList";
import TemperatureChart from "./components/TemperatureChart/TemperatureChart";

function App() {
  const [weatherBlocks, setWeatherBlocks] = useState([]);
  const [mainWeather, setMainWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourlyTemps, setHourlyTemps] = useState([]);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setMainWeather({ city: searchData.label, ...weatherResponse });
        setForecast(forecastResponse);

        const now = new Date();
        const hourlyData = forecastResponse.list
          .filter((item) => {
            const itemDate = new Date(item.dt_txt);
            return itemDate > now && itemDate - now <= 24 * 60 * 60 * 1000; // Next 24 hours
          })
          .map((item) => ({
            time: `${new Date(item.dt_txt).getHours()}:00`,
            temp: item.main.temp,
          }));

        setHourlyTemps(hourlyData);
      })
      .catch(console.log);
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

  const isCityInWeatherList =
    mainWeather &&
    weatherBlocks.some((block) => block.city === mainWeather.city);

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {mainWeather && (
        <>
          <CurrentWeather
            data={mainWeather}
            onAddCity={addCityToWeatherList}
            showAddButton={!isCityInWeatherList}
          />
          <TemperatureChart hourlyTemps={hourlyTemps} />
          <Forecast data={forecast} />
        </>
      )}
      <WeatherList
        weatherBlocks={weatherBlocks}
        onRemoveCity={handleRemoveCity}
      />
    </div>
  );
}

export default App;
