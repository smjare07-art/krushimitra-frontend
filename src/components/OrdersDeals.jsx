import React from "react";
export default function OrdersDeals({ lang }) {
  const t = (mr,hi,en)=> (lang==="mr"?mr:lang==="hi"?hi:en);
  return (
    <section className="card orders">
      <h3>{t("ऑर्डर्स व डील्स","ऑर्डर्स","Orders & Deals")}</h3>
      <div className="muted">In Progress: 2 • Completed: 5 • Cancelled: 1</div>
    </section>
  );
}

