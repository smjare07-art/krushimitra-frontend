import React, { useEffect, useState } from "react";
import "./crop.css";

export default function CropAdvisory({ lang }) {
  const [advice, setAdvice] = useState(null);
  const [loading, setLoading] = useState(true);

  const crop = "Soybean"; // ← नंतर farmer.crops वापरून auto-detect करू

  useEffect(() => {
    fetchAdvice();
  }, []);

  // FREE API: Smart Crop Advisory (No Key Required)
  const fetchAdvice = async () => {
    try {
      const res = await fetch(
        `https://krushi-api.vercel.app/advice?crop=${crop}`
      );

      const data = await res.json();
      setAdvice(data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  if (loading)
    return <div className="crop-card">⏳ पिक सल्ला मिळत आहे...</div>;

  if (!advice)
    return <div className="crop-card">❌ पिक सल्ला उपलब्ध नाही</div>;

  return (
    <div className="crop-card">
      <h3>🌱 पिक सल्ला ({advice.crop})</h3>

      <p className="c-title">🧪 माती सल्ला</p>
      <p className="c-text">{advice.soil}</p>

      <p className="c-title">💧 पाणी व्यवस्थापन</p>
      <p className="c-text">{advice.irrigation}</p>

      <p className="c-title">🧴 खत व्यवस्थापन</p>
      <p className="c-text">{advice.fertilizer}</p>

      <p className="c-title">🦠 रोग व कीड नियंत्रण</p>
      <p className="c-text">{advice.pests}</p>
    </div>
  );
}
