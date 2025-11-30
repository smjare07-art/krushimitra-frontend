// src/FarmerDashboard.jsx
import React, { useState } from "react";
import "./dashboard.css";

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

  return (
    <div className="dash-root">
      <Sidebar lang={lang} />
      <div className="dash-main">
        <HeaderBar lang={lang} setLang={setLang} />
        <div className="dash-content">
          <div className="dash-left">
            <ProfileOverview lang={lang} />
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
