// pages/Landing.js
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Landing({ auth }) {
  const navigate = useNavigate();

  return (
    <div className="page-shell">
      <div className="container">
        <div className="bottom-content">
          <h1>{auth?.loggedIn ? `Welcome back, ${auth.user.name}` : "Welcome to PopX"}</h1>
          <p>
            {auth?.loggedIn
              ? "Your profile is ready to go. Use the button below to view your profile or logout."
              : "A fast mobile-style experience for login, signup, and profile."}
          </p>

          <button
            className="primary-btn"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/login")}
          >
            Already Registered? Login
          </button>
        </div>
      </div>
    </div>
  );
}