import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,           // Icône des paramètres
  faExchangeAlt,    // Icône de changement de broker
  faThermometerHalf,// Icône de température
  faTint,           // Icône d'humidité
  faSave,           // Icône de sauvegarde
  faTachometerAlt,  // Icône du tableau de bord
  faUser,           // Icône du profil
  faBell,           // Icône des alertes
  faChartLine,      // Icône des prédictions
  faServer,          // Icône du serveur
  faHome
} from '@fortawesome/free-solid-svg-icons';
import "./Settings.css";

const Settings = () => {
  // États pour les seuils de température et d'humidité
  const [seuilMaxTemp, setSeuilMaxTemp] = useState(30); // Seuil maximal de température par défaut
  const [seuilMinTemp, setSeuilMinTemp] = useState(10); // Seuil minimal de température par défaut
  const [seuilMaxHum, setSeuilMaxHum] = useState(70);   // Seuil maximal d'humidité par défaut
  const [seuilMinHum, setSeuilMinHum] = useState(30);   // Seuil minimal d'humidité par défaut

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Paramètres enregistrés :\n` +
      `Seuil maximal de température : ${seuilMaxTemp}°C\n` +
      `Seuil minimal de température : ${seuilMinTemp}°C\n` +
      `Seuil maximal d'humidité : ${seuilMaxHum}%\n` +
      `Seuil minimal d'humidité : ${seuilMinHum}%`
    );
  };

  return (
    <div className="settings-page">
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

      {/* Contenu principal */}
      <div className="settings-container">
        <h1><FontAwesomeIcon icon={faCog} /> Paramètres</h1>

        {/* Formulaire pour les seuils */}
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faThermometerHalf} /> Seuil maximal de température (°C) :
            </label>
            <input
              type="number"
              value={seuilMaxTemp}
              onChange={(e) => setSeuilMaxTemp(parseFloat(e.target.value))}
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faThermometerHalf} /> Seuil minimal de température (°C) :
            </label>
            <input
              type="number"
              value={seuilMinTemp}
              onChange={(e) => setSeuilMinTemp(parseFloat(e.target.value))}
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faTint} /> Seuil maximal d'humidité (%) :
            </label>
            <input
              type="number"
              value={seuilMaxHum}
              onChange={(e) => setSeuilMaxHum(parseFloat(e.target.value))}
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label>
              <FontAwesomeIcon icon={faTint} /> Seuil minimal d'humidité (%) :
            </label>
            <input
              type="number"
              value={seuilMinHum}
              onChange={(e) => setSeuilMinHum(parseFloat(e.target.value))}
              className="input-field"
            />
          </div>

          <button type="submit" className="save-button">
            <FontAwesomeIcon icon={faSave} /> Enregistrer les paramètres
          </button>
        </form>

        {/* Lien "Change Broker" */}
        <div className="broker-link">
          <Link to="/broker-settings">
            <FontAwesomeIcon icon={faExchangeAlt} /> Change Broker
          </Link>
        </div>
      </div>

      
    </div>
  );
};

export default Settings;