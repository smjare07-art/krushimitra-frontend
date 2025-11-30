import React from "react";
export default function Payments({ lang }) {
  const t = (mr,hi,en)=> (lang==="mr"?mr:lang==="hi"?hi:en);
  return (
    <section className="card payments">
      <h3>{t("पेमेंट्स","पेमेंट्स","Payments")}</h3>
      <div className="pay-grid">
        <div><strong>₹1,20,000</strong><div className="muted">Total earnings</div></div>
        <div><strong>₹12,000</strong><div className="muted">Pending</div></div>
        <div><strong>₹1,08,000</strong><div className="muted">Settled</div></div>
      </div>
    </section>
  );
}
