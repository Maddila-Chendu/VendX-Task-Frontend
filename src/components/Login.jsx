import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './task.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/task/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, Password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/welcome', { state: { user: data.user } });
      } else {
        setError(data.error || 'User not found...please register');
        
      }
      
    } catch (err) {
      setError('Internal server error...');
    }
  };

  return (
    <div id="container">
      <div id="card">
        <img id="logo" src="/Vend-X-logo-final-1.png" alt="VENDX Logo" />
        <h2>Welcome to Vendx</h2>

        {error && <p id="error-text">{error}</p>}

        <form onSubmit={handleLogin} id="form">
          <div id="group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div id="group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button id="btn" type="submit">Login</button>
            <p>If you don't have an account ??</p>
          <button id="link-btn" onClick={() => navigate('/register')}>
            Register Here
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
