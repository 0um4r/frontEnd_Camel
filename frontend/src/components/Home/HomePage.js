import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog, faServer, faHome, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import "./HomePage.css";
import { Spinner } from "../effects/LoadingSpinner";
import { fetchLatestHumidityData } from "../../services/HumidityService";
import { fetchLatestTemperatureData } from "../../services/TempDataService";
import DroneEvolution from "../Dashboards/droneEvolution";

const HomePage = () => {
  const [latestTemp, setLatestTemp] = useState(null);
  const [latestHum, setLatestHum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLatestData = async () => {
      try {
        const data_hum = await fetchLatestHumidityData();
        setLatestHum(data_hum || { data: "N/A" });

        const data_temp = await fetchLatestTemperatureData();
        setLatestTemp(data_temp || { data: "N/A" });
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
//Create a interval of 2 sconds to fetch the data
    const interval = setInterval(() => {
      loadLatestData();
    }, 2000);
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [])

  if (loading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="home-container">
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/home">
              <FontAwesomeIcon icon={faHome} /> HomePage
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
            <Link to="/server">
              <FontAwesomeIcon icon={faServer} /> Serveur
            </Link>
          </li>
          <li>
            <Link to="/map-drone">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> Carte Drone
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h1>Bienvenue sur le Système de Surveillance Environnementale 🌍</h1>
        </header>

        <div className="summary-section">
          <div className="summary-card">
            <h3>Température</h3>
            <p>🌡 {latestTemp?.data ?? "N/A"}°C</p>
          </div>
          <div className="summary-card">
            <h3>Humidité</h3>
            <p>💧 {latestHum?.data ?? "N/A"}%</p>
          </div>
        </div>

        <div className="graph-section">
          <h2>Données en temps réel</h2>
          <div className="graph-placeholder">
            <DroneEvolution />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
