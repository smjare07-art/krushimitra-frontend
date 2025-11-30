import React, { useState, useRef } from "react";
import "./FarmerRegister.css";

import { db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function FarmerRegister() {
  const navigate = useNavigate();
  const storage = getStorage();

  // ======================================================
  // FORM STATE
  // ======================================================
  const [form, setForm] = useState({
    fullName: "",
    aadhar: "",
    mobile: "",
    email: "",

    state: "",
    district: "",
    taluka: "",
    village: "",
    pincode: "",
    fullAddress: "",

    landArea: "",
    landType: "",
    crops: "",
    currentCrops: "",
    upcomingCrops: "",

    bankAccount: "",
    ifsc: "",
    bankName: "",
    branch: "",
    upi: "",

    pan: "",
    photo: null,

    expYears: "",
    expertise: "",
    organicInfo: "",

    hasVehicle: "",
    canDeliver: "",
    needTransport: "",

    sms: false,
    price: false,
    weather: false,
    offers: false,
  });

  const update = (f, v) => setForm({ ...form, [f]: v });

  // ======================================================
  // PASSWORD
  // ======================================================
  const [passwords, setPasswords] = useState({
    pass: "",
    confirm: "",
  });
  const [passError, setPassError] = useState("");

  const updatePassword = (f, v) => {
    const d = { ...passwords, [f]: v };
    setPasswords(d);

    if (d.pass !== d.confirm) setPassError("Passwords do not match");
    else setPassError("");
  };

  // ======================================================
  // PHOTO UPLOAD PREVIEW
  // ======================================================
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, photo: file });

    if (file) setPhotoPreview(URL.createObjectURL(file));
  };

  // ======================================================
  // OTP SYSTEM
  // ======================================================
  const generateOtp = () =>
    Math.floor(100000 + Math.random() * 900000);

  const [otp, setOtp] = useState({
    aadhar: "",
    mobile: "",
    email: "",
  });

  const [otpStatus, setOtpStatus] = useState({
    aadharSent: false,
    aadharVerified: false,
    mobileSent: false,
    mobileVerified: false,
    emailSent: false,
    emailVerified: false,
  });

  const sendOtp = (type) => {
    alert("तुमचा OTP: " + generateOtp());
    setOtpStatus((o) => ({ ...o, [type + "Sent"]: true }));
  };

  const verifyOtp = (type) => {
    if (otp[type].length === 6) {
      setOtpStatus((o) => ({ ...o, [type + "Verified"]: true }));
      alert(type.toUpperCase() + " पडताळणी यशस्वी!");
    } else {
      alert("Wrong OTP!");
    }
  };

  // ======================================================
  // SAVE FORM
  // ======================================================
  const handleRegister = async (e) => {
    e.preventDefault();

    if (passwords.pass !== passwords.confirm) {
      alert("Passwords do not match!");
      return;
    }

    if (
      !otpStatus.aadharVerified ||
      !otpStatus.mobileVerified ||
      !otpStatus.emailVerified
    ) {
      alert("कृपया सर्व OTP पडताळा!");
      return;
    }

    try {
      let photoURL = "";

      // ------------------------------
      // UPLOAD PHOTO TO FIREBASE STORAGE
      // ------------------------------
      if (form.photo) {
        const fileRef = ref(storage, `farmer_photos/${form.aadhar}.jpg`);
        await uploadBytes(fileRef, form.photo);
        photoURL = await getDownloadURL(fileRef);
      }

      // ------------------------------
      // SAVE DATA TO FIRESTORE
      // ------------------------------
      await setDoc(doc(db, "farmers", form.aadhar), {
        ...form,
        photo: photoURL,
        password: passwords.pass,
      });

      alert("नोंदणी पूर्ण!");
      navigate("/farmer/login");
    } catch (err) {
      alert("ERROR: " + err.message);
    }
  };

  // ======================================================
  // UI SECTIONS + SCROLL
  // ======================================================
  const tabs = [
    { label: "मूळ माहिती", id: "basic" },
    { label: "पत्ता", id: "address" },
    { label: "शेती", id: "farm" },
    { label: "बँक", id: "bank" },
    { label: "सुरक्षा", id: "security" },
    { label: "कागदपत्रे", id: "docs" },
    { label: "अनुभव", id: "exp" },
    { label: "लॉजिस्टिक्स", id: "logi" },
    { label: "सूचना", id: "notify" },
  ];

  const [activeTab, setActiveTab] = useState(0);
  const refs = {
    basic: useRef(null),
    address: useRef(null),
    farm: useRef(null),
    bank: useRef(null),
    security: useRef(null),
    docs: useRef(null),
    exp: useRef(null),
    logi: useRef(null),
    notify: useRef(null),
  };

  const scrollTo = (id, i) => {
    setActiveTab(i);
    refs[id].current.scrollIntoView({ behavior: "smooth" });
  };

  // ======================================================
  // UI
  // ======================================================
  return (
    <div className="fr-page">
      <div className="fr-card">
        <h1 className="main-title">🧑‍🌾 शेतकरी नोंदणी</h1>

        {/* TABS */}
        <div className="fr-tabs">
          {tabs.map((t, i) => (
            <div
              key={i}
              className={`fr-tab ${activeTab === i ? "active" : ""}`}
              onClick={() => scrollTo(t.id, i)}
            >
              {t.label}
            </div>
          ))}
        </div>

        {/* FORM */}
        <form className="fr-form" onSubmit={handleRegister}>

          {/* BASIC */}
          <h2 ref={refs.basic} className="section-title">1️⃣ मूळ माहिती</h2>

          <label>पूर्ण नाव *
            <input className="fr-input" required onChange={(e) => update("fullName", e.target.value)} />
          </label>

          <label>आधार *
            <input className="fr-input" maxLength="12" required onChange={(e) => update("aadhar", e.target.value)} />
          </label>

          {form.aadhar.length === 12 && !otpStatus.aadharVerified && (
            <button type="button" className="otp-btn" onClick={() => sendOtp("aadhar")}>Send OTP</button>
          )}

          {otpStatus.aadharSent && !otpStatus.aadharVerified && (
            <>
              <input maxLength="6" className="fr-input" placeholder="OTP" onChange={(e) => setOtp({ ...otp, aadhar: e.target.value })} />
              <button type="button" className="verify-btn" onClick={() => verifyOtp("aadhar")}>Verify</button>
            </>
          )}

          {otpStatus.aadharVerified && <p className="verified">✔ आधार पडताळला</p>}

          <label>मोबाईल *
            <input className="fr-input" maxLength="10" required onChange={(e) => update("mobile", e.target.value)} />
          </label>

          {form.mobile.length === 10 && !otpStatus.mobileVerified && (
            <button type="button" className="otp-btn" onClick={() => sendOtp("mobile")}>Send OTP</button>
          )}

          {otpStatus.mobileSent && !otpStatus.mobileVerified && (
            <>
              <input maxLength="6" className="fr-input" placeholder="OTP" onChange={(e) => setOtp({ ...otp, mobile: e.target.value })} />
              <button type="button" className="verify-btn" onClick={() => verifyOtp("mobile")}>Verify</button>
            </>
          )}

          {otpStatus.mobileVerified && <p className="verified">✔ मोबाईल पडताळला</p>}

          <label>ईमेल *
            <input className="fr-input" type="email" required onChange={(e) => update("email", e.target.value)} />
          </label>

          {form.email.includes("@") && !otpStatus.emailVerified && (
            <button type="button" className="otp-btn" onClick={() => sendOtp("email")}>Send OTP</button>
          )}

          {otpStatus.emailSent && !otpStatus.emailVerified && (
            <>
              <input maxLength="6" className="fr-input" placeholder="OTP" onChange={(e) => setOtp({ ...otp, email: e.target.value })} />
              <button type="button" className="verify-btn" onClick={() => verifyOtp("email")}>Verify</button>
            </>
          )}

          {otpStatus.emailVerified && <p className="verified">✔ ईमेल पडताळला</p>}

          {/* ADDRESS */}
          <h2 ref={refs.address} className="section-title">2️⃣ पत्ता</h2>
          <label>राज्य<input className="fr-input" required onChange={(e) => update("state", e.target.value)} /></label>
          <label>जिल्हा<input className="fr-input" required onChange={(e) => update("district", e.target.value)} /></label>
          <label>तालुका<input className="fr-input" required onChange={(e) => update("taluka", e.target.value)} /></label>
          <label>गाव<input className="fr-input" required onChange={(e) => update("village", e.target.value)} /></label>
          <label>पिनकोड<input className="fr-input" maxLength="6" required onChange={(e) => update("pincode", e.target.value)} /></label>
          <label>पूर्ण पत्ता<textarea className="fr-textarea" required onChange={(e) => update("fullAddress", e.target.value)}></textarea></label>

          {/* FARM */}
          <h2 ref={refs.farm} className="section-title">3️⃣ शेती</h2>

          <label>जमिनीचे क्षेत्रफळ<input className="fr-input" required onChange={(e) => update("landArea", e.target.value)} /></label>

          <label>जमिनीचा प्रकार
            <select className="fr-input" required onChange={(e) => update("landType", e.target.value)}>
              <option value="">निवडा</option>
              <option>जिरायती</option>
              <option>सिंचित</option>
              <option>बागायती</option>
            </select>
          </label>

          <label>नेहमी पिके<input className="fr-input" required onChange={(e) => update("crops", e.target.value)} /></label>
          <label>सध्याची पिके<input className="fr-input" required onChange={(e) => update("currentCrops", e.target.value)} /></label>
          <label>भविष्यातील पिके<input className="fr-input" required onChange={(e) => update("upcomingCrops", e.target.value)} /></label>

          {/* BANK */}
          <h2 ref={refs.bank} className="section-title">4️⃣ बँक माहिती</h2>

          <label>बँक खाते<input className="fr-input" required onChange={(e) => update("bankAccount", e.target.value)} /></label>
          <label>IFSC<input className="fr-input" required onChange={(e) => update("ifsc", e.target.value)} /></label>
          <label>बँक नाव<input className="fr-input" required onChange={(e) => update("bankName", e.target.value)} /></label>
          <label>शाखा<input className="fr-input" required onChange={(e) => update("branch", e.target.value)} /></label>
          <label>UPI<input className="fr-input" onChange={(e) => update("upi", e.target.value)} /></label>

          {/* SECURITY */}
          <h2 ref={refs.security} className="section-title">5️⃣ सुरक्षा (Password + Photo)</h2>

          <label>पासवर्ड *
            <input className="fr-input" type="password" required onChange={(e) => updatePassword("pass", e.target.value)} />
          </label>

          <label>पासवर्ड पुन्हा टाका *
            <input className="fr-input" type="password" required onChange={(e) => updatePassword("confirm", e.target.value)} />
          </label>

          {passError && <p style={{ color: "red" }}>{passError}</p>}

          <h3>🖼 प्रोफाइल फोटो अपलोड करा</h3>
          <input type="file" accept="image/*" onChange={handleImage} />

          {photoPreview && (
            <img
              src={photoPreview}
              style={{
                width: "150px",
                marginTop: "10px",
                borderRadius: "10px",
                border: "2px solid #ccc"
              }}
            />
          )}

          {/* DOCS */}
          <h2 ref={refs.docs} className="section-title">6️⃣ कागदपत्रे</h2>
          <label>PAN<input className="fr-input" required onChange={(e) => update("pan", e.target.value)} /></label>

          {/* EXPERIENCE */}
          <h2 ref={refs.exp} className="section-title">7️⃣ अनुभव</h2>
          <label>अनुभव (वर्षे)<input className="fr-input" type="number" onChange={(e) => update("expYears", e.target.value)} /></label>
          <label>तज्ञ पिके<input className="fr-input" onChange={(e) => update("expertise", e.target.value)} /></label>
          <label>Organic माहिती<input className="fr-input" onChange={(e) => update("organicInfo", e.target.value)} /></label>

          {/* LOGISTICS */}
          <h2 ref={refs.logi} className="section-title">8️⃣ लॉजिस्टिक्स</h2>
          <label>वाहन<select className="fr-input" onChange={(e) => update("hasVehicle", e.target.value)}>
            <option>निवडा</option>
            <option>होय</option>
            <option>नाही</option>
          </select></label>

          {/* NOTIFICATIONS */}
          <h2 ref={refs.notify} className="section-title">9️⃣ सूचना</h2>

          <label className="checkbox"><input type="checkbox" onChange={(e) => update("sms", e.target.checked)} /> SMS</label>
          <label className="checkbox"><input type="checkbox" onChange={(e) => update("price", e.target.checked)} /> बाजारभाव</label>
          <label className="checkbox"><input type="checkbox" onChange={(e) => update("weather", e.target.checked)} /> हवामान</label>
          <label className="checkbox"><input type="checkbox" onChange={(e) => update("offers", e.target.checked)} /> ऑफर</label>

          <br /><br />
          <button className="btn-save" type="submit">Save</button>

        </form>
      </div>
    </div>
  );
}
