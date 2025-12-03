import React from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  const menu = [
    { name: "डॅशबोर्ड", path: "/farmer/dashboard" },
    { name: "वैयक्तिक माहिती", path: "/farmer/dashboard" },
    { name: "माझी पिके", path: "/farmer/crops" },
    { name: "बाजारभाव", path: "/farmer/market" },
    { name: "ऑफर्स", path: "/farmer/offers" },
    { name: "पेमेंट", path: "/farmer/payments" },
    { name: "सेटिंग्ज", path: "/farmer/settings" }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">🌾 Krushimitra</div>
      <div className="sidebar-menu">
        {menu.map((item, i) => (
          <button key={i} onClick={() => navigate(item.path)} className="sidebar-item">
            {item.name}
          </button>
        ))}
      </div>
      <p className="sidebar-footer">© Krushimitra</p>
    </div>
  );
}
