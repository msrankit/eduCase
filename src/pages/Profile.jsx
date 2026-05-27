// pages/Profile.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Profile({ auth, onLogout }) {
  const navigate = useNavigate();
  const user = auth?.user;

  useEffect(() => {
    if (!auth?.loggedIn) {
      navigate("/login");
    }
  }, [auth, navigate]);

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <div className="page-shell">
      <div className="profile-page">
        <div className="profile-card">
          <div className="profile-header">
            <img
              src="https://i.pravatar.cc/100"
              alt="avatar"
              className="avatar"
            />

            <div>
              <h3>{user?.name || "Your Name"}</h3>
              <p>{user?.email || "youremail@example.com"}</p>
            </div>
          </div>

          <p className="profile-text">
            {user?.company
              ? `Welcome back to PopX, ${user.name}. Your account is set up as ${user.agency === "yes" ? "an agency" : "a team member"}.`
              : "Welcome to your profile. Use logout to exit the app."}
          </p>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}