import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCog,
  faServer,
  faHome,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

import DroneEvolution from "../Dashboards/droneEvolution";
import { getHistory as getHistoryTemp } from "../../services/TempDataService";
import { getHistory as getHistoryHum } from "../../services/HumidityService";
import { fetchLatestTemperatureData } from "../../services/TempDataService";
import { fetchLatestHumidityData } from "../../services/HumidityService";

const HomePage = () => {
  // États simulation
  const [isSimulating, setIsSimulating] = useState(false);
  const [historyTempData, setHistoryTempData] = useState([]);
  const [historyHumidityData, setHistoryHumidityData] = useState([]);
  const [pointNumber, setPointNumber] = useState(0);
  const [currentPoint, setCurrentPoint] = useState(0);
  // États pour l’affichage des cartes
  const [latestTemp, setLatestTemp] = useState(null);
  const [latestHum, setLatestHum] = useState(null);
  const [loadingLatest, setLoadingLatest] = useState(true);

  // UI contrôle simulation
  const [showPrompt, setShowPrompt] = useState(true);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  // Chargement temps réel (quand pas en simulation)
  useEffect(() => {
    if (isSimulating) {
      setLoadingLatest(false);
      return;
    }
    const fetchLatest = async () => {
      try {
        const temp = await fetchLatestTemperatureData();
        const hum = await fetchLatestHumidityData();
        setLatestTemp(temp);
        setLatestHum(hum);
        setLoadingLatest(false);
      } catch (e) {
        setError(e);
      } finally {
        setLoadingLatest(false);
      }
    };
    fetchLatest();
    const interval = setInterval(fetchLatest, 2000);
    return () => clearInterval(interval);
  }, [isSimulating]);

  // Démarrer simulation historique
  const startSimulation = async (numPoints) => {
    try {
      setError(null);
      const histTemp = await getHistoryTemp(numPoints);
      const histHum = await getHistoryHum(numPoints);
      setHistoryTempData(histTemp);
      setHistoryHumidityData(histHum);
      setPointNumber(numPoints);
      setIsSimulating(true);
      setShowPrompt(false);
      setShowInput(false);

      // Initialise cartes aux premières données historiques
      setLatestTemp(histTemp[0] ?? null);
      setLatestHum(histHum[0] ?? null);
    } catch (e) {
      setError(e);
    }
  };

  // Arrêter simulation
  const stopSimulation = () => {
    setIsSimulating(false);
    setHistoryTempData([]);
    setHistoryHumidityData([]);
    setPointNumber(0);
    setShowPrompt(true);
    setShowInput(false);
    setInputValue("");
    setLatestTemp(null);
    setLatestHum(null);
  };

  // Mise à jour des cartes lors de la progression simulation
  const handleProgress = (index) => {
    if (!isSimulating) return;
    setCurrentPoint(index + 1)
    setLatestTemp(historyTempData[index] ?? null);
    setLatestHum(historyHumidityData[index] ?? null);
    
  };

  // Fin automatique de simulation
  const onSimulationEnd = () => {
    stopSimulation();
  };

  return (
    <div
      className="home-container"
      style={{ display: "flex", minHeight: "100vh", height: "100vh" }}
    >
      {/* Sidebar */}
      <div
        className="sidebar"
        style={{
          backgroundColor: "#2c3e50",
          color: "white",
          width: 220,
          padding: 20,
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          overflowY: "auto",
        }}
      >
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
      <div
        className="main-content"
        style={{
          flex: 1,
          padding: 20,
          marginLeft: 220, // Décalage pour la sidebar fixe
          overflowY: "auto",
          height: "100vh",
          boxSizing: "border-box",
        }}
      >
        <header className="header">
          <h1>Bienvenue sur le Système de Surveillance Environnementale 🌍</h1>
        </header>

        <div
          className="summary-section"
          style={{ display: "flex", gap: 20, marginTop: 20 }}
        >
          <div
            className="summary-card"
            style={{
              flex: 1,
              padding: 20,
              backgroundColor: "#f0f0f0",
              borderRadius: 8,
            }}
          >
            <h3>🌡️ Température actuelle </h3>
            <p style={{ fontSize: 24 }}>
              {loadingLatest ? "Chargement..." : latestTemp?.data ?? "N/A"} °C
            </p>
          </div>
          <div
            className="summary-card"
            style={{
              flex: 1,
              padding: 20,
              backgroundColor: "#f0f0f0",
              borderRadius: 8,
            }}
          >
            <h3>💦 Humidité actuelle </h3>
            <p style={{ fontSize: 24 }}>
              {loadingLatest ? "Chargement..." : latestHum?.data ?? "N/A"} %
            </p>
          </div>
        </div>

        {/* Contrôle simulation */}
        <div className="simulation-controls" style={{ marginTop: 30 }}>
          {error && (
            <div style={{ color: "red", marginBottom: 10 }}>
              Erreur : {error.message}
            </div>
          )}

          {showPrompt && !isSimulating && (
            <>
              <p style={{ fontWeight: "bold" }}>
                Voulez-vous voir l’historique des données ?
              </p>
              <button
                onClick={() => {
                  setShowPrompt(false);
                  setShowInput(true);
                }}
                style={buttonStyle}
              >
                Démarrer
              </button>
            </>
          )}

          {showInput && (
            <>
              <p>Entrez le nombre de points à simuler :</p>
              <input
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="ex: 10"
                style={{ marginRight: 10, padding: 6, width: 120 }}
              />
              <button
                onClick={() => {
                  const n = parseInt(inputValue);
                  if (n > 0) startSimulation(n);
                }}
                style={buttonStyle}
              >
                Confirmer
              </button>
            </>
          )}

          {isSimulating && (
            <>
              <button
                onClick={stopSimulation}
                style={{ ...buttonStyle, backgroundColor: "#e74c3c", marginTop: 10 }}
              >
                Arrêter la simulation
              </button>
              <p style={{ marginTop: 10 }}>
                Simulation {currentPoint} /{historyTempData.length} points
              </p>
            </>
          )}
        </div>

        {/* Drone Evolution */}
        <div className="graph-section" style={{ marginTop: 40, height: 400 }}>
          <DroneEvolution
            isSimulating={isSimulating}
            historyTempData={historyTempData}
            historyHumidityData={historyHumidityData}
            simulationSize={pointNumber}
            onSimulationEnd={onSimulationEnd}
            onProgress={handleProgress}
          />
        </div>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 15px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: "#3498db",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "bold",
};

export default HomePage;
