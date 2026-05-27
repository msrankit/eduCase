// pages/Signup.js
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

export default function Signup({ onSignup }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [agency, setAgency] = useState("yes");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim() || !password.trim()) {
      setError("Please complete all required fields.");
      return;
    }
    const result = onSignup({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      password,
      company: company.trim(),
      agency,
    });
    if (!result.success) {
      setError(result.message);
      return;
    }
    navigate("/profile");
  };

  return (
    <div className="page-shell">
      <div className="form-container">
        <h2>Create your <br/> PopX account</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Full Name*</label>
            <input
              type="text"
              value={name}
              placeholder="Enter full name"
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label>Phone number*</label>
            <input
              type="text"
              value={phone}
              placeholder="Enter phone number"
              onChange={(event) => setPhone(event.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label>Email address*</label>
            <input
              type="email"
              value={email}
              placeholder="Enter email address"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label>Password*</label>
            <input
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label>Company name</label>
            <input
              type="text"
              value={company}
              placeholder="Enter company name"
              onChange={(event) => setCompany(event.target.value)}
            />
          </div>

          <div className="radio-group">
            <p>Are you an Agency?*</p>

            <label>
              <input
                type="radio"
                name="agency"
                value="yes"
                checked={agency === "yes"}
                onChange={(event) => setAgency(event.target.value)}
              />
              Yes
            </label>

            <label>
              <input
                type="radio"
                name="agency"
                value="no"
                checked={agency === "no"}
                onChange={(event) => setAgency(event.target.value)}
              />
              No
            </label>
          </div>

          {error && <p className="form-error">{error}</p>}

          <button className="primary-btn full-width" type="submit">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}