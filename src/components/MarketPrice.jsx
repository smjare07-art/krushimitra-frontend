import React, { useEffect, useState } from "react";
import "./market.css";

export default function MarketPrice() {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    try {
      const url = "https://bharatmarketapi.onrender.com/api/prices/today";

      const res = await fetch(url);
      const data = await res.json();

      setPrices(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      alert("Market API Error!");
      setLoading(false);
    }
  };

  if (loading) return <div className="market-card">⏳ बाजारभाव मिळत आहेत...</div>;

  return (
    <div className="market-card">
      <h3>📈 आजचे बाजारभाव</h3>

      {prices.map((item, i) => (
        <div key={i} className="market-row">
          <div className="crop-name">{item.crop}</div>
          <div className="crop-price">₹{item.price}</div>
          <div className="market-place">{item.market}</div>
        </div>
      ))}
    </div>
  );
}
