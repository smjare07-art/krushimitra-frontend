import React from "react";
import "./ProfileOverview.css";

export default function ProfileOverview({ farmer, lang }) {
  const t = (mr, hi, en) =>
    lang === "mr" ? mr : lang === "hi" ? hi : en;

  // जर डेटा नसेल तर
  if (!farmer) return null;

  return (
    <section className="profile-card">

      {/* TOP SECTION */}
      <div className="profile-top">
        <div className="profile-photo">
          {farmer.photo ? (
            <img src={farmer.photo} alt="Farmer" />
          ) : (
            "👨‍🌾"
          )}
        </div>

        <div className="profile-basic">
          <h3 className="profile-name">{farmer.fullName}</h3>
          <p className="profile-location">
            {farmer.village} • {farmer.district}
          </p>
        </div>
      </div>

      {/* GRID INFO */}
      <div className="profile-grid">

        <div className="profile-item">
          <strong>{t("शेती क्षेत्रफळ", "खेत क्षेत्र", "Land Area")}</strong>
          <span>{farmer.landArea || "N/A"}</span>
        </div>

        <div className="profile-item">
          <strong>{t("पिके", "फसलें", "Crops")}</strong>
          <span>{farmer.crops || "N/A"}</span>
        </div>

        <div className="profile-item">
          <strong>{t("KYC स्थिती", "KYC स्थिति", "KYC Status")}</strong>
          <span className={farmer.kyc === "Verified" ? "status-ok" : "status-pending"}>
            {farmer.kyc || "Pending"}
          </span>
        </div>

      </div>
    </section>
  );
}
