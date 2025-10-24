import React from "react";

const WeatherButtons = ({ cities, setCity }) => {
  return (
    <div>
      <button onClick={() => setCity("current")}>현재 위치</button>
      {/* map 함수로 불러오기 */}

      {cities.map((city) => (
        <button key={city} onClick={() => setCity(city)}>
          {city}
        </button>
      ))}
    </div>
  );
};

export default WeatherButtons;
