import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { fetchhumidityData } from "../services/HumidityService";
import { fetchTempData } from "../services/TempDataService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CombinedChart = () => {
  const [loading, setLoading] = useState(true);
  const [humidities, setHumidities] = useState([]);
  const [temperatures, setTemperatures] = useState([]);
  const [timestamps, setTimestamps] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const humidityData = await fetchhumidityData();
        const tempData = await fetchTempData();

        const humidityValues = humidityData.map(d => d.data);
        const tempValues = tempData.map(d => d.data);
        const timeLabels = humidityData.map(d => d.date_registrationDate); // assuming both datasets have the same timestamps

        setHumidities(humidityValues);
        setTemperatures(tempValues);
        setTimestamps(timeLabels);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div>Loading...</div>;

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: "Humidité",
        data: humidities,
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
      },
      {
        label: "Température",
        data: temperatures,
        borderColor: "#f44336",
        backgroundColor: "rgba(244, 67, 54, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Tendances de la Température et de l'Humidité",
      },
    },
  };

  return (
    <div className="combined-chart-container">
      <h2>Température et Humidité</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default CombinedChart;
