import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import HomePage from "./components/Home/HomePage";
import Settings from "./components/Seuil_Adjustment/Settings";
import Alerts from "./components/Dashboards/temperature/Alerts/Alerts";
import PredictionsPage from "./components/Forecast/PredictionsPage";
import React, { useState } from 'react';
import Dashboard from "./components/Dashboards/temperature/humidity/Dashboard";
import Profile from "./components/Profile/Profile";
import BrokerSettings from "./components/BrokersSettings/BrokerSettings"; // Chemin correct
import Serveurs from "./components/Serveurs/Serveurs"; // Assurez-vous que le chemin est correct
import { BrokerProvider } from "./components/BrokersSettings/BrokerContext"; // Import du contexte
import CreateUser from "./components/UserManagement/CreateUser"; // Import de la nouvelle page

function App() {
  const [isLogin, setIsLogin] = useState(true); // État pour basculer entre Login et Signup

  return (
    <BrokerProvider> {/* Enveloppez tout avec BrokerProvider */}
      <Router>
        <Routes>
          {/* Route pour la page d'accueil */}
          <Route path="/home" element={<HomePage />} />

          {/* Route pour les paramètres */}
          <Route path="/settings" element={<Settings />} />

          {/* Route pour la page de profil */}
          <Route path="/profile" element={<Profile />} />

          {/* Route pour la page de création d'utilisateur */}
          <Route path="/create-user" element={<CreateUser />} />

          {/* Route pour les Alerts */}
          <Route path="/Alerts" element={<Alerts />} />

          {/* Route pour la page des prédictions */}
          <Route path="/predictions" element={<PredictionsPage />} />

          {/* Route pour le tableau de bord */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Route pour les paramètres des brokers */}
          <Route path="/broker-settings" element={<BrokerSettings />} />

          {/* Route pour les serveurs */}
          <Route path="/server" element={<Serveurs />} />

          {/* Route pour la page Login/Signup */}
          <Route
            path="/"
            element={
              isLogin ? (
                <Login onSwitch={() => setIsLogin(false)} />
              ) : (
                <Signup onSwitch={() => setIsLogin(true)} />
              )
            }
          />
        </Routes>
      </Router>
    </BrokerProvider>
  );
}

export default App;