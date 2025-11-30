import React from "react";
export default function WeatherCard({ lang }) {
  const t = (mr,hi,en)=> (lang==="mr"?mr:lang==="hi"?hi:en);
  return (
    <section className="card weather">
      <h3>{t("हवामान","मौसम","Weather & Alerts")}</h3>
      <div className="weather-grid">
        <div><strong>24°C</strong><div className="muted">Sunny</div></div>
        <div><strong>Next 7 days</strong><div className="muted">Light rain expected</div></div>
      </div>
    </section>
  );
}
