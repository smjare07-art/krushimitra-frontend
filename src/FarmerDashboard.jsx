import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import { db } from "./firebase";
import { doc, updateDoc } from "firebase/firestore";
import "./dashboard.css";

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const [farmer, setFarmer] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("farmer"));
    if (!data) {
      navigate("/farmer/login");
      return;
    }
    setFarmer(data);
  }, []);

  if (!farmer) return <div className="loading">Loading...</div>;

  // UPDATE FIREBASE
  const handleUpdate = async () => {
    try {
      const ref = doc(db, "farmers", farmer.aadhar);

      await updateDoc(ref, farmer);

      localStorage.setItem("farmer", JSON.stringify(farmer));
      alert("माहिती अपडेट झाली!");
      setEditMode(false);
    } catch (err) {
      alert("UPDATE ERROR: " + err.message);
    }
  };

  return (
    <div className="dash-root">

      <Sidebar />

      <div className="dash-main">
        <div className="farmer-info-card">

          {/* HEADER ROW */}
          <div className="info-header">
            <h2>शेतकऱ्याची माहिती</h2>
            <button className="edit-btn" onClick={() => setEditMode(!editMode)}>
              ✏ Edit
            </button>
          </div>

          {/* ===== VIEW MODE ===== */}
          {!editMode && (
            <div className="info-grid">
              <div><strong>नाव:</strong> {farmer.fullName}</div>
              <div><strong>मोबाईल:</strong> {farmer.mobile}</div>
              <div><strong>आधार:</strong> {farmer.aadhar}</div>
              <div><strong>राज्य:</strong> {farmer.state}</div>
              <div><strong>जिल्हा:</strong> {farmer.district}</div>
              <div><strong>तालुका:</strong> {farmer.taluka}</div>
              <div><strong>गाव:</strong> {farmer.village}</div>
              <div><strong>पत्ता:</strong> {farmer.fullAddress}</div>
              <div><strong>पिके:</strong> {farmer.crops}</div>
              <div><strong>शेती क्षेत्रफळ:</strong> {farmer.landArea}</div>
              <div><strong>KYC स्थिती:</strong> {farmer.kyc}</div>
            </div>
          )}

          {/* ===== EDIT MODE ===== */}
          {editMode && (
            <div className="edit-grid">

              <label>नाव
                <input
                  value={farmer.fullName}
                  onChange={(e) => setFarmer({ ...farmer, fullName: e.target.value })}
                />
              </label>

              <label>मोबाईल
                <input
                  value={farmer.mobile}
                  onChange={(e) => setFarmer({ ...farmer, mobile: e.target.value })}
                />
              </label>

              <label>आधार
                <input
                  value={farmer.aadhar}
                  readOnly
                />
              </label>

              <label>जिल्हा
                <input
                  value={farmer.district}
                  onChange={(e) => setFarmer({ ...farmer, district: e.target.value })}
                />
              </label>

              <label>तालुका
                <input
                  value={farmer.taluka}
                  onChange={(e) => setFarmer({ ...farmer, taluka: e.target.value })}
                />
              </label>

              <label>गाव
                <input
                  value={farmer.village}
                  onChange={(e) => setFarmer({ ...farmer, village: e.target.value })}
                />
              </label>

              <label>पिके
                <input
                  value={farmer.crops}
                  onChange={(e) => setFarmer({ ...farmer, crops: e.target.value })}
                />
              </label>

              <label>शेती क्षेत्रफळ
                <input
                  value={farmer.landArea}
                  onChange={(e) => setFarmer({ ...farmer, landArea: e.target.value })}
                />
              </label>

              <label>पत्ता
                <textarea
                  value={farmer.fullAddress}
                  onChange={(e) => setFarmer({ ...farmer, fullAddress: e.target.value })}
                ></textarea>
              </label>

              <button className="update-btn" onClick={handleUpdate}>
                अपडेट करा
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
