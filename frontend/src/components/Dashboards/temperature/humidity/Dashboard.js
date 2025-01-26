import React, { useState, useEffect } from "react";
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
import { fetchhumidityData } from "../../../services/HumidityService";
import { fetchTempData } from "../../../services/TempDataService";
import { Spinner } from "../../../effects/LoadingSpinner";
import "./Dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [humidities, setHumidities] = useState([]);
  const [temperatures, setTemperature] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const [humidityLocations, setHumidityLocations] = useState([]);
  const [temperatureLocations, setTemperatureLocations] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const humidityData = await fetchhumidityData();
        const temperatureData = await fetchTempData();

        const humidityValues = humidityData.map((d) => d.data);
        const humidityTimestamps = humidityData.map(
          (d) => d.date_registrationDate
        );
        const humidityLocs = humidityData.map((d) => d.location); // Assuming each data point has a location

        const temperatureValues = temperatureData.map((d) => d.data);
        const temperatureTimestamps = temperatureData.map(
          (d) => d.date_registrationDate
        );
        const temperatureLocs = temperatureData.map((d) => d.location); // Assuming each data point has a location

        setHumidities(humidityValues);
        setTimestamps(humidityTimestamps); // Assuming both datasets have the same timestamps
        setTemperature(temperatureValues);
        setHumidityLocations(humidityLocs);
        setTemperatureLocations(temperatureLocs);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <Spinner />;

  const humidityData = {
    labels: timestamps,
    datasets: [
      {
        label: "Humidité",
        data: humidities,
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
      },
    ],
  };

  const temperatureData = {
    labels: timestamps,
    datasets: [
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
        position: "bottom",
      },
      title: {
        display: true,
        text: "Valeurs de surveillance.",
      },
    },
  };

  return (
    <section className="dashboard-container">
      <h1>Tableau de bord</h1>
      <div className="charts-container">
        <section className="chart-wrapper">
          <div className="chart">
            <h2>Dashboard de Température</h2>
            <Line data={temperatureData} options={options} />
          </div>
          <div className="data-container">
            <h3>Données de Température</h3>
            <table>
              <thead>
                <tr>
                  <th>Valeur</th>
                  <th>Date</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {temperatures.map((temp, index) => (
                  <tr key={index}>
                    <td>{temp}</td>
                    <td>{timestamps[index]}</td>
                    <td>{temperatureLocations[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="chart-wrapper">
          <div className="chart">
            <h2>Dashboard de Humidité</h2>
            <Line data={humidityData} options={options} />
          </div>
          <div className="data-container">
            <h3>Données d'Humidité</h3>
            <table>
              <thead>
                <tr>
                  <th>Valeur</th>
                  <th>Date</th>
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {humidities.map((humidity, index) => (
                  <tr key={index}>
                    <td>{humidity}</td>
                    <td>{timestamps[index]}</td>
                    <td>{humidityLocations[index]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </section>
  );
};

export default Dashboard;
