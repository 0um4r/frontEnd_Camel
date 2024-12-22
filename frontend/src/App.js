import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';   
import Alerts from "./components/Alerts";

function App() {
  const [isLogin, setIsLogin] = useState(true); // État pour basculer entre Login et Signup

  return (
    <Router>
      <Routes>
         {/* Route pour la page d'accueil */}
         <Route path="/" element={<HomePage />} />

         {/* Route pour le tableau de bord */}
         <Route path="/dashboard" element={<Dashboard />} />

         {/* Route pour les paramètres */}
        <Route path="/settings" element={<Settings />} />

         {/* Route pour les Alerts */}
         <Route path="/Alerts" element={<Alerts />} />

         {/* Route pour la page Login/Signup */}
         <Route
          path="/auth"
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
