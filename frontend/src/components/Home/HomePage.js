import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { Spinner } from "../effects/LoadingSpinner";
import { fetchLatestHumidityData } from "../services/HumidityService";
import { fetchLatestTemperatureData } from "../services/TempDataService";
import CombinedChart from "../Dashboards/combinedDashbord";
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
          <CombinedChart />
        </div>
      </div>

      <div className="button-group">
        <Link to="/dashboard" className="button">
          Tableaux de bord
        </Link>
        <Link to="/settings" className="button">
          Paramètres
        </Link>
        <Link to="/alerts" className="button">
          Alertes
        </Link>
        <Link to="/predictions" className="button">
          Prédictions
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
