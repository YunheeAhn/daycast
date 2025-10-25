import { useEffect, useState } from "react";
import "./App.css";
import WeatherBox from "./component/WeatherBox.jsx";
import WeatherButtons from "./component/WeatherButtons.jsx";
import { ClipLoader } from "react-spinners";

// 날씨앱 만들기
// 1. 앱이 실행 되면 현재 위치기반의 날씨가 보인다.
// 2. 날씨 정보 : 도시명, 섭씨, 화씨, 날씨의 상태
// 3. 총 5개의 버튼이 있다.
// 3-1. 섭씨 <-> 화씨 변환 버튼
// 3-2. 현재위치 버튼(이 버튼을 누르면 다시 현재위치기반의 날씨가 보인다.)
// 3-3. 특정 도시 클릭 버튼 3개(뉴욕, 런던, 도쿄 등)(이 버튼을 누르면 해당 위치기반의 날씨가 보인다.)
// 4. 버튼을 클릭해서 날씨를 불러 올 때 로딩 스피너가 돈다.

function App() {
  // const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const cities = ["Seoul", "New York", "London", "Tokyo"];
  const [loading, setLoading] = useState(false);
  const [apiError, setAPIError] = useState("");

  const getCurrentLocationWeather = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        let { latitude, longitude } = position.coords;
        getWeatherByCurrentLocation(latitude, longitude);
      },
      (error) => {
        setAPIError(error.message || "위치 설정을 허용해주세요 🙏");
        setWeather(null);
      }
    );
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    try {
      setLoading(true);

      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

      let response = await fetch(url);
      let data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "현재 위치의 날씨를 불러오지 못했습니다.");
      }

      setWeather(data);
      setAPIError("");
    } catch (err) {
      setAPIError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByCity = async (city) => {
    try {
      setLoading(true);

      let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      let response = await fetch(url);
      let data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "날씨 정보를 불러오지 못했습니다.");
      }

      setWeather(data);
      setAPIError("");
    } catch (err) {
      setAPIError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city === "") {
      getCurrentLocationWeather();
    } else {
      if (city === "current") {
        getCurrentLocationWeather();
      } else {
        getWeatherByCity(city);
      }
    }
  }, [city]);

  return (
    <>
      {loading ? (
        <div className="container loading">
          <ClipLoader size={150} />
          <p>Loading...</p>
        </div>
      ) : apiError ? (
        <div className="container error">
          <p>{apiError}</p>
        </div>
      ) : (
        <div className="container">
          <WeatherBox weather={weather} />
          <WeatherButtons cities={cities} setCity={setCity} selectedCity={city} />
        </div>
      )}
    </>
  );
}

export default App;
