import React, { useState, useRef } from "react";
import "./FarmerRegister.css";

export default function FarmerRegister() {

  const tabs = [
    { label: "मूळ माहिती", id: "basic" },
    { label: "पत्त्याची माहिती", id: "address" },
    { label: "शेती माहिती", id: "farm" },
    { label: "बँक माहिती", id: "bank" },
    { label: "कागदपत्रे", id: "docs" },
    { label: "अनुभव", id: "exp" },
    { label: "लॉजिस्टिक्स", id: "logi" },
    { label: "सूचना", id: "notify" }
  ];

  const [activeTab, setActiveTab] = useState(0);

  //  SECTION SCROLL HANDLING
  const sectionRefs = {
    basic: useRef(null),
    address: useRef(null),
    farm: useRef(null),
    bank: useRef(null),
    docs: useRef(null),
    exp: useRef(null),
    logi: useRef(null),
    notify: useRef(null),
  };

  const scrollToSection = (id, index) => {
    setActiveTab(index);
    sectionRefs[id].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // ============================
  // FORM + OTP STATE
  // ============================
  const [form, setForm] = useState({
    aadhar: "",
    mobile: "",
    email: "",
  });

  const [otp, setOtp] = useState({
    aadhar: "",
    mobile: "",
    email: ""
  });

  const [otpStatus, setOtpStatus] = useState({
    aadharSent: false,
    aadharVerified: false,
    mobileSent: false,
    mobileVerified: false,
    emailSent: false,
    emailVerified: false
  });

  // GENERATE OTP
  const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

  // SEND + VERIFY OTP
  const sendAadharOtp = () => {
    alert("आपला आधार OTP: " + generateOtp());
    setOtpStatus({ ...otpStatus, aadharSent: true });
  };

  const verifyAadharOtp = () => {
    if (otp.aadhar.length === 6) {
      setOtpStatus({ ...otpStatus, aadharVerified: true });
      alert("आधार पडताळणी यशस्वी!");
    } else alert("चुकीचा OTP!");
  };

  const sendMobileOtp = () => {
    alert("आपला मोबाईल OTP: " + generateOtp());
    setOtpStatus({ ...otpStatus, mobileSent: true });
  };

  const verifyMobileOtp = () => {
    if (otp.mobile.length === 6) {
      setOtpStatus({ ...otpStatus, mobileVerified: true });
      alert("मोबाईल पडताळणी यशस्वी!");
    } else alert("OTP चुकीचा!");
  };

  const sendEmailOtp = () => {
    alert("आपला ईमेल OTP: " + generateOtp());
    setOtpStatus({ ...otpStatus, emailSent: true });
  };

  const verifyEmailOtp = () => {
    if (otp.email.length === 6) {
      setOtpStatus({ ...otpStatus, emailVerified: true });
      alert("ईमेल पडताळणी यशस्वी!");
    } else alert("OTP चुकीचा!");
  };

  return (
    <div className="fr-page">
      <div className="fr-card">
        <h1 className="main-title">🧑‍🌾 शेतकरी नोंदणी फॉर्म</h1>

        {/* ------------------- TABS -------------------- */}
        <div className="fr-tabs">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`fr-tab ${activeTab === index ? "active" : ""}`}
              onClick={() => scrollToSection(tab.id, index)}
            >
              {tab.label}
            </div>
          ))}
        </div>

        {/* ------------------- START FORM -------------------- */}
        <div className="fr-form">

          {/* 1️⃣ BASIC INFO */}
          <h2 ref={sectionRefs.basic} className="section-title">1️⃣ मूळ माहिती</h2>

          <label>पूर्ण नाव *
            <input className="fr-input" required />
          </label>

          {/* AADHAR + OTP */}
          <label>आधार क्रमांक *
            <input
              className="fr-input"
              required
              maxLength="12"
              onChange={(e) =>
                setForm({ ...form, aadhar: e.target.value })
              }
            />
          </label>

          {form.aadhar.length === 12 && !otpStatus.aadharVerified && (
            <button className="otp-btn" type="button" onClick={sendAadharOtp}>
              Send OTP
            </button>
          )}

          {otpStatus.aadharSent && !otpStatus.aadharVerified && (
            <>
              <input
                className="fr-input"
                placeholder="OTP"
                maxLength="6"
                onChange={(e) =>
                  setOtp({ ...otp, aadhar: e.target.value })
                }
              />
              <button className="verify-btn" type="button" onClick={verifyAadharOtp}>
                Verify OTP
              </button>
            </>
          )}

          {otpStatus.aadharVerified && <p className="verified">✔ आधार पडताळला</p>}

          {/* MOBILE + OTP */}
          <label>मोबाईल नंबर *
            <input
              className="fr-input"
              required
              maxLength="10"
              onChange={(e) =>
                setForm({ ...form, mobile: e.target.value })
              }
            />
          </label>

          {form.mobile.length === 10 && !otpStatus.mobileVerified && (
            <button className="otp-btn" type="button" onClick={sendMobileOtp}>
              Send OTP
            </button>
          )}

          {otpStatus.mobileSent && !otpStatus.mobileVerified && (
            <>
              <input
                className="fr-input"
                placeholder="OTP"
                maxLength="6"
                onChange={(e) =>
                  setOtp({ ...otp, mobile: e.target.value })
                }
              />
              <button className="verify-btn" type="button" onClick={verifyMobileOtp}>
                Verify OTP
              </button>
            </>
          )}

          {otpStatus.mobileVerified && <p className="verified">✔ मोबाईल पडताळला</p>}

          {/* EMAIL + OTP */}
          <label>ईमेल *
            <input
              className="fr-input"
              type="email"
              required
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
            />
          </label>

          {form.email.includes("@") && !otpStatus.emailVerified && (
            <button className="otp-btn" type="button" onClick={sendEmailOtp}>
              Send OTP
            </button>
          )}

          {otpStatus.emailSent && !otpStatus.emailVerified && (
            <>
              <input
                className="fr-input"
                placeholder="OTP"
                maxLength="6"
                onChange={(e) =>
                  setOtp({ ...otp, email: e.target.value })
                }
              />
              <button className="verify-btn" type="button" onClick={verifyEmailOtp}>
                Verify OTP
              </button>
            </>
          )}

          {otpStatus.emailVerified && <p className="verified">✔ ईमेल पडताळला</p>}

          {/* -------------------------------------------------
   2️⃣ ADDRESS DETAILS (Required)
--------------------------------------------------- */}
<h2 ref={sectionRefs.address} className="section-title">2️⃣ पत्त्याची माहिती</h2>

