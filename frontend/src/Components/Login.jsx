import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:8000";

const Login = ({ onLogin, onShowRegister }) => {
  // 1. states aqui
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 2. função handleLogin aqui
  async function handleLogin() {
    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    const response = await axios.post(`${API_URL}/auth/login`, formData);
    onLogin(response.data.access_token);
  }

  // 3. return com formulário aqui
  return (
    <div>
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
      <button onClick={onShowRegister}>Create Account</button>
    </div>
  );
};

export default Login;
