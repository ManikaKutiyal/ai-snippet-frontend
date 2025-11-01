import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import VideoBackground from '../VideoBackground.jsx';

const API_URL = 'http://localhost:5007/api/auth/register';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const { login } = useAuth();
  const navigate = useNavigate(); // <-- We will use this

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      const res = await axios.post(API_URL, {
        email,
        password,
      });

      const token = res.data.token;

      // 1. Call the 'login' function
      login(token);

      // 2. NOW, we navigate to the homepage
      navigate('/');

    } catch (err) {
      console.error('Registration failed:', err);
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  // ... (rest of the JSX is identical)
  return (
    <div className="auth-container">
      <VideoBackground />
      <div className="auth-form-wrapper">
        <h1 className="auth-title">AI Dev Snippet Saver</h1>
        <h2 className="auth-title">Sign Up</h2> {/* <-- CHANGE THIS */}        <form onSubmit={handleSubmit} className="auth-form">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {error && <p className="auth-error">{error}</p>}
          
          <button type="submit" className="auth-button">Register</button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
