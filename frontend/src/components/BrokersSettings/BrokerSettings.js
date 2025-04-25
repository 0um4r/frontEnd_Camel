import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faServer,
  faPlus,
  faCheck,
  faTachometerAlt,
  faUser,
  faCog,
  faBell,
  faChartLine,
  faEnvelopeOpenText
} from "@fortawesome/free-solid-svg-icons";
import "./BrokerSettings.css";
import { fetchBrokers, cb } from "../../services/brokerService";
import { Spinner } from "../effects/LoadingSpinner";
import Subscribe from "./Subscribe"

const BrokerSettings = () => {
  const [showAddBrokerForm, setShowAddBrokerForm] = useState(false);
  const [showSubscribeForm, setShowSubscribeForm] = useState(false); // 👈 New state
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddBrokerClick = () => {
    setShowAddBrokerForm(true);
  };

  const handleSubscribeClick = () => {
    setShowSubscribeForm(true); // 👈 Open the subscribe form
  };

  const handleCloseSubscribe = () => {
    setShowSubscribeForm(false); // 👈 Close the subscribe form
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchBrokers();
        setBrokers(data);
        console.log("Fetched brokers", data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddBrokerSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await cb(ip, port);
      console.log("Changed the broker", response);
    } catch (err) {
      console.error("Failed to change broker", err);
    }
  };

  if (loading) return <Spinner />;

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
        <h1>
          <FontAwesomeIcon icon={faServer} /> Paramètres du Broker
        </h1>

        <div className="broker-settings-content">
          {/* Partie gauche : Sélection de broker */}
          <div className="broker-selection">
            <h2>Sélectionner un Broker</h2>
            <select>
              {brokers.map((broker) => (
                <option key={broker.id} value={broker.ip + ":" + broker.port}>
                  {broker.ip}
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
              <button className="add-button" onClick={handleSubscribeClick}>
                <FontAwesomeIcon icon={faEnvelopeOpenText} /> S'abonner à un topic
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
                    value={ip}
                    onChange={(e) => setIp(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Numéro de port :</label>
                  <input
                    type="text"
                    value={port}
                    onChange={(e) => setPort(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="add-button">
                  <FontAwesomeIcon icon={faPlus} /> Ajouter
                </button>
              </form>
            </div>
          )}

          {/* 🎯 Subscribe popup form */}
          {showSubscribeForm && <Subscribe onClose={handleCloseSubscribe} />}
        </div>
      </div>
    </div>
  );
};

export default BrokerSettings;
