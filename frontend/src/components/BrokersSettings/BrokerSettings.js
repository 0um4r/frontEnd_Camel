import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faServer, faPlus, faCheck, faTachometerAlt, faUser, faCog, faBell, faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { BrokerContext } from "./BrokerContext"; // Import du contexte
import "./BrokerSettings.css";

const BrokerSettings = () => {
  const { addBroker } = useContext(BrokerContext); // Utilisation du contexte
  const [showAddBrokerForm, setShowAddBrokerForm] = useState(false);
  const [newBroker, setNewBroker] = useState({ ip: "", port: "" });
  const { brokers } = useContext(BrokerContext); // Accéder à brokers via le contexte

  const handleAddBrokerClick = () => {
    setShowAddBrokerForm(true);
  };

  const handleAddBrokerSubmit = (e) => {
    e.preventDefault();
    if (newBroker.ip && newBroker.port) {
      addBroker({ id: Date.now(), ...newBroker }); // Ajout du broker via le contexte
      setNewBroker({ ip: "", port: "" });
      setShowAddBrokerForm(false);
    }
  };

  return (
    <div className="broker-settings-page">
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
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
            <Link to="/alerts">
              <FontAwesomeIcon icon={faBell} /> Alertes
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
      <div className="broker-settings-container">
        <h1><FontAwesomeIcon icon={faServer} /> Paramètres du Broker</h1>

        <div className="broker-settings-content">
          {/* Partie gauche : Sélection de broker */}
          <div className="broker-selection">
            <h2>Sélectionner un Broker</h2>
            <select>
              {brokers.map((broker) => (
                <option key={broker.id} value={broker.id}>
                  {broker.ip}:{broker.port}
                </option>
              ))}
            </select>
            <div className="broker-buttons">
              <button className="select-button">
                <FontAwesomeIcon icon={faCheck} /> Sélectionner
              </button>
              <button className="add-button" onClick={handleAddBrokerClick}>
                <FontAwesomeIcon icon={faPlus} /> Ajouter un nouveau broker
              </button>
            </div>
          </div>

          {/* Partie droite : Ajout de broker (affichée conditionnellement) */}
          {showAddBrokerForm && (
            <div className="add-broker-form">
              <h2>Ajouter un nouveau Broker</h2>
              <form onSubmit={handleAddBrokerSubmit}>
                <div className="form-group">
                  <label>Adresse IP :</label>
                  <input
                    type="text"
                    value={newBroker.ip}
                    onChange={(e) => setNewBroker({ ...newBroker, ip: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Numéro de port :</label>
                  <input
                    type="text"
                    value={newBroker.port}
                    onChange={(e) => setNewBroker({ ...newBroker, port: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="add-button">
                  <FontAwesomeIcon icon={faPlus} /> Ajouter
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

    
    </div>
  );
};

export default BrokerSettings;