import React, { useState } from "react";
import CurrentWeather from "../CurrentWeather/CurrentWeather";

import "./weather-list.css";
import DeleteCardModal from "../Modal/DeleteModal";

const WeatherList = ({ weatherBlocks, onRemoveCity }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCityId, setSelectedCityId] = useState(null);

  const handleOpenModal = (cityId) => {
    setSelectedCityId(cityId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCityId(null);
  };

  const handleDeleteCity = () => {
    if (selectedCityId) {
      onRemoveCity(selectedCityId);
      handleCloseModal();
    }
  };

  return (
    <div>
      <ul className="weather-container">
        {weatherBlocks.map((block) => (
          <li key={block.id} className="city-block">
            <button
              onClick={() => handleOpenModal(block.id)}
              className="remove-block-button"
            >
              -
            </button>
            <CurrentWeather data={block.currentWeather} />
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <DeleteCardModal
          onClose={handleCloseModal}
          onDelete={handleDeleteCity}
          cardId={selectedCityId}
        />
      )}
    </div>
  );
};

export default WeatherList;
