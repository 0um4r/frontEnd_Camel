import React, { useEffect, useState } from "react";
import "./Serveurs.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faCog, faHome, faServer, faThermometerHalf, faTint, faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import { fetchBrokers } from "../../services/brokerService";
import { Spinner } from "../effects/LoadingSpinner";

const Serveurs = () => {
  const [brokers, setBrokers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alerteTemps, setAlerteTemps] = useState(0);
  const [alerteHumidite, setAlerteHumidite] = useState(0);
  const [bonnesTemps, setBonnesTemps] = useState(0);
  const [bonnesHumidite, setBonnesHumidite] = useState(0);

  const fetchData = async () => {
    try {
      const data = await fetchBrokers();
      if (data !== null) {
        setBrokers(data);
        setLoading(false);
        setError(null);

        // Calcul des totaux
        let totalNormalTemps = 0;
        let totalAlerteTemps = 0;
        let totalNormalHumidite = 0;
        let totalAlerteHumidite = 0;

        data.forEach((broker) => {
          totalNormalTemps += broker.nGoodTemps;
          totalAlerteTemps += broker.nAlerteTemps;
          totalNormalHumidite += broker.nGoodHums;
          totalAlerteHumidite += broker.nAlertehums;
        });

        setBonnesTemps(totalNormalTemps);
        setAlerteTemps(totalAlerteTemps);
        setBonnesHumidite(totalNormalHumidite);
        setAlerteHumidite(totalAlerteHumidite);
      } else {
        console.log("No data available");
        setLoading(false);
        setError("No data available");
      }
    } catch (err) {
      console.error("Erreur chargement coord:", err);
      setLoading(false);
      setError("Error loading data");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchData();
    };
    loadData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

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

      {/* Contenu principal */}
      <div className="serveurs-container">
        <h1><FontAwesomeIcon icon={faServer} /> Serveurs</h1>

        {/* Tableau des brokers */}
        <table className="brokers-table">
          <thead>
            <tr>
              <th>Broker</th>
              <th>ID</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {brokers.map((broker) => (
              <tr key={broker.id}>
                <td>{broker.ip}:{broker.port}</td>
                <td>{broker.id}</td>
                {/* Affichage du statut en couleur */}
                <td style={{ color: broker.status === 1 ? "green" : "red" }}>
                  {broker.status === 1 ? "Connecté" : "Déconnecté"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Section broker-info */}
        <div className="broker-info">
          <div className="info-card">
            <h2><FontAwesomeIcon icon={faThermometerHalf} /> Nombre de températures à alerte</h2>
            <p><span className="number">{alerteTemps}</span></p>
          </div>

          <div className="info-card">
            <h2><FontAwesomeIcon icon={faTint} /> Nombre d'humidités à alerte</h2>
            <p><span className="number">{alerteHumidite}</span></p>
          </div>

          <div className="info-card">
            <h2><FontAwesomeIcon icon={faThermometerHalf} /> Nombre de bonnes températures</h2>
            <p><span className="number">{bonnesTemps}</span></p>
          </div>

          <div className="info-card">
            <h2><FontAwesomeIcon icon={faTint} /> Nombre de bonnes humidités</h2>
            <p><span className="number">{bonnesHumidite}</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Serveurs;
