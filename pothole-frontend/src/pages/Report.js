import axios from "axios";
import { useState } from "react";

function Report() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [severity, setSeverity] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // 🔹 Fetch live location
  const getLiveLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        alert("Location fetched successfully");
      },
      (error) => {
        alert("Unable to fetch location");
        console.error(error);
      }
    );
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // 🔹 Submit form
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!latitude || !longitude) {
    alert("Please fetch location first");
    return;
  }

  if (!imageFile) {
    alert("Please select an image");
    return;
  }

  const formData = new FormData();
  formData.append("image", imageFile); // Must match Multer key
  formData.append("location", `${latitude},${longitude}`); // Send as single string
  formData.append("severity", severity);

  try {
    const res = await axios.post(
      "http://localhost:5000/api/potholes/report",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    alert(res.data.message);
    console.log(res.data);
  } catch (err) {
    console.error(err);
    alert("Error reporting pothole");
  }
};

  return (
    <div className="report-page">
      <form className="report-form" onSubmit={handleSubmit}>
        <h1> Report Pothole</h1>

        {/* Image upload */}
        <input type="file" name="image" onChange={handleFileChange} />

        {/* Location */}
        <button type="button" onClick={getLiveLocation} className="btn secondary">
          📍 Get Live Location
        </button>

        {latitude && longitude && (
          <p className="location-text">
            Latitude: {latitude} <br />
            Longitude: {longitude}
          </p>
        )}

        {/* Severity */}
        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          required
          className="select"
        >
          <option value="">Select Severity</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        {/* Submit */}
        <button type="submit" className="btn primary">
          Submit Report
        </button>
      </form>
    </div>
  );
}

export default Report;
