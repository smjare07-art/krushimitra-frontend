import { Routes, Route } from "react-router-dom";

import HomePage from "./HomePage";
import FarmerLogin from "./FarmerLogin";
import FarmerRegister from "./FarmerRegister";
import FarmerDashboard from "./FarmerDashboard";   
import FarmerSell from "./FarmerSell";
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/farmer/login" element={<FarmerLogin />} />
      <Route path="/farmer/register" element={<FarmerRegister />} />
      <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
      <Route path="/farmer/sell" element={<FarmerSell />} />
    </Routes>
  );
}
