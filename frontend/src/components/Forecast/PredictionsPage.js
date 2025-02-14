import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faHome, faThermometerHalf, faTint } from '@fortawesome/free-solid-svg-icons';
import "./PredictionsPage.css";
import { Link } from "react-router-dom";
import { faTachometerAlt, faUser, faCog, faBell, faChartLine, faServer } from "@fortawesome/free-solid-svg-icons";



const PredictionsPage = () => {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    generateInitialPredictions();
    const interval = setInterval(updatePredictions, 1000 * 60 * 60); // Mettre à jour toutes les heures
    return () => clearInterval(interval); // Nettoyer l'intervalle lors du démontage
  }, []);

  // Générer les prédictions initiales
  const generateInitialPredictions = () => {
    const now = new Date();
    const initialPredictions = Array.from({ length: 8 }, (_, index) => {
      const futureTime = new Date(now.getTime() + index * 60 * 60 * 1000); // Ajout d'1 heure
      return createPrediction(futureTime);
    });
    setPredictions(initialPredictions);
  };

  // Mettre à jour les prédictions (supprimer l'ancienne et ajouter une nouvelle)
  const updatePredictions = () => {
    setPredictions((prevPredictions) => {
      const now = new Date();
      const newPrediction = createPrediction(new Date(now.getTime() + 7 * 60 * 60 * 1000)); // Nouvelle heure après 7 heures
      return [...prevPredictions.slice(1), newPrediction]; // Supprimer la première et ajouter à la fin
    });
  };

  // Créer une prédiction avec une heure donnée
  const createPrediction = (time) => {
    return {
      time: `${time.getHours()}h ${time.getMinutes()}min`,
      temperature: (Math.random() * (35 - 15) + 15).toFixed(1), // Température entre 15 et 35
      humidity: (Math.random() * (90 - 30) + 30).toFixed(1), // Humidité entre 30% et 90%
    };
  };

  return (
    <div className="predictions-page">
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
      <div className="predictions-container">
        <h1><FontAwesomeIcon icon={faChartLine} /> Prédictions des 8 prochaines heures</h1>
        <div className="predictions-list">
          {predictions.map((prediction, index) => (
            <div key={index} className="prediction-card">
              <div className="prediction-header">
                <FontAwesomeIcon icon={faClock} /> <strong>Heure :</strong> {prediction.time}
              </div>
              <div className="prediction-details">
                <p>
                  <FontAwesomeIcon icon={faThermometerHalf} /> <strong>Température :</strong>{" "}
                  <span className="prediction-value">{prediction.temperature}°C</span>
                </p>
                <p>
                  <FontAwesomeIcon icon={faTint} /> <strong>Humidité :</strong>{" "}
                  <span className="prediction-value">{prediction.humidity}%</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default PredictionsPage;