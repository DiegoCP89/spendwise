import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000";

const Login = ({ onLogin, onShowRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin() {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData);
      onLogin(response.data.access_token);
    } catch (error) {
      setErrorMessage(error.response?.data?.detail || "Login failed.");
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-logo">
        <div className="logo-icon">$</div>
        <span>SpendWise</span>
      </div>

      <div className="auth-card">
        <h2 className="auth-title">Login</h2>

        <div className="auth-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button
            className="btn btn-primary"
            style={{ width: "100%" }}
            onClick={handleLogin}
          >
            Login
          </button>
        </div>

        <div className="auth-footer">
          <span>Don't have an account? </span>
          <button onClick={onShowRegister}>Create Account</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
