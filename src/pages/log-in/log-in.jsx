import { useState } from "react";
import "../home/home.css";
import { useNavigate } from "react-router";
import BGImage from "../../assets/BG.jpeg";
import axios from "axios";
import { APP_BACKEND_URL } from "../../constants/app-url";

const LogIn = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const response = await axios.post(`${APP_BACKEND_URL}/Auth/login`, {
      email: username,
      password: password,
    });
    const { user, token } = response.data;

    if (user) {
      alert("Welcome " + user.fullName);

      localStorage.setItem(
        "user",
        JSON.stringify({
          username: user.fullName,
          email: user.email,
          role: user.role,
          id: user.userId,
          token,
        })
      );

      navigate("/dashboard");
    } else {
      alert("Username or password is incorrect");
    }
  };

  const backButton = () => {
    navigate("/");
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-bg" style={{ backgroundImage: `url(${BGImage})` }}>
      <div className="login-wrapper">
        <div className="login-card">
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Log in to continue using Booker!</p>

          <div className="input-group">
            <label className="input-label">Username</label>
            <input
              type="text"
              className="user-input"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                className="user-input password-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="view-pass-btn"
                onClick={togglePassword}
                style={{ backgroundColor: "rgb(255, 136, 0)" }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            className="primary-btn"
            style={{ backgroundColor: "rgb(255, 136, 0)" }}
            onClick={handleLogin}
          >
            Log In
          </button>

          <button className="secondary-btn" onClick={backButton}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
