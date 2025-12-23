import "./home/home.css";
import { useNavigate } from "react-router";
import BGImage from "../assets/BG.jpeg";

const Home = () => {
  const Navigate = useNavigate();
  const goToSignUp = () => {
    Navigate("/signup");
  };
  const gotoLogIn = () => {
    Navigate("/login");
  };
  const goAsGuest =()=>{

    Navigate("/guest")
  }
  

  return (
    <div
      className="home-wrapper"
      style={{
        backgroundImage: `url(${BGImage})`,
      }}
    >
    
      <header className="header">
        <h2 className="logo">Booker!</h2>

        <nav>
          <ul className="nav-links">
            <li>
              <a href="/login">Register</a>
            </li>
            <li>
              <a href="signup">Sign in</a>
            </li>
            <li>
              <a href="#">About Us</a>
            </li>
            <li>
              <a href="#">English</a>
            </li>
          </ul>
        </nav>
      </header>

    
      <div className="main-content">
        <h1 className="main-title">What is your next plan?</h1>
        <p className="subtitle">
          Explore and book all exclusive events and matches.
        </p>

        <div className="cards-container">
          <div className="option-card"
          onClick={()=>{gotoLogIn()}}>
            <div className="card-icon">🎟</div>
            <h2>Book Events</h2>
            <p>Find & reserve event tickets</p>
            
          </div>

          <div className="option-card second-card"
          onClick={()=>{goAsGuest()}}>
            <div className="card-icon">📅</div>
            <h2>View Upcoming Events</h2>
            <p>Guest</p>
          </div>
        </div>

        
        <div className="auth-section">
          <span className="signin-text" onClick={goToSignUp}>
            Sign in
          </span>
          <span className="or">OR</span>
          <button className="register-btn" onClick={gotoLogIn}>
            Register Now!
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="footer">© 2025 Booker! All rights reserved.</footer>
    </div>
  );
};

export default Home;
