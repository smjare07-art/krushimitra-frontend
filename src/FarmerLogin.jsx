import React from "react";
import "./FarmerLogin.css";
import { Link } from "react-router-dom";

export default function FarmerLogin() {
  return (
    <div className="login-page">
      <div className="login-card">

        <h2 className="login-title">शेतकरी लॉगिन</h2>

        <form className="login-form">

          <label className="login-label">
            आधार क्रमांक
            <input
              type="text"
              className="login-input"
              placeholder="१२ अंकी आधार क्रमांक टाका"
            />
          </label>

          <label className="login-label">
            पासवर्ड
            <input
              type="password"
              className="login-input"
              placeholder="आपला पासवर्ड टाका"
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
