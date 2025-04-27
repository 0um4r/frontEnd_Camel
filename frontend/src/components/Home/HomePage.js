import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUser, faCog, faChartLine, faServer,faHome } from '@fortawesome/free-solid-svg-icons';
import "./HomePage.css";
import { Spinner } from "../effects/LoadingSpinner";
import { fetchLatestHumidityData } from "../../services/HumidityService"; 
import { fetchLatestTemperatureData } from "../../services/TempDataService";
import DroneEvolution from "../Dashboards/droneEvolution";

const HomePage = () => {
  const [latestTemp, setLatestTemp] = useState("");
  const [latestHum, setLatestHum] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLatestData = async () => {
      try {
        const data_hum = await fetchLatestHumidityData();
        if (data_hum === null) {
          console.log("No data available for humidity");
          setLatestHum({data:"N/A"});
        }
        else {
          setLatestHum(data_hum);
        }
        const data_temp = await fetchLatestTemperatureData();
        if (data_temp === null) {
          console.log("No data available for temperature");
          setLatestTemp({data:"N/A"});
        }
        else {
          setLatestTemp(data_temp);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadLatestData();
  }, []);

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