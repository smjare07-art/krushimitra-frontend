import React from "react";
export default function SettingsPanel({ lang }) {
  const t = (mr,hi,en)=> (lang==="mr"?mr:lang==="hi"?hi:en);
  return (
    <section className="card settings">
      <h3>{t("सेटिंग्ज","सेटिंग्स","Settings")}</h3>
      <div className="muted">Language, Notifications, Profile</div>
    </section>
  );
}
