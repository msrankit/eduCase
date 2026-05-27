// pages/Login.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const loginResult = onLogin(email.trim(), password);
    if (!loginResult.success) {
      setError(loginResult.message);
      return;
    }
    navigate("/profile");
  };

  return (
    <div className="page-shell">
      <div className="form-container">
        <h2>Signin to your <br/> PopX account</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              placeholder="Enter email address"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label>Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          {error && <p className="form-error">{error}</p>}

          <button className="primary-btn full-width" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}