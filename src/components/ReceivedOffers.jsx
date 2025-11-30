import React from "react";
export default function ReceivedOffers({ lang }) {
  const t = (mr,hi,en)=> (lang==="mr"?mr:lang==="hi"?hi:en);
  const offers = [
    { company:"AgroCorp", crop:"गहू", price:"₹2,200/qtl", expiry:"2025-04-02" },
    { company:"FarmBuy", crop:"मका", price:"₹3,100/qtl", expiry:"2025-04-05" },
  ];
  return (
    <section className="card offers">
      <h3>{t("ऑफर प्राप्त","ऑफर्स","Received Offers")}</h3>
      {offers.map((o,i)=>(
        <div key={i} className="offer-row">
          <div><strong>{o.company}</strong> • {o.crop}</div>
          <div>{o.price}</div>
          <div className="muted">{t("अवधी","समाप्त","Expires")}: {o.expiry}</div>
          <div><button className="tiny">Accept</button> <button className="tiny btn-red">Reject</button></div>
        </div>
      ))}
    </section>
  );
}
