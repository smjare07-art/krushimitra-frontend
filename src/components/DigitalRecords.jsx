import React from "react";
export default function DigitalRecords({ lang }) {
  const t = (mr,hi,en)=> (lang==="mr"?mr:lang==="hi"?hi:en);
  return (
    <section className="card records">
      <h3>{t("डिजिटल रेकॉर्ड","डिजिटल रिकॉर्ड","Digital Records")}</h3>
      <div className="muted">Sales history, expenses, download PDF</div>
    </section>
  );
}
