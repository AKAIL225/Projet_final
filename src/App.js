import Footer from './components/Footer';
import React, { useState } from 'react';
import TaskList from './components/TaskList';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './pages/HomePage';
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem('token'));
  console.log("Page courante :", page);

  const Navbar = () => (
    <nav className="navbar">
      <span className="nav-logo" onClick={() => setPage('home')} style={{cursor: 'pointer'}}>Ma To-Do Liste</span>
      <div className="nav-links">
        <button onClick={() => setPage('home')}>Accueil</button>
        <button onClick={() => setPage('about')}>À propos</button>
        {!isLogged && (
          <>
            <button onClick={() => setPage('login')}>Connexion</button>
            <button onClick={() => setPage('register')}>S'inscrire</button>
          </>
        )}
      </div>
    </nav>
  );

  if (isLogged) {
    return (
      <div>
        <Navbar />
        <div className="header-bar">
          <h1>Dashboard</h1>
          <button
            className="logout-btn"
            onClick={() => {
              localStorage.removeItem('token');
              setIsLogged(false);
              setPage('login');
            }}
          >
            Déconnexion
          </button>
        </div>
        {/* Affiche le contenu selon la page choisie */}
        {page === 'home' && <HomePage />}
        {page === 'about' && (
          <div>
            <h1>À propos</h1>
            <p>Cette application vous permet de gérer vos tâches quotidiennes facilement.</p>
          </div>
        )}
        {/* Dashboard (ajout des tâches) */}
        {page !== 'home' && page !== 'about' && <TaskList />}
        <Footer />
      </div>
    );
  }

  // Pages publiques
  return (
    <div>
      <Navbar />
      {page === 'home' && (
        <HomePage />
      )}
      {page === 'about' && (
        <div>
          <h1>À propos</h1>
          <p>Cette application vous permet de gérer vos tâches quotidiennes facilement.</p>
        </div>
      )}
      {page === 'login' && (
        <>
          <Login onLogin={() => setIsLogged(true)} />
        </>
      )}
      {page === 'register' && (
        <div className="register-container">
          <Register onRegister={() => setPage('login')} />
          <p>
            Déjà inscrit ? <button onClick={() => setPage('login')}>Se connecter</button>
          </p>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;