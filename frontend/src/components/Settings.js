import React, { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [airQuality, setAirQuality] = useState(50);
  const [temperature, setTemperature] = useState(30);
  const [humidity, setHumidity] = useState(70);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Paramètres enregistrés :\nQualité de l'air : ${airQuality}\nTempérature : ${temperature}°C\nHumidité : ${humidity}%`);
  };

  return (
    <div className="settings-container">
      <h1>Paramètres</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Seuil de qualité de l'air :
          <input
            type="number"
            value={airQuality}
            onChange={(e) => setAirQuality(e.target.value)}
          />
        </label>
        <label>
          Seuil de température (°C) :
          <input
            type="number"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
          />
        </label>
        <label>
          Seuil d'humidité (%) :
          <input
            type="number"
            value={humidity}
            onChange={(e) => setHumidity(e.target.value)}
          />
        </label>
        <button type="submit">Enregistrer les paramètres</button>
      </form>
    </div>
  );
};

export default Settings;
