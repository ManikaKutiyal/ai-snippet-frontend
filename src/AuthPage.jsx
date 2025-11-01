import { useState } from "react";
import axios from "axios";
import { useAuth } from "./context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import VideoBackground from "./VideoBackground.jsx";
import "./AuthPage.css";

export default function AuthPage({ mode = "login" }) {
const [isLogin, setIsLogin] = useState(mode === "login");
//   const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const API_URL = isLogin
    ? "https://ai-snippet-backend.vercel.app/api/auth/login"
    : "https://ai-snippet-backend.vercel.app/api/auth/register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(API_URL, { email, password });
      login(res.data.token);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (isLogin ? "Login failed" : "Registration failed")
      );
    }
  };

  return (
    <div className="auth-page">
      <VideoBackground />

      <div className={`auth-box ${isLogin ? "" : "active"}`}>
        <div className="form-container login-container">
          <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            {error && <p className="error">{error}</p>}
            <button>Login</button>
          </form>
        </div>

        <div className="form-container register-container">
          <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            {error && <p className="error">{error}</p>}
            <button>Register</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected, please login</p>
              <button className="ghost" onClick={() => setIsLogin(true)}>
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your details to register</p>
              <button className="ghost" onClick={() => setIsLogin(false)}>
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
