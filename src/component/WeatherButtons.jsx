import React from "react";

const WeatherButtons = ({ cities, setCity, selectedCity }) => {
  return (
    <div>
      <button
        onClick={() => setCity("current")}
        className={`current-city ${selectedCity === "current" ? "active" : ""}`}
      >
        현재 위치
      </button>
      {/* map 함수로 불러오기 */}

      <div className="button-wrap">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => setCity(city)}
            className={selectedCity === city ? "active" : ""}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeatherButtons;
