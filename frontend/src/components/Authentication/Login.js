import React, { useState } from "react";
import "./Login.css"; // Assurez-vous de créer un fichier CSS pour le style
import logo from "../logo.jpeg";
import { SigninUser } from "../services/userServices";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'

function Login({ onSwitch }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {
      email: email,
      password: password,
    };

    try {
      const response = await SigninUser(credentials);
      let token = "";
      if (response != null) {
        token = response["token"];
        Cookies.set("token", token);
        navigate("/home");
      } else return;

      console.log("Logged in the token is: ", token);
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="login-container">
      {/* Contenu principal : Logo + Titre + Formulaire */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
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
      </header>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de Passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Se connecter
        </button>
      </form>
      <p style={{ marginTop: "20px" }}>
        Pas encore de compte ?{" "}
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
          S'inscrire
        </button>
      </p>
    </div>
  );
}

export default Login;
