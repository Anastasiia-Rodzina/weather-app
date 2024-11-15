import React from "react";
import Search from "../Search/Search.js";
import CurrentWeather from "../CurrentWeather/CurrentWeather.js";
import Forecast from "../Forecast/Forecast.js";
import TemperatureChart from "../TemperatureChart/TemperatureChart.js";
import WeatherFetcher from "../../helper/WeatherFetcher.js";

const Home = ({
  mainWeather,
  forecast,
  hourlyTemps,
  searchData,
  onSearchChange,
  onDataFetched,
  addCityToWeatherList,
  isCityInWeatherList,
  selectedWeather,
}) => {
  return (
    <>
      <Search onSearchChange={onSearchChange} />
      {searchData && (
        <WeatherFetcher searchData={searchData} onDataFetched={onDataFetched} />
      )}
      {mainWeather && (
        <>
          <CurrentWeather
            data={mainWeather}
            onAddCity={addCityToWeatherList}
            showAddButton={!isCityInWeatherList}
          />
          <TemperatureChart
            className="temperature-chart"
            hourlyTemps={
              selectedWeather ? selectedWeather.hourlyTemps : hourlyTemps
            }
          />

          <Forecast
            data={selectedWeather ? selectedWeather.forecast : forecast}
          />
        </>
      )}
    </>
  );
};

export default Home;
