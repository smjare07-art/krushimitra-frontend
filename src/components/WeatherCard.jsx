import React, { useEffect, useState } from "react";
import "./weather.css";

export default function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // User Location
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        fetchWeather(lat, lon);
      },
      () => {
        alert("लोकेशन मिळू शकले नाही");
        setLoading(false);
      }
    );
  }, []);

  // FETCH FROM FREE OPEN-METEO API
  const fetchWeather = async (lat, lon) => {
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

      let res = await fetch(url);
      let data = await res.json();

      setWeather(data.current_weather);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading) return <div className="weather-card">🔄 हवामान मिळवत आहे...</div>;
  if (!weather) return <div className="weather-card">❌ Weather मिळालं नाही</div>;

  return (
    <div className="weather-card">
      <h3>🌤 आजचे हवामान</h3>

      <p className="temp">{weather.temperature}°C</p>
      <p className="desc">{weather.weathercode}</p>

      <div className="w-row">
        <span>🌬️ वारा: {weather.windspeed} km/h</span>
        <span>🧭 दिशा: {weather.winddirection}°</span>
      </div>

      <p style={{ fontSize: "12px", color: "#777" }}>
        (Free API — OpenMeteo)
      </p>
    </div>
  );
}
