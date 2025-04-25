import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faCog, faChartLine, faServer } from '@fortawesome/free-solid-svg-icons';
import "./HomePage.css";
import { Spinner } from "../effects/LoadingSpinner";
import { fetchLatestHumidityData } from "../../services/HumidityService"; 
import { fetchLatestTemperatureData } from "../../services/TempDataService";
import DroneEvolution from "../Dashboards/droneEvolution";

const HomePage = () => {
  const [latestTemp, setLatestTemp] = useState("");
  const [latestHum, setLatestHum] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLatestData = async () => {
      try {
        const data_hum = await fetchLatestHumidityData();
        setLatestHum(data_hum);

        const data_temp = await fetchLatestTemperatureData();
        setLatestTemp(data_temp);
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };

    loadLatestData();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="home-container">
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

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h1>Bienvenue sur le Système de Surveillance Environnementale 🌍</h1>
          <p>
            Protégeons l'environnement avec des données précises et en temps réel.
          </p>
        </header>

        <div className="summary-section">
          <div className="summary-card">
            <h3>Température</h3>
            <p>🌡{latestTemp.data}C°</p>
          </div>
          <div className="summary-card">
            <h3>Humidité</h3>
            <p>💧 {latestHum.data}%</p>
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