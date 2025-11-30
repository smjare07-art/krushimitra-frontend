import React from "react";
export default function CropAdvisory({ lang }) {
  const t = (mr,hi,en)=> (lang==="mr"?mr:lang==="hi"?hi:en);
  return (
    <section className="card advisory">
      <h3>{t("पिक सल्ला","सलाह","Crop Advisory")}</h3>
      <div className="muted">Photo upload → AI detection (Coming soon)</div>
    </section>
  );
}
