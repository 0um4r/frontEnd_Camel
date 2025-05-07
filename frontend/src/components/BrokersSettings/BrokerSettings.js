import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faServer,
  faPlus,
  faCheck,
  faUser,
  faCog,
  faEnvelopeOpenText,
  faHome,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./BrokerSettings.css";
import { fetchBrokers, cb } from "../../services/brokerService";
import { Spinner } from "../effects/LoadingSpinner";
import Subscribe from "./Subscribe";

const BrokerSettings = () => {
  const [showAddBrokerForm, setShowAddBrokerForm] = useState(false);
  const [showSubscribeForm, setShowSubscribeForm] = useState(false);
  const [ip, setIp] = useState("");
  const [port, setPort] = useState("");
  const [brokers, setBrokers] = useState([]);
  const [selectedBroker, setSelectedBroker] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleAddBrokerClick = () => {
    setShowAddBrokerForm(true);
  };

  const handleSubscribeClick = () => {
    setShowSubscribeForm(true);
  };

  const handleCloseSubscribe = () => {
    setShowSubscribeForm(false);
  };

  const handleCancelAddBroker = () => {
    setShowAddBrokerForm(false);
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
      if (response === 0) {
        alert("Le broker sélectionné n'est pas disponible.");
        return;
      }
      if (response === 1) {
      alert("Changé avec succès");
      navigate("/home");
      }
    } catch (err) {
      console.error("Failed to change broker", err);
    }
  };

  const handleSelectBroker = async () => {
    if (!selectedBroker) {
      alert("Veuillez sélectionner un broker.");
      return;
    }

    const [selectedIp, selectedPort] = selectedBroker.split(":");

    try {
      const response = await cb(selectedIp, selectedPort);
      if(response===1)
      {
      console.log("Broker sélectionné avec succès :", response);
      alert("Broker changé avec succès !");
      navigate("/home");  
      }
      else if (response===0)
      {
        alert("Le broker sélectionné n'est pas disponible.");
        return;
      }
      else
      {
        alert("Erreur lors du changement de broker.");
        return
      }

    

    } catch (err) {
      console.error("Échec du changement de broker", err);
      alert("Échec du changement de broker.");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="broker-settings-page">
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

      <div className="broker-settings-container">
        <h1>
          <FontAwesomeIcon icon={faServer} /> Paramètres du Broker
        </h1>

        <div className="broker-settings-content">
          <div className="broker-selection">
            <h2>Sélectionner un Broker</h2>
            <select
              value={selectedBroker}
              onChange={(e) => setSelectedBroker(e.target.value)}
            >
              <option value="">-- Sélectionner un broker --</option>
              {brokers.map((broker) => (
                <option
                  key={broker.id}
                  value={`${broker.ip}:${broker.port}`}
                >
                  {broker.ip}:{broker.port}
                </option>
              ))}
            </select>

            <div className="broker-buttons">
              <button className="select-button" onClick={handleSelectBroker}>
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
                <div className="form-buttons">
                  <button type="submit" className="add-button">
                    <FontAwesomeIcon icon={faPlus} /> Ajouter
                  </button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={handleCancelAddBroker}
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          )}

          {showSubscribeForm && <Subscribe onClose={handleCloseSubscribe} />}
        </div>
      </div>
    </div>
  );
};

export default BrokerSettings;
