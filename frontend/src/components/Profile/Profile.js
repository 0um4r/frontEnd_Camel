import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faSignOutAlt, faMapMarkerAlt, faUser, faCog,  faServer, faUserPlus, faHome } from '@fortawesome/free-solid-svg-icons';
import "./Profile.css";
import handleCreateUserClick from "../UserManagement/CreateUser";
import Cookies from "js-cookie";
import {logoutUser, updateUser} from "../../services/userServices";
const Profile = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
 
    // Validation des champs
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    const newVersion = {
      firstName:null,
      lastName:null,
      email:null,
      password: newPassword
    };
    // Appel à l'API pour changer le mot de passe
    const token = Cookies.get("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.ID; // Assurez-vous que le token contient l'ID de l'utilisateur

    const response = await updateUser(userId, newVersion);
    if (response!==406) {
    setSuccess("Mot de passe changé avec succès.");
     handleLogout(); // Déconnexion après le changement de mot de passe
   }
   
    else {
      setError("Erreur lors du changement de mot de passe.");
    }
};



const handleCreation = () => {
  navigate("/create-user"); // Rediriger vers la page de création d'utilisateur

}

  const handleLogout = async () => {
    // Simuler une déconne
    const token = Cookies.get("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.ID; // Assurez-vous que le token contient l'ID de l'utilisateur
    await logoutUser(userId);
    navigate("/"); // Rediriger vers la page de connexion
  };

  return (
    <div className="profile-page">
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
      <div className="profile-container">
        <h1>Profil Utilisateur</h1>

        {/* Formulaire de changement de mot de passe */}
        <form onSubmit={handleChangePassword} className="password-form">
          <h2>
            <FontAwesomeIcon icon={faKey} /> Changer le mot de passe
          </h2>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <div className="form-group">
            <label>Mot de passe actuel</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Nouveau mot de passe</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirmer le nouveau mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="change-password-button">
            Changer le mot de passe
          </button>
        </form>

        {/* Bouton de déconnexion */}
        <button onClick={handleLogout} className="logout-button">
          <FontAwesomeIcon icon={faSignOutAlt} /> Déconnexion
        </button>
         {/* Bouton "Créer un Utilisateur" */}
         
         <button onClick={handleCreation} className="create-user-button">
            <FontAwesomeIcon icon={faUserPlus} /> Créer un Utilisateur
            </button>
      </div>
    </div>
  );
};

export default Profile;