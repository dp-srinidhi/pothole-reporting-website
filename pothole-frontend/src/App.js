import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import Map from "./pages/Map";
import "leaflet/dist/leaflet.css";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/report" element={<Report />} />
      <Route path="/map" element={<Map/>} />
    </Routes>
  );
}

export default App;
