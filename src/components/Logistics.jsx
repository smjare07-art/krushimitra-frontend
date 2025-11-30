import React from "react";
export default function Logistics({ lang }) {
  const t = (mr,hi,en)=> (lang==="mr"?mr:lang==="hi"?hi:en);
  return (
    <section className="card logistics">
      <h3>{t("लॉजिस्टिक्स","लॉजिस्टिक्स","Logistics")}</h3>
      <div className="muted">Pickup scheduled: 2025-04-06 • Driver: Ram • Vehicle: TR-1234</div>
    </section>
  );
}
