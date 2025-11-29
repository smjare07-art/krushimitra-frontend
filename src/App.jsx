import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import FarmerLogin from "./FarmerLogin";
import FarmerRegister from "./FarmerRegister";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/farmer/login" element={<FarmerLogin />} />
      <Route path="/farmer/register" element={<FarmerRegister />} />
    </Routes>
  );
}
