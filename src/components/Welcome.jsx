import React from 'react';
import { useLocation,useNavigate, Navigate } from 'react-router-dom';
import './task.css';

function Welcome() {
  const location = useLocation();
  const user = location.state?.user;
  const navigate = useNavigate();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div id="container">
      <div id="card2">
        <img id="logo2" src="/Vend-X-logo-final-1.png" alt="VENDX Logo" />
        <h1 id="welcome-title">
          Welcome to vendx <span id="user-name">{user.First_Name} {user.Last_Name}</span>
        </h1>
        <button id="btn" onClick={() => navigate('/login')}>Logout</button>
      </div>
    </div>
  );
}

export default Welcome;
