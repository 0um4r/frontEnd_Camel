import React, { useState } from "react";
import "./Alerts.css";

const Alerts = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, message: "Qualité de l'air critique", type: "success" },
    { id: 2, message: "Température élevée (35°C)", type: "error" },
  ]);

  const resolveAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.id !== id));
  };

  return (
    <div className="alerts-container">
      <h1>Alertes</h1>
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`alert ${alert.type === "success" ? "alert-success" : "alert-error"}`}
        >
          <span>{alert.message}</span>
          {alert.type === "error" && (
            <button onClick={() => resolveAlert(alert.id)}>Marquer comme résolue</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Alerts;
