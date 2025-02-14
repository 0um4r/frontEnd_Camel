import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faArrowLeft, faHome } from '@fortawesome/free-solid-svg-icons';
import "./CreateUser.css";
import { Link } from "react-router-dom";

import { faTachometerAlt, faCog,  faChartLine, faServer, faUser } from '@fortawesome/free-solid-svg-icons';
import { createUser } from "../../services/userServices";



const CreateUser = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Validation des champs
    if (!firstName || !lastName || !email || !password || !role) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    const user = {
          firstname: firstName,
          lastname: lastName,
          email: email,
          role:role,
          password: password,
        };

        try {
          const response = await createUser(user);
          console.log("User created successfully");
        } catch (err) {
          console.log("USER:", user);
          console.error(err);
          throw err;
        }


  };

  return (
    <div className="create-user-page">
      {/* Sidebar (identique à Profile.js) */}
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
      <div className="create-user-container">
        <h1><FontAwesomeIcon icon={faUserPlus} /> Créer un Utilisateur</h1>

        <form onSubmit={handleSubmit} className="create-user-form">
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}

          <div className="form-group">
            <label>Prénom</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Nom</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirmer le mot de passe</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>


          <div className="form-group">
            <label>Rôle</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="user">Utilisateur</option>
              <option value="admin">Administrateur</option>
            </select>
          </div>

          <button type="submit" className="create-user-button">
            <FontAwesomeIcon icon={faUserPlus} /> Créer
          </button>
        </form>

        {/* Bouton pour revenir à la page de profil */}
        <button onClick={() => navigate("/profile")} className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} /> Retour
        </button>
      </div>
    </div>
  );
};

export default CreateUser;