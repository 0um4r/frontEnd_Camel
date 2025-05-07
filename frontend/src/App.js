import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Authentication/Login";
import MapDrone from "./components/Map/MapDrone";
import HomePage from "./components/Home/HomePage";
import Settings from "./components/Seuil_Adjustment/Settings";
import Profile from "./components/Profile/Profile";
import BrokerSettings from "./components/BrokersSettings/BrokerSettings"; // Chemin correct
import Serveurs from "./components/Serveurs/Serveurs"; // Assurez-vous que le chemin est correct
import CreateUser from "./components/UserManagement/CreateUser"; // Import de la nouvelle page

function App() {
  return (
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

        

          {/* Route pour les paramètres des brokers */}
          <Route path="/broker-settings" element={<BrokerSettings />} />
          

          {/* Route pour les serveurs */}
          <Route path="/server" element={<Serveurs />} />

          {/* Route pour Carte map */}
          <Route path="/map-drone" element={<MapDrone />} />

          {/* Route pour la page Login/Signup */}
          <Route
            path="/"
            element={<Login/>}/>
        </Routes>
      </Router>
  );
}

export default App;