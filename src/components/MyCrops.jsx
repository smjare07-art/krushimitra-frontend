import React from "react";

export default function MyCrops({ lang }) {
  const t = (mr,hi,en)=> (lang==="mr"?mr:lang==="hi"?hi:en);
  const crops = [
    { name:"गहू", stock:"10 qtl", grade:"A", ready:"Yes", est:"2025-04-10" },
    { name:"मका", stock:"5 qtl", grade:"B", ready:"No", est:"2025-05-20" },
  ];

  return (
    <section className="card mycrops">
      <h3>{t("माझी पिके","मेरी फसलें","My Crops")}</h3>
      <table>
        <thead><tr><th>{t("पिक","Crop","Crop")}</th><th>{t("स्टॉक","Stock","Stock")}</th><th>{t("गुणवत्ता","Grade","Grade")}</th><th>{t("विक्रीस तयार","Ready to sell","Ready")}</th><th>{t("अनुमानित","Est. Harvest","Est.")}</th></tr></thead>
        <tbody>
          {crops.map((c,i)=>(
            <tr key={i}>
              <td>{c.name}</td>
              <td>{c.stock}</td>
              <td>{c.grade}</td>
              <td>{c.ready}</td>
              <td>{c.est}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
