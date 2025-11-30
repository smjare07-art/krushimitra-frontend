import React from "react";

export default function HeaderBar({ lang, setLang }) {
  const t = (mr, hi, en) => (lang === "mr" ? mr : lang === "hi" ? hi : en);

  return (
    <header className="headerbar">
      <div className="search">
        <input placeholder={t("शोधा पिक इथे...","फसल खोजें...","Search crop here...")} />
      </div>

      <div className="header-right">
        <div className="weather">24°C • {t("आज हवेची माहिती","आज मौसम","Today")}</div>

        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="lang-select"
        >
          <option value="mr">मराठी</option>
          <option value="hi">हिंदी</option>
          <option value="en">English</option>
        </select>

        <div className="avatar">👨</div>
      </div>
    </header>
  );
}
