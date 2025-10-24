import React from "react";

const WeatherBox = ({ weather }) => {
  if (!weather) {
    console.log("날씨 정보 없어!!!");
    return null; // 날씨 정보가 없으면 아무것도 렌더링하지 않음
  }
  const fah = Math.floor((weather.main.temp * 9) / 5 + 32);
  const cel = Math.floor(weather.main.temp);
  const iconCode = weather.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  console.log("whether??", weather);
  return (
    <div className="weather-box">
      <div>{weather?.name}</div>
      <img src={iconUrl} alt="weather-img"></img>
      <div>
        섭씨 {weather ? cel : "로딩중..."}도 / 화씨 {weather ? fah : "로딩중..."}도
      </div>
      <div>{weather?.weather[0].description}</div>
    </div>
  );
};

export default WeatherBox;
