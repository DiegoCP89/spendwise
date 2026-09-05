import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000";

const Register = ({ onShowLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    await axios.post(`${API_URL}/auth/register`, {
      name: name,
      email: email,
      password: password,
    });

    // After registration, go back to login screen
    onShowLogin();
  }

  return (
    <div className="auth-page">
      <div className="auth-logo">
        <span>💼</span>
        <span>SpendWise</span>
      </div>

      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        <div className="auth-form">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              className="form-input"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

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

          <button
            className="btn btn-primary"
            style={{ width: "100%" }}
            onClick={handleRegister}
          >
            Register
          </button>
        </div>

        <div className="auth-footer">
          <span>Already have an account? </span>
          <button onClick={onShowLogin}>Back to Login</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
