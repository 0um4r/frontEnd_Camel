import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Authentication/Signup";
import Login from "./components/Authentication/Login";
import HomePage from "./components/Home/HomePage";
import Settings from "./components/Seuil_Adjustment/Settings";
import Alerts from "./components/Dashboards/temperature/Alerts/Alerts";
import PredictionsPage from "./components/Forecast/PredictionsPage";
import React, { useState } from 'react';
import Dashboard from "./components/Dashboards/temperature/humidity/Dashboard";

function App() {
  const [isLogin, setIsLogin] = useState(true); // État pour basculer entre Login et Signup

  return (
    <Router>
      <Routes>
        {/* Route pour la page d'accueil */}
        
        {/* Route pour les paramètres */}
        <Route path="/settings" element={<Settings />} />

        {/* Route pour les Alerts */}
        <Route path="/Alerts" element={<Alerts />} />

        {/* Route pour la page des prédictions */}
        <Route path="/predictions" element={<PredictionsPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard/>}></Route>

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
  );
}

export default App;
