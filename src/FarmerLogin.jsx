import React, { useState } from "react";
import "./FarmerLogin.css";
import { Link, useNavigate } from "react-router-dom";

export default function FarmerLogin() {
  const navigate = useNavigate();

  const [aadhar, setAadhar] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    // FRONTEND VALIDATION
    if (aadhar.length !== 12) {
      alert("कृपया योग्य १२ अंकी आधार क्रमांक टाका");
      return;
    }

    if (!password) {
      alert("कृपया पासवर्ड टाका");
      return;
    }

    // LOGIN SUCCESS → Redirect to Dashboard
    navigate("/farmer/dashboard");
  }

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
              placeholder="१२ अंकी आधार क्रमांक टाका"
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
              placeholder="आपला पासवर्ड टाका"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit" className="login-btn">
            लॉगिन करा
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
