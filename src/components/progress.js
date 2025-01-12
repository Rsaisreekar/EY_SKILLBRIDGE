import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "../css/progress.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Progress() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  // Fetch data from backend server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch("https://your-backend-api.com/data1");
        const response2 = await fetch("https://your-backend-api.com/data2");

        if (!response1.ok || !response2.ok) {
          throw new Error("Failed to fetch data");
        }

        const fetchedData1 = await response1.json();
        const fetchedData2 = await response2.json();

        setData(fetchedData1);
        setData2(fetchedData2);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="back-btn">
        <button onClick={handleClick}>
          <AiOutlineArrowLeft />
        </button>
      </div>
      <h1>Progress Tracking</h1>

      <div className="graph-container">
        {/* Line Chart 1 */}
        <div className="chart-box one">
          <h3>Java Programming (Line Chart)</h3>
          <LineChart width={500} height={300} data={data2}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip className="tooltip" />
            <Legend />
            <Line type="monotone" dataKey="TopicsCovered" stroke="#82ca9d" />
          </LineChart>
        </div>
      </div>
    </div>
  );
}

export default Progress;