<label>राज्य *
  <input className="fr-input" required />
</label>

<label>जिल्हा *
  <input className="fr-input" required />
</label>

<label>तालुका *
  <input className="fr-input" required />
</label>

<label>गाव *
  <input className="fr-input" required />
</label>

<label>पिनकोड *
  <input className="fr-input" required maxLength="6" />
</label>

<label>पूर्ण पत्ता *
  <textarea className="fr-textarea" required></textarea>
</label>


{/* -------------------------------------------------
   3️⃣ FARM DETAILS (Required)
--------------------------------------------------- */}
<h2 ref={sectionRefs.farm} className="section-title">3️⃣ शेतीची माहिती</h2>

<label>जमिनीचे क्षेत्रफळ (एकर/हेक्टर) *
  <input className="fr-input" required />
</label>

<label>जमिनीचा प्रकार *
  <select className="fr-input" required>
    <option value="">निवडा</option>
    <option>जिरायती</option>
    <option>सिंचित</option>
    <option>बागायती</option>
  </select>
</label>

<label>नेहमी घेतली जाणारी पिके *
  <input className="fr-input" required placeholder="उदा. सोयाबीन, ऊस, गहू" />
</label>

<label>सध्याची उपलब्ध पिके *
  <input className="fr-input" required />
</label>

<label>भविष्यातील पिके (Upcoming) *
  <input className="fr-input" required />
</label>


{/* -------------------------------------------------
   4️⃣ BANK DETAILS (Required)
--------------------------------------------------- */}
<h2 ref={sectionRefs.bank} className="section-title">4️⃣ बँक माहिती</h2>

<label>बँक खाते क्रमांक *
  <input className="fr-input" required />
</label>

<label>IFSC कोड *
  <input className="fr-input" required />
</label>

<label>बँकेचे नाव *
  <input className="fr-input" required />
</label>

<label>शाखा *
  <input className="fr-input" required />
</label>

<label>UPI ID (ऐच्छिक)
  <input className="fr-input" />
</label>


{/* -------------------------------------------------
   5️⃣ DOCUMENTS (Required)
--------------------------------------------------- */}
<h2 ref={sectionRefs.docs} className="section-title">5️⃣ कागदपत्रे</h2>

<label>आधार क्रमांक *
  <input className="fr-input" required maxLength="12" />
</label>

<label>PAN क्रमांक *
  <input className="fr-input" required />
</label>

<label>7/12 उतारा (Upload) *
  <input type="file" className="fr-input" required />
</label>

<label>Passport-size फोटो (Upload) *
  <input type="file" className="fr-input" required />
</label>


{/* -------------------------------------------------
   6️⃣ EXPERIENCE (Optional but Visible)
--------------------------------------------------- */}
<h2 ref={sectionRefs.exp} className="section-title">6️⃣ शेतीचा अनुभव</h2>

<label>शेतीचा अनुभव (वर्षे)
  <input className="fr-input" type="number" />
</label>

<label>तज्ञता असलेली पिके
  <input className="fr-input" />
</label>

<label>Organic / Non-Organic माहिती
  <input className="fr-input" />
</label>


{/* -------------------------------------------------
   7️⃣ LOGISTICS (Optional but Useful)
--------------------------------------------------- */}
<h2 ref={sectionRefs.logi} className="section-title">7️⃣ वाहतूक माहिती</h2>

<label>स्वतःकडे वाहन उपलब्ध?
  <select className="fr-input">
    <option>निवडा</option>
    <option>होय</option>
    <option>नाही</option>
  </select>
</label>

<label>स्वतः डिलिव्हरी करू शकता?
  <select className="fr-input">
    <option>निवडा</option>
    <option>होय</option>
    <option>नाही</option>
  </select>
</label>

<label>Transport ची गरज आहे?
  <select className="fr-input">
    <option>निवडा</option>
    <option>होय</option>
    <option>नाही</option>
  </select>
</label>


{/* -------------------------------------------------
   8️⃣ NOTIFICATIONS (Optional)
--------------------------------------------------- */}
<h2 ref={sectionRefs.notify} className="section-title">8️⃣ सूचना पर्याय</h2>

<label className="checkbox">
  <input type="checkbox" /> SMS अलर्ट
</label>

<label className="checkbox">
  <input type="checkbox" /> बाजारभाव अलर्ट
</label>

<label className="checkbox">
  <input type="checkbox" /> हवामान अलर्ट
</label>

<label className="checkbox">
  <input type="checkbox" /> कंपनी ऑफर अलर्ट
</label>

          <br /><br />

          <button className="btn-save">Save</button>
        </div>
      </div>
    </div>
  );
}
