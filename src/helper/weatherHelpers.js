export const handleOnSearchChange = (setSearchData) => (data) => {
  setSearchData(data);
};

export const handleDataFetched =
  (setMainWeather, setForecast, setHourlyTemps) =>
  ({ mainWeather, forecast, hourlyTemps }) => {
    setMainWeather(mainWeather);
    setForecast(forecast);
    setHourlyTemps(hourlyTemps);
  };

export const addCityToWeatherList = (
  mainWeather,
  weatherBlocks,
  setWeatherBlocks
) => {
  if (mainWeather && weatherBlocks.length < 5) {
    const newWeatherData = {
      id: Date.now(),
      city: mainWeather.city,
      currentWeather: mainWeather,
    };
    setWeatherBlocks((prevBlocks) => [...prevBlocks, newWeatherData]);
  }
};
