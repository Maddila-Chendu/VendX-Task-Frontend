import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../CSS/./task.css';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/login', {
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
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', paddingRight: '40px', boxSizing: 'border-box' }}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '10px', cursor: 'pointer', display: 'flex', color: '#666' }}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                )}
              </span>
            </div>
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
