import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faCog, faBell, faChartLine, faServer } from '@fortawesome/free-solid-svg-icons';
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
        const humidityLocs = humidityData.map((d) => d.location);

        const temperatureValues = temperatureData.map((d) => d.data);
        const temperatureTimestamps = temperatureData.map(
          (d) => d.date_registrationDate
        );
        const temperatureLocs = temperatureData.map((d) => d.location);

        setHumidities(humidityValues);
        setTimestamps(humidityTimestamps);
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
        text: "Valeurs de surveillance",
      },
    },
  };

  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li>
                                <Link to="/home">
                                  <FontAwesomeIcon icon={faTachometerAlt} /> HomePage
                                </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <FontAwesomeIcon icon={faTachometerAlt} /> Tableau de bord
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <FontAwesomeIcon icon={faUser} /> Profil
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <FontAwesomeIcon icon={faCog} /> Paramètres
            </Link>
          </li>
          
          <li>
            <Link to="/predictions">
              <FontAwesomeIcon icon={faChartLine} /> Prédictions
            </Link>
          </li>
          <li>
            <Link to="/server">
              <FontAwesomeIcon icon={faServer} /> Serveur
            </Link>
          </li>
        </ul>
      </div>

      {/* Contenu principal */}
      <section className="dashboard-container">
        <h1>Tableau de bord</h1>
        <div className="grid-container">
          {/* Température - Graphique */}
          <div className="grid-item">
            <h2>Température</h2>
            <Line data={temperatureData} options={options} />
          </div>

          {/* Données de Température - Tableau */}
          <div className="grid-item">
            <h2>Données de Température</h2>
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

          {/* Humidité - Graphique */}
          <div className="grid-item">
            <h2>Humidité</h2>
            <Line data={humidityData} options={options} />
          </div>

          {/* Données d'Humidité - Tableau */}
          <div className="grid-item">
            <h2>Données d'Humidité</h2>
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
        </div>
      </section>
    </div>
  );
};

export default Dashboard;