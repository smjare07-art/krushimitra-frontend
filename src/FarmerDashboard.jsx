// src/FarmerDashboard.jsx
import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { useNavigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import HeaderBar from "./components/HeaderBar";
import ProfileOverview from "./components/ProfileOverview";
import MarketPrice from "./components/MarketPrice";
import MyCrops from "./components/MyCrops";
import ReceivedOffers from "./components/ReceivedOffers";
import OrdersDeals from "./components/OrdersDeals";
import Payments from "./components/Payments";
import Logistics from "./components/Logistics";
import WeatherCard from "./components/WeatherCard";
import CropAdvisory from "./components/CropAdvisory";
import DigitalRecords from "./components/DigitalRecords";
import SupportHelp from "./components/SupportHelp";
import SettingsPanel from "./components/SettingsPanel";

export default function FarmerDashboard() {
  const [lang, setLang] = useState("mr"); // 'mr' | 'hi' | 'en'
  const navigate = useNavigate();

  // ------------------------
  // GET FARMER DATA
  // ------------------------
  const [farmer, setFarmer] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("farmer");

    if (!data) {
      // If NOT logged in -> redirect to login
      navigate("/farmer/login");
      return;
    }

    setFarmer(JSON.parse(data));
  }, []);

  // While loading farmer data
  if (!farmer) return <div className="loading">Loading...</div>;

  return (
    <div className="dash-root">
      <Sidebar lang={lang} />

      <div className="dash-main">
        <HeaderBar lang={lang} setLang={setLang} />

        {/* SHOW FARMER BASIC INFO AT TOP */}
        <div className="farmer-top-box">
          <h2 className="farmer-welcome">
            नमस्कार, {farmer.fullName} 🌾
          </h2>

          <p className="farmer-info">गाव: {farmer.village}</p>
          <p className="farmer-info">जिल्हा: {farmer.district}</p>
          <p className="farmer-info">पिके: {farmer.crops}</p>
        </div>

        {/* MAIN DASHBOARD SECTIONS */}
        <div className="dash-content">
          <div className="dash-left">
            <ProfileOverview farmer={farmer} lang={lang} />
            <MarketPrice lang={lang} />
            <MyCrops lang={lang} />
            <ReceivedOffers lang={lang} />
            <OrdersDeals lang={lang} />
            <Payments lang={lang} />
            <Logistics lang={lang} />
          </div>

          <div className="dash-right">
            <WeatherCard lang={lang} />
            <CropAdvisory lang={lang} />
            <DigitalRecords lang={lang} />
            <SupportHelp lang={lang} />
            <SettingsPanel lang={lang} />
          </div>
        </div>
      </div>
    </div>
  );
}
