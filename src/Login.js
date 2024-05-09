import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './styles/Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoggingIn(true); // Mostrar animación de carga
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        // Usuario y contraseña válidos, redirigir a la página principal
        localStorage.setItem('isLoggedIn', 'true');
        setIsLoggedIn(true);
      } else {
        // Usuario o contraseña incorrectos, mostrar mensaje de error
        setError('Usuario o contraseña incorrectos');
        setIsLoggingIn(false); // Detener animación de carga
      }
    }, 900); // Simula una carga en segundos
  };
  
  if (isLoggedIn) {
    return <Navigate to="/FormularioFecha" />;
  }

  return (
    <div className="container">
      <form className={`login-form ${isLoggingIn ? 'logging-in' : ''}`} onSubmit={handleSubmit}>
        <img src="/images/login.png" alt="Logo" className="login-logo" />
        <p className="welcome-message">Bienvenido, por favor inicia sesión</p>
        <label>
          Usuario:
          <input
            className="login-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {isLoggingIn && <div className="loading-message">Iniciando sesión...</div>}
        {error && <div className={`error-message ${error ? 'show-error' : ''}`}>{error}</div>}
        <button className="login-button" type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
  
  
};

export default Login;
