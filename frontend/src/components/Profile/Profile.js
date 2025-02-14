import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faSignOutAlt, faTachometerAlt, faUser, faCog, faBell, faChartLine, faServer, faUserPlus, faHome } from '@fortawesome/free-solid-svg-icons';
import "./Profile.css";
import handleCreateUserClick from "../UserManagement/CreateUser";

const Profile = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = (e) => {
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

    // Simuler une requête API pour changer le mot de passe
    setError("");
    setSuccess("Mot de passe changé avec succès !");
    setTimeout(() => {
      setSuccess("");
    }, 3000);

    // Réinitialiser les champs
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleLogout = () => {
    // Simuler une déconnexion
    localStorage.removeItem("token"); // Supprimer le token d'authentification
    navigate("/login"); // Rediriger vers la page de connexion
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
         
         <button onClick={handleCreateUserClick} className="create-user-button">
            <FontAwesomeIcon icon={faUserPlus} /> Créer un Utilisateur
            </button>
      </div>
    </div>
  );
};

export default Profile;