// App.js
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";


function getUsers() {
  const stored = localStorage.getItem(`${import.meta.env.USERS_KEY}`);
  return stored ? JSON.parse(stored) : {};
}

function saveUsers(users) {
  localStorage.setItem(import.meta.env.USERS_KEY, JSON.stringify(users));
}

export default function App() {
  const [auth, setAuth] = useState(() => {
    const storedAuth = localStorage.getItem(import.meta.env.AUTH_USER_KEY);
    return storedAuth
      ? { loggedIn: true, user: JSON.parse(storedAuth) }
      : { loggedIn: false, user: null };
  });

  const handleSignup = (signupData) => {
    const users = getUsers();
    if (users[signupData.email]) {
      return { success: false, message: "An account already exists with that email." };
    }
    users[signupData.email] = signupData;
    saveUsers(users);
    localStorage.setItem(import.meta.env.AUTH_USER_KEY, JSON.stringify(signupData));
    setAuth({ loggedIn: true, user: signupData });
    return { success: true };
  };

  const handleLogin = (email, password) => {
    const users = getUsers();
    const user = users[email];
    if (!user) {
      return { success: false, message: "No account found with that email." };
    }
    if (user.password !== password) {
      return { success: false, message: "Incorrect password. Please try again." };
    }
    localStorage.setItem(import.meta.env.AUTH_USER_KEY, JSON.stringify(user));
    setAuth({ loggedIn: true, user });
    return { success: true };
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_USER_KEY);
    setAuth({ loggedIn: false, user: null });
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Landing auth={auth} />}
        />
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/signup"
          element={<Signup onSignup={handleSignup} />}
        />
        <Route
          path="/profile"
          element={<Profile auth={auth} onLogout={handleLogout} />}
        />
      </Routes>
    </BrowserRouter>
  );
}