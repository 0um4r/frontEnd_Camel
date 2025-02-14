import React, { useContext } from "react";
import { BrokerContext } from "../BrokersSettings/BrokerContext";
import "./Serveurs.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTachometerAlt, faUser, faCog, faHome, faChartLine, faServer, faThermometerHalf, faTint
} from '@fortawesome/free-solid-svg-icons';

const Serveurs = () => {
  const { brokers } = useContext(BrokerContext); // Utilisation du contexte

  return (
    <div className="serveurs-page">
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
      <div className="serveurs-container">
        <h1><FontAwesomeIcon icon={faServer} /> Serveurs</h1>

        {/* Tableau des brokers */}
        <table className="brokers-table">
          <thead>
            <tr>
              <th>IP</th>
              <th>ID</th>
              <th>Nombre de températures à alerte</th>
              <th>Nombre d'humidités à alerte</th>
            </tr>
          </thead>
          <tbody>
            {brokers.map((broker) => (
              <tr key={broker.id}>
                <td>{broker.ip}:{broker.port}</td>
                <td>{broker.id}</td>
                <td>{broker.tempAlerts}</td>
                <td>{broker.humAlerts}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Section broker-info */}
        <div className="broker-info">
          <div className="info-card">
            <h2><FontAwesomeIcon icon={faThermometerHalf} /> Nombre de températures à alerte</h2>
            <p><span className="number">37</span></p>
          </div>

          <div className="info-card">
            <h2><FontAwesomeIcon icon={faTint} /> Nombre d'humidités à alerte</h2>
            <p><span className="number">10</span></p>
          </div>

          <div className="info-card">
            <h2><FontAwesomeIcon icon={faThermometerHalf} /> Nombre de bonnes températures</h2>
            <p><span className="number">120</span></p>
          </div>

          <div className="info-card">
            <h2><FontAwesomeIcon icon={faTint} /> Nombre de bonnes humidités</h2>
            <p><span className="number">90</span></p>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Serveurs;