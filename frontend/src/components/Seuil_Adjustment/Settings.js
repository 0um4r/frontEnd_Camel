import React, { useState } from "react";
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
    <div className="settings-container">
      <h1>Paramètres</h1>
      <form onSubmit={handleSubmit}>
        {/* Champ pour le seuil maximal de température */}
        <label>
          Seuil maximal de température (°C) :
          <input
            type="number"
            value={seuilMaxTemp}
            onChange={(e) => setSeuilMaxTemp(parseFloat(e.target.value))}
          />
        </label>

        {/* Champ pour le seuil minimal de température */}
        <label>
          Seuil minimal de température (°C) :
          <input
            type="number"
            value={seuilMinTemp}
            onChange={(e) => setSeuilMinTemp(parseFloat(e.target.value))}
          />
        </label>

        {/* Champ pour le seuil maximal d'humidité */}
        <label>
          Seuil maximal d'humidité (%) :
          <input
            type="number"
            value={seuilMaxHum}
            onChange={(e) => setSeuilMaxHum(parseFloat(e.target.value))}
          />
        </label>

        {/* Champ pour le seuil minimal d'humidité */}
        <label>
          Seuil minimal d'humidité (%) :
          <input
            type="number"
            value={seuilMinHum}
            onChange={(e) => setSeuilMinHum(parseFloat(e.target.value))}
          />
        </label>

        {/* Bouton pour enregistrer les paramètres */}
        <button type="submit">Enregistrer les paramètres</button>
      </form>
    </div>
  );
};

export default Settings;