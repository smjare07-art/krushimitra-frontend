import React from "react";

export default function ProfileOverview({ lang }) {
  const t = (mr, hi, en) => (lang === "mr" ? mr : lang === "hi" ? hi : en);
  // dummy data
  const profile = {
    name: "राम गावडे",
    village: "पालघर",
    district: "पालघर",
    photo: null,
    landArea: "5 acres",
    crops: "गहू, सोयाबीन",
    kyc: "Verified",
  };

  return (
    <section className="card profile">
      <div className="profile-top">
        <div className="pf-photo">👨‍🌾</div>
        <div>
          <h3>{profile.name}</h3>
          <div className="muted">{profile.village} • {profile.district}</div>
        </div>
      </div>

      <div className="profile-grid">
        <div><strong>{t("शेती क्षेत्रफळ","खेत क्षेत्र","Land Area")}</strong><div>{profile.landArea}</div></div>
        <div><strong>{t("पिके","फसलें","Crops")}</strong><div>{profile.crops}</div></div>
        <div><strong>{t("KYC स्थिती","KYC स्थिति","KYC Status")}</strong><div className={`status ${profile.kyc==="Verified"?"ok":"pending"}`}>{profile.kyc}</div></div>
      </div>
    </section>
  );
}
