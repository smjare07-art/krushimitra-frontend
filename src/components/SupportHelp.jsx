import React from "react";
export default function SupportHelp({ lang }) {
  const t = (mr,hi,en)=> (lang==="mr"?mr:lang==="hi"?hi:en);
  return (
    <section className="card support">
      <h3>{t("सहाय्य","सहायता","Support / Help")}</h3>
      <div><button className="tiny">Chat</button> <button className="tiny">Call</button></div>
    </section>
  );
}
