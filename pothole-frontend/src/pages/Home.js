import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [totalPotholes, setTotalPotholes] = useState(0);

  useEffect(() => {
  const fetchTotal = () => {
axios.get("http://localhost:5000/api/potholes/count") // full URL if CORS
  .then((res) => setTotalPotholes(res.data.total))
      .then((res) => setTotalPotholes(res.data.total))
      .catch((err) => console.error(err));
  };

  fetchTotal(); // initial fetch

  const interval = setInterval(fetchTotal, 5000);
  return () => clearInterval(interval); // cleanup on unmount
}, []);

  return (
    <div className="home">

       <div className="home-header">
        <h1>REPORT POTHOLE,<br />BUILD BETTER INDIA</h1>
        <div className="total-box">
          {totalPotholes} Reported
        </div>
      </div>

      <p>
        "Every pothole reported was an act of hope -<br />
        hope that someone was listening."
      </p>

      <div className="home-buttons">
        <Link to="/report" className="btn btn-red">Report a Pothole</Link>
        <Link to="/map" className="btn btn-green">View Map</Link>
      </div>

      <div className="home-images">
        <img src="/im.jpg" alt="Description 1" />
        <img src="/im2.jpg" alt="Description 2" />
        <img src="/im5.jpg" alt="Description 5" />
        <img src="/im3.jpg" alt="Description 3" />
        <img src="/im6.jpg" alt="Description 6" />
        <img src="/im4.jpg" alt="Description 4" />
      </div>

<div>
  <h3> How it works?</h3>
          <ul>
          <li>Report potholes by uploading a photo and your location.</li>
          <li>View reported potholes on an interactive map.</li>
          <li>View the total no. of potholes reported</li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
