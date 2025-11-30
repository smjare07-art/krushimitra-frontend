import React, { useState } from "react";
import "./FarmerLogin.css";
import { Link, useNavigate } from "react-router-dom";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

export default function FarmerLogin() {
  const navigate = useNavigate();

  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (aadhar.length !== 12) {
      alert("कृपया योग्य 12 अंकी आधार क्रमांक टाका");
      return;
    }
    if (!password) {
      alert("कृपया पासवर्ड टाका");
      return;
    }

    try {
      setLoading(true);

      const ref = doc(db, "farmers", aadhar);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        alert("हा आधार नोंदणीकृत नाही");
        return;
      }

      const data = snap.data();

      if (data.password !== password) {
        alert("चुकीचा पासवर्ड!");
        return;
      }

      localStorage.setItem("farmer", JSON.stringify(data));

      alert("लॉगिन यशस्वी!");
      navigate("/farmer/dashboard");

    } catch (err) {
      alert("Login Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2 className="login-title">शेतकरी लॉगिन</h2>

        <form className="login-form" onSubmit={handleLogin}>
          <label className="login-label">
            आधार क्रमांक *
            <input
              type="text"
              className="login-input"
              maxLength="12"
              required
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
            />
          </label>

          <label className="login-label">
            पासवर्ड *
            <input
              type="password"
              className="login-input"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button className="login-btn">
            {loading ? "कृपया थांबा..." : "लॉगिन करा"}
          </button>

          <p className="login-text">
            नवीन खाते नाही?{" "}
            <Link to="/farmer/register" className="login-link">
              नोंदणी करा
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
