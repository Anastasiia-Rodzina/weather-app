import React from "react";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import "./weather-list.css";

const WeatherList = ({ weatherBlocks, onRemoveCity }) => {
  return (
    <ul className="weather-container">
      {weatherBlocks.map((block) => (
        <li key={block.id} className="city-block">
          <button
            onClick={() => onRemoveCity(block.id)}
            className="remove-block-button"
          >
            -
          </button>
          <CurrentWeather data={block.currentWeather} />
        </li>
      ))}
    </ul>
  );
};

export default WeatherList;
