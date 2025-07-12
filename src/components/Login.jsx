import React, { useState } from 'react';
import styles from './Login.module.css'; // Assurez-vous de créer ce fichier CSS pour le style


function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
  localStorage.setItem('token', data.token);
  console.log("Redirection vers le dashboard");
  onLogin();
}else {
      alert(data.message || 'Erreur de connexion');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Connexion</h2>
      <input type="email" placeholder="Email" value={email}
        onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Mot de passe" value={password}
        onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Se connecter</button>
    </form>
  );
}

export default Login;