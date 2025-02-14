import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faServer, faPlus, faCheck, faTachometerAlt, faUser, faCog, faBell, faChartLine
} from '@fortawesome/free-solid-svg-icons';
import { BrokerContext } from "./BrokerContext"; // Import du contexte
import "./BrokerSettings.css";
import { fetchBrokers } from "../../services/brokerService";
import { Spinner } from "../effects/LoadingSpinner";

const BrokerSettings = () => {

  const [showAddBrokerForm, setShowAddBrokerForm] = useState(false);
  const {ip,setIp} = useState();
  const {port,setPort} = useState();
  const { brokers ,setBrokers} = useState([]); // Accéder à brokers via le contexte
  const {loading,setLoading} = useState();
  const {error,setError} = useState();


  const handleAddBrokerClick = () => {
    setShowAddBrokerForm(true);
  };


useEffect(() => {
    const loadData = async () => {
      try {
        
        const data = await fetchBrokers();
        setBrokers(brokers);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
        setError(error);
      }
    };

    loadData();
  }, []);


  
  if (loading) return <Spinner/>

  const handleAddBrokerSubmit = async (e) => {
    e.preventDefault();
    

    const broker_ = {
      ip:ip,
      port:port
    };


    try {

      const response =  await cb(broker_.ip,broker_.port);
      console.log("Changed the broker");
    }catch(err)
    {
      throw err;
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
                <option key={broker.id} value={broker.ip+":"+broker.port}>
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
        </div>
      </div>

    
    </div>
  );
};

export default BrokerSettings;