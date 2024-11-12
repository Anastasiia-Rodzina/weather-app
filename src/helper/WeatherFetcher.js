import React from "react";
import { WEATHER_API_URL, WEATHER_API_KEY } from "../api/api";

const WeatherFetcher = ({ searchData, onDataFetched }) => {
  const [prevSearchData, setPrevSearchData] = React.useState(null);

  React.useEffect(() => {
    // Перевіряємо, чи є нове значення `searchData`, щоб уникнути зайвих запитів
    if (!searchData || searchData.value === prevSearchData) return;

    // Зберігаємо попереднє значення `searchData`
    setPrevSearchData(searchData.value);

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

        const now = new Date();
        const hourlyData = forecastResponse.list
          .filter((item) => {
            const itemDate = new Date(item.dt_txt);
            return itemDate > now && itemDate - now <= 24 * 60 * 60 * 1000;
          })
          .map((item) => ({
            time: `${new Date(item.dt_txt).getHours()}:00`,
            temp: item.main.temp,
          }));

        onDataFetched({
          mainWeather: { city: searchData.label, ...weatherResponse },
          forecast: forecastResponse,
          hourlyTemps: hourlyData,
        });
      })
      .catch(console.log);
  }, [searchData, onDataFetched, prevSearchData]);

  return null;
};

export default WeatherFetcher;
