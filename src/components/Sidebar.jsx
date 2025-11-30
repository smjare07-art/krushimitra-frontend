import React from "react";

export default function Sidebar({ lang }) {
  // simple label function
  const t = (mr, hi, en) => (lang === "mr" ? mr : lang === "hi" ? hi : en);

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">🌾</div>
        <div className="brand-text">Krushimitra</div>
      </div>

      <nav className="menu">
        <button className="menu-item">{t("डॅशबोर्ड","डैशबोर्ड","Dashboard")}</button>
        <button className="menu-item">{t("माझी पिके","मेरी फसलें","My Crops")}</button>
        <button className="menu-item">{t("बाजारभाव","बाजार भाव","Market Price")}</button>
        <button className="menu-item">{t("ऑफर्स","ऑफर्स","Offers")}</button>
        <button className="menu-item">{t("ऑर्डर्स","ऑर्डर्स","Orders")}</button>
        <button className="menu-item">{t("पेमेंटन","पेमेंट","Payments")}</button>
        <button className="menu-item">{t("सेटिंग्ज","सेटिंग्स","Settings")}</button>
      </nav>

      <div className="sidebar-footer">
        <small>© Krushimitra</small>
      </div>
    </aside>
  );
}
