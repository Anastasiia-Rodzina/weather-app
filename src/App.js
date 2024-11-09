import React, { useState } from "react";
import "./App.css";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import CurrentWeather from "./components/CurrentWeather/CurrentWeather";
import Search from "./components/Search/Search";
import Forecast from "./components/Forecast/Forecast";
import WeatherList from "./components/WeatherList/WeatherList";

function App() {
  const [weatherBlocks, setWeatherBlocks] = useState([]);
  const [mainWeather, setMainWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

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
