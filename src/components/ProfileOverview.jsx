import React from "react";
import "./ProfileOverview.css";

export default function ProfileOverview({ farmer, lang }) {
  
  // LANGUAGE HANDLER
  const t = (mr, hi, en) =>
    lang === "mr" ? mr : lang === "hi" ? hi : en;

  // जर farmer डेटा उपलब्ध नसेल तर काहीही दाखवू नका
  if (!farmer) return null;

  return (
    <section className="card profile">
      
      {/* TOP SECTION */}
      <div className="profile-top">
        
        {/* PHOTO IF EXISTS */}
        <div className="pf-photo">
          {farmer.photo ? (
            <img src={farmer.photo} alt="farmer" />
          ) : (
            "👨‍🌾"
          )}
        </div>

        <div>
          <h3>{farmer.fullName}</h3>
          <div className="muted">
            {farmer.village} • {farmer.district}
          </div>
        </div>
      </div>

      {/* GRID INFORMATION */}
      <div className="profile-grid">

        {/* Land Area */}
        <div>
          <strong>{t("शेती क्षेत्रफळ","खेत क्षेत्र","Land Area")}</strong>
          <div>{farmer.landArea || "माहिती उपलब्ध नाही"}</div>
        </div>

        {/* Crops */}
        <div>
          <strong>{t("पिके","फसलें","Crops")}</strong>
          <div>{farmer.crops || "माहिती उपलब्ध नाही"}</div>
        </div>

        {/* KYC Status */}
        <div>
          <strong>{t("KYC स्थिती","KYC स्थिति","KYC Status")}</strong>
          <div
            className={`status ${
              farmer.kyc === "Verified" ? "ok" : "pending"
            }`}
          >
            {farmer.kyc || "Pending"}
          </div>
        </div>

      </div>
    </section>
  );
}
