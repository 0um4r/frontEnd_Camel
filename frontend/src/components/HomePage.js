import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <header className="header">
        <h1>Bienvenue sur le Système de Surveillance Environnementale 🌍</h1>
        <p>Protégeons l'environnement avec des données précises et en temps réel.</p>
      </header>

      <div className="summary-section">
        <div className="summary-card">
          <h3>Qualité de l'air</h3>
          <p>🌿 Bonne</p>
        </div>
        <div className="summary-card">
          <h3>Température</h3>
          <p>🌡️ 25°C</p>
        </div>
        <div className="summary-card">
          <h3>Humidité</h3>
          <p>💧 60%</p>
        </div>
      </div>

      <div className="graph-section">
        <h2>Données en temps réel</h2>
        <div className="graph-placeholder">
          <p>Graphique à intégrer ici</p>
        </div>
      </div>

      <div className="button-group">
        <Link to="/dashboard" className="button">Tableau de bord</Link>
        <Link to="/settings" className="button">Paramètres</Link>
        <Link to="/alerts" className="button">Alertes</Link>
      </div>
    </div>
  );
};

export default HomePage;




