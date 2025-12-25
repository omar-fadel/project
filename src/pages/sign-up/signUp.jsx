import { useState } from "react";
import "../sign-up/sign-up.css";
import { useNavigate } from "react-router";
import axios from "axios";
import BGImage from "../../assets/BG.jpeg";
import { APP_BACKEND_URL } from "../../constants/app-url";

const SignUP = () => {
  const Navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const backButton = () => {
    Navigate("/");
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handlePassword = async () => {
    if (!username) {
      alert("Please enter username!");
      return;
    }
    if (!password) {
      alert("Please enter password!");
      return;
    }
    if (!email) {
      alert("Please enter email!");
      return;
    }

    try {
      await axios.post(`${APP_BACKEND_URL}/Auth/register`, {
        fullName: username,
        password,
        email,
      });

      alert("User registered!");
      Navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Error adding user");
    }
  };

  return (
    <div
      className="auth-screen-wrapper"
      style={{ backgroundImage: `url(${BGImage})` }}
    >
      <div className="auth-glass-card">
        <div className="auth-content-stack">
          <h1 className="auth-title">Signup</h1>

          <input
            type="text"
            className="auth-field"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="auth-password-row">
            <input
              type={showPassword ? "text" : "password"}
              className="auth-field"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="auth-toggle-btn"
              onClick={togglePassword}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <input
            type="email"
            className="auth-field"
            placeholder="email@domain.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="auth-primary-btn" onClick={handlePassword}>
            Sign up!!
          </button>

          <button className="auth-secondary-btn" onClick={backButton}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUP;
