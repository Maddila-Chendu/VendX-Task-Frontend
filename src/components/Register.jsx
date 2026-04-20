import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './task.css';

function Register() {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    username: '',
    Password: '',
    confirmPassword: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (formData.Password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/task/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          FirstName: formData.FirstName,
          LastName: formData.LastName,
          username: formData.username,
          Password: formData.Password,
          confirmPassword: formData.confirmPassword
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registered successfully');
        setFormData({ FirstName: '', LastName: '', username: '', Password: '', confirmPassword: '' });
      } else {
        setError(data.error || 'Failed to register');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div id="container">
      <div id="card">
        <img id="logo" src="/Vend-X-logo-final-1.png" alt="VENDX Logo" />
        <h2>Register Here</h2>
        
        {error && <p id="error-text">{error}</p>}

        <form onSubmit={handleRegister} id="form">
          <div id="group">
            <label htmlFor="FirstName">First Name</label>
            <input
              type="text"
              id="FirstName"
              placeholder="Enter First Name"
              value={formData.FirstName}
              onChange={handleChange}
              required
            />
          </div>
          <div id="group">
            <label htmlFor="LastName">Last Name</label>
            <input
              type="text"
              id="LastName"
              placeholder="Enter Last Name"
              value={formData.LastName}
              onChange={handleChange}
              required
            />
          </div>
          <div id="group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div id="group">
            <label htmlFor="Password">Password</label>
            <input
              type="password"
              id="Password"
              placeholder="Enter Password"
              value={formData.Password}
              onChange={handleChange}
              required
            />
          </div>
          <div id="group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button id="btn" type="submit">Register</button>
        </form>

        {message && <p id="success-text">{message}</p>}

        <div id="footer">
          <p>Already have an account?</p>
          <button id="link-btn" onClick={() => navigate('/login')}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
