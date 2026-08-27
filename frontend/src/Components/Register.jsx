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
    <div>
      <h2>Create Account</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
      <button onClick={onShowLogin}>Back to Login</button>
    </div>
  );
};

export default Register;
