import { useState } from "react";
import "../home/home.css";
import { useNavigate } from "react-router";
import BGImage from '../../assets/BG.jpeg';

const LogIn = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const mockUsers = [
    {
      id: 23,
      username: "Hazem",
      password: "hazem12h",
      email: "hazem2359@gmail.com",
    },
  ];

  const handleLogin = () => {
    const user = mockUsers.find(
      (u) => u.username.toLocaleLowerCase() === username.toLocaleLowerCase() && u.password === password
    );

    if (user) {
      alert("Welcome " + user.username);

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id,
          username: user.username,
          email: user.email,
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
    <div
      className="login-bg"
      style={{ backgroundImage: `url(${BGImage})` }}
    >
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
                style={{backgroundColor:"rgb(255, 136, 0)"}}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button className="primary-btn"  style={{backgroundColor:"rgb(255, 136, 0)"}} onClick={handleLogin}>
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
