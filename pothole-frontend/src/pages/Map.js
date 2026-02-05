 import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";

// Fix Leaflet default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function PotholeMap() {
  const [potholes, setPotholes] = useState([]);

  // Fetch potholes from backend
  const fetchPotholes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/potholes");
      setPotholes(res.data);
    } catch (err) {
      console.error("Error fetching potholes:", err);
    }
  };

  // Fetch initially and then every 5 seconds
  useEffect(() => {
    fetchPotholes();
    const interval = setInterval(fetchPotholes, 5000); // poll every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1> Pothole Map</h1>
      <MapContainer
        center={[12.9626, 80.1892]} // default center
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {potholes.map((p) => (
          <Marker key={p._id} position={[p.latitude, p.longitude]}>
            <Popup>
              <strong>Severity:</strong> {p.severity} <br />
              {p.image && (
                <img
                  src={`http://localhost:5000/uploads/${p.image}`}
                  alt="pothole"
                  width={150}
                />
              )}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
