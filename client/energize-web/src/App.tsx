import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />        {/* http://localhost:5173/ */}
      <Route path="/gallery" element={<Gallery />} /> {/* http://localhost:5173/gallery */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
