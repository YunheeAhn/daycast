import React from "react";

const WeatherButtons = ({ cities, setCity }) => {
  return (
    <div>
      <button onClick={() => setCity("current")} className="current-city">
        현재 위치
      </button>
      {/* map 함수로 불러오기 */}

      <div className="button-wrap">
        {cities.map((city) => (
          <button key={city} onClick={() => setCity(city)}>
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeatherButtons;
