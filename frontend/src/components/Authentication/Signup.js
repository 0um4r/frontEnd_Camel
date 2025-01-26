import "./Signup.css"; // Importer le fichier CSS
import logo from "../logo.jpeg";
import { SignupUser } from "../services/userServices";
import React, { useState } from "react";


const Signup = ({ onSwitch }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas !");
      return;
    }

    const user = {
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
    };

    try {
      const response = await SignupUser(user);
      console.log("User signed up successfully");
    } catch (err) {
      console.log("USER:", user);
      console.error(err);
      throw err;
    }
  };

  return (
    <div className="container">
      {/* Logo et nom de l'application */}
      <div className="logo-container">
        <img
          src={logo} // Utilisez l'importation ici
          alt="Logo"
          style={{
            width: "100px",
            height: "80px",
            marginRight: "30px",
          }}
        />
        <h1
          style={{
            fontSize: "18px",
            margin: "0",
            color: "#4CAF50",
          }}
        >
          <em>
            Système de Surveillance <br /> Environnementale
          </em>
        </h1>
      </div>

      {/* Formulaire d'inscription */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Prenom</label>
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
          <label>Email </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Mot de passe </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirmer le mot de passe </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          S'inscrire
        </button>
      </form>
      <p style={{ marginTop: "20px" }}>
        Avez vous déjà un compte ?{" "}
        <button
          onClick={onSwitch}
          style={{
            border: "none",
            background: "none",
            color: "#007bff",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Se connecter
        </button>
      </p>
    </div>
  );
};

export default Signup;
