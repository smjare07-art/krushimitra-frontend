import React, { useState } from "react";
import "./sell.css";
import { db, storage } from "./firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function FarmerSell() {
  const navigate = useNavigate();
  const farmer = JSON.parse(localStorage.getItem("farmer"));

  // FORM STATE
  const [form, setForm] = useState({
    name: farmer?.fullName || "",
    mobile: farmer?.mobile || "",
    village: farmer?.village || "",
    taluka: farmer?.taluka || "",
    district: farmer?.district || "",
    aadhar: farmer?.aadhar || "",
    cropName: "",
    variety: "",
    quality: "A",
    moisture: "",
    cleanliness: "",
    quantity: "",
    bags: "",
    weightType: "किलो",
    expectedPrice: "",
    companySuggestedPrice: "",
    availabilityDate: "",
    availabilityNow: "होय",
    packingType: "बॅगा",
    bagWeight: "",
    bagCondition: "नवी",
    transportBy: "company",
    pickupLocation: "",
    pickupTime: "",
    bankAccount: "",
    ifsc: "",
    bankName: "",
    upi: "",
    paymentDays: "same-day",
    pestIssue: "नाही",
    storage: "",
    organicCert: null
  });

  // IMAGES
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle Input Changes
  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // Upload Function
  const uploadData = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Upload images one by one
      let imgUrls = [];

      for (let i = 0; i < images.length; i++) {
        const imgRef = ref(
          storage,
          `sell/${Date.now()}-${images[i].name}`
        );
        await uploadBytes(imgRef, images[i]);
        const url = await getDownloadURL(imgRef);
        imgUrls.push(url);
      }

      // Save form
      await addDoc(collection(db, "market_sell"), {
        ...form,
        images: imgUrls,
        createdAt: new Date(),
        farmerAadhar: farmer?.aadhar || "",
        status: "Available",
      });

      alert("माल यशस्वीरीत्या अपलोड झाला!");
      navigate("/farmer/dashboard");

    } catch (err) {
      alert("ERROR: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="sell-page">
      <div className="sell-card">

        <h2>🌾 विक्रीसाठी माल अपलोड</h2>

        <form onSubmit={uploadData}>

          {/* 1️⃣ Farmer Details */}
          <h3 className="section-title">1️⃣ शेतकऱ्याची माहिती</h3>

          <label>नाव *</label>
          <input value={form.name} onChange={(e)=>update("name", e.target.value)} required />

          <label>मोबाईल नंबर *</label>
          <input value={form.mobile} onChange={(e)=>update("mobile", e.target.value)} required />

          <label>गाव *</label>
          <input value={form.village} onChange={(e)=>update("village", e.target.value)} />

          <label>तालुका *</label>
          <input value={form.taluka} onChange={(e)=>update("taluka", e.target.value)} />

          <label>जिल्हा *</label>
          <input value={form.district} onChange={(e)=>update("district", e.target.value)} />

          <label>आधार क्रमांक (Optional)</label>
          <input value={form.aadhar} onChange={(e)=>update("aadhar", e.target.value)} />

          {/* 2️⃣ Crop Details */}
          <h3 className="section-title">2️⃣ पिकाची माहिती</h3>

          <label>पिकाचे नाव *</label>
          <input value={form.cropName} onChange={(e)=>update("cropName", e.target.value)} required />

          <label>जात (Variety)</label>
          <input value={form.variety} onChange={(e)=>update("variety", e.target.value)} />

          <label>गुणवत्ता *</label>
          <select value={form.quality} onChange={(e)=>update("quality", e.target.value)}>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>

          <label>ओलावा % *</label>
          <input value={form.moisture} onChange={(e)=>update("moisture", e.target.value)} required />

          <label>स्वच्छता % *</label>
          <input value={form.cleanliness} onChange={(e)=>update("cleanliness", e.target.value)} required />

          {/* 3️⃣ Quantity */}
          <h3 className="section-title">3️⃣ उपलब्ध प्रमाण</h3>

          <label>मात्रा (क्विंटल/टन) *</label>
          <input value={form.quantity} onChange={(e)=>update("quantity", e.target.value)} required />

          <label>बॅगा/क्रेट्स *</label>
          <input value={form.bags} onChange={(e)=>update("bags", e.target.value)} required />

          <label>वजन पद्धत *</label>
          <select value={form.weightType} onChange={(e)=>update("weightType", e.target.value)}>
            <option>किलो</option>
            <option>टन</option>
          </select>

          {/* 4️⃣ Price */}
          <h3 className="section-title">4️⃣ अपेक्षित किंमत</h3>

          <label>अपेक्षित दर (₹) *</label>
          <input value={form.expectedPrice} onChange={(e)=>update("expectedPrice", e.target.value)} required />

          <label>कंपनी सुचवलेला दर</label>
          <input value={form.companySuggestedPrice} onChange={(e)=>update("companySuggestedPrice", e.target.value)} />

          {/* 5️⃣ Availability */}
          <h3 className="section-title">5️⃣ उपलब्धता</h3>

          <label>उपलब्ध तारीख *</label>
          <input type="date" value={form.availabilityDate} onChange={(e)=>update("availabilityDate", e.target.value)} />

          <label>तात्काळ उपलब्ध?</label>
          <select value={form.availabilityNow} onChange={(e)=>update("availabilityNow", e.target.value)}>
            <option>होय</option>
            <option>नाही</option>
          </select>

          {/* 6️⃣ Images */}
          <h3 className="section-title">6️⃣ फोटो / व्हिडिओ</h3>

          <label>पिकाचे फोटो (2–3) *</label>
          <input 
            type="file"
            accept="image/*"
            multiple
            onChange={(e)=>setImages([...e.target.files])}
            required
          />

          <label>Quality proof (optional)</label>
          <input type="file" accept="image/*" />

          {/* 7️⃣ Packing */}
          <h3 className="section-title">7️⃣ पॅकिंग माहिती</h3>

          <label>पॅकिंग प्रकार *</label>
          <select value={form.packingType} onChange={(e)=>update("packingType", e.target.value)}>
            <option>बॅगा</option>
            <option>क्रेट्स</option>
            <option>ओपन</option>
          </select>

          <label>बॅग वजन *</label>
          <input value={form.bagWeight} onChange={(e)=>update("bagWeight", e.target.value)} />

          <label>बॅग स्थिती *</label>
          <select value={form.bagCondition} onChange={(e)=>update("bagCondition", e.target.value)}>
            <option>नवी</option>
            <option>जुनी</option>
          </select>

          {/* 8️⃣ Transport */}
          <h3 className="section-title">8️⃣ वाहतूक / पिकअप</h3>

          <label>Transport कोणी करणार?</label>
          <select value={form.transportBy} onChange={(e)=>update("transportBy", e.target.value)}>
            <option value="company">कंपनी</option>
            <option value="farmer">शेतकरी</option>
          </select>

          <label>Pickup Location *</label>
          <input value={form.pickupLocation} onChange={(e)=>update("pickupLocation", e.target.value)} />

          <label>Pickup वेळ *</label>
          <input value={form.pickupTime} onChange={(e)=>update("pickupTime", e.target.value)} />

          {/* 9️⃣ Payment */}
          <h3 className="section-title">9️⃣ पेमेंट माहिती</h3>

          <label>Bank Account *</label>
          <input value={form.bankAccount} onChange={(e)=>update("bankAccount", e.target.value)} required />

          <label>IFSC *</label>
          <input value={form.ifsc} onChange={(e)=>update("ifsc", e.target.value)} required />

          <label>Bank Name *</label>
          <input value={form.bankName} onChange={(e)=>update("bankName", e.target.value)} required />

          <label>UPI ID (optional)</label>
          <input value={form.upi} onChange={(e)=>update("upi", e.target.value)} />

          <label>Payment किती दिवसात?</label>
          <select value={form.paymentDays} onChange={(e)=>update("paymentDays", e.target.value)}>
            <option value="same-day">Same Day</option>
            <option value="1-day">1 दिवस</option>
            <option value="3-days">3 दिवस</option>
          </select>

          {/* 10️⃣ Additional Checks */}
          <h3 className="section-title">🔟 अतिरिक्त तपासणी</h3>

          <label>कीड/रोग?</label>
          <select value={form.pestIssue} onChange={(e)=>update("pestIssue", e.target.value)}>
            <option>नाही</option>
            <option>होय</option>
          </select>

          <label>Storage स्थिती</label>
          <input value={form.storage} onChange={(e)=>update("storage", e.target.value)} />

          <label>Organic Certificate (optional)</label>
          <input type="file" accept="image/*" />

          <button className="sell-btn" disabled={loading}>
            {loading ? "Uploading..." : "✔ माल सबमिट करा"}
          </button>

        </form>
      </div>
    </div>
  );
}
