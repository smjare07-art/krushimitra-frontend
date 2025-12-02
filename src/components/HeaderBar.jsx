import React, { useEffect, useState } from "react";
import "./HeaderBar.css";

export default function HeaderBar({ lang, setLang }) {
  const [temp, setTemp] = useState(null);

  // ============================
  // FETCH LIVE TEMPERATURE
  // ============================
  const getWeather = () => {
    const API_KEY = "YOUR_API_KEY"; // OpenWeather Key टाक

    // Default Maharashtra center location  
    const latitude = 19.7515;
    const longitude = 75.7139;

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTemp(data.main.temp);
      })
      .catch((err) => console.log("Weather Fetch Error:", err));
  };

  useEffect(() => {
    getWeather();
  }, []);

  // GET TODAY'S DAY
  const today = new Date().toLocaleDateString("mr-IN", {
    weekday: "long",
  });

  return (
    <div className="header-bar">

      {/* SEARCH BAR */}
      <input
        type="text"
        className="search-box"
        placeholder="🔍 पिके शोधा..."
      />

      {/* TEMPERATURE */}
      <div className="temp-box">
        {temp !== null ? `${temp}°C` : "⏳"}
      </div>

      {/* TODAY DAY */}
      <div className="day-box">
        आज: {today}
      </div>

      {/* REFRESH WEATHER */}
      <button className="refresh-btn" onClick={getWeather}>
        🔄
      </button>

      {/* LANGUAGE SELECTOR */}
      <select
        className="lang-select"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
      >
        <option value="mr">मराठी</option>
        <option value="hi">हिंदी</option>
        <option value="en">English</option>
      </select>
    </div>
  );
}
