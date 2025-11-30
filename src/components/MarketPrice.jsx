import React from "react";

export default function MarketPrice({ lang }) {
  const t = (mr, hi, en) => (lang === "mr" ? mr : lang === "hi" ? hi : en);
  // dummy list
  const prices = [
    { crop: "गहू", price: "₹2,100/qtl" },
    { crop: "सورياबीन", price: "₹3,500/qtl" },
    { crop: "भात", price: "₹2,400/qtl" },
  ];

  return (
    <section className="card market">
      <h3>{t("आजचे बाजारभाव","आज के बाजार भाव","Market Price Today")}</h3>
      <ul>
        {prices.map((p,i)=>(
          <li key={i}><strong>{p.crop}</strong> <span className="muted">{p.price}</span></li>
        ))}
      </ul>

      <div className="mini-chart muted">{t("7 दिवसांचा ट्रेंड (डमी)","7 दिन का ट्रेंड","7-day trend (dummy)")}</div>
    </section>
  );
}
