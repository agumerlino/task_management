import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Leer la URL base del backend desde el .env
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  console.log('Backend URL:', backendUrl);

  //Login, solicitud POST al servidor
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/auth/login`, {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token); 
      navigate('/tasks'); 
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="content">
      <div className="task-form">
        <h2 className="form-title">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;