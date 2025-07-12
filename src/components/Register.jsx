import React, { useState } from "react";
import styles from "./Register.module.css"; // Assurez-vous de créer ce fichier CSS pour le style

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      alert("Inscription réussie, connectez-vous !");
      onRegister();
    } else {
      setError(data.error || data.message || "Erreur lors de l'inscription");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Inscription</h2>
      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">S'inscrire</button>
    </form>
  );
}

export default Register;