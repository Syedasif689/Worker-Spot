import { useState } from "react";
import {
  Menu,
  X,
  Wrench,
  User,
  Briefcase,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      {/* =========================
          NAVBAR
      ========================= */}
      <header className="navbar">
        <div className="navbar-container">

          {/* =========================
              LOGO
          ========================= */}
          <Link
            to="/"
            className="logo"
            onClick={() => setMenuOpen(false)}
          >
            <div className="logo-icon">
              <Wrench className="text-white" size={22} />
            </div>

            <h1 className="logo-title">
              Worker<span className="logo-highlight"> Spot</span>
            </h1>
          </Link>

          {/* =========================
              DESKTOP NAVIGATION
          ========================= */}
          <nav className="nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="nav-link"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* =========================
              DESKTOP BUTTONS
          ========================= */}
          <div className="nav-buttons">

            {/* =========================
                LOGIN DROPDOWN
            ========================= */}
            <div className="login-dropdown">

              <button
                className="login-btn"
                onClick={() => {
                  setLoginOpen(!loginOpen);
                  setRegisterOpen(false);
                }}
              >
                Login

                <ChevronDown
                  size={17}
                  className={
                    loginOpen ? "rotate-icon" : ""
                  }
                />
              </button>

              {loginOpen && (
                <div className="login-menu">

                  {/* Customer Login */}
                  <Link
                    to="/customer-login"
                    className="login-option"
                    onClick={() => setLoginOpen(false)}
                  >
                    <User size={19} />

                    <div>
                      <strong>
                        Login as Customer
                      </strong>

                      <span>
                        Find and book workers
                      </span>
                    </div>
                  </Link>

                  {/* Worker Login */}
                  <Link
                    to="/worker-login"
                    className="login-option"
                    onClick={() => setLoginOpen(false)}
                  >
                    <Briefcase size={19} />

                    <div>
                      <strong>
                        Login as Worker
                      </strong>

                      <span>
                        Manage your services
                      </span>
                    </div>
                  </Link>

                </div>
              )}

            </div>

            {/* =========================
                REGISTER DROPDOWN
            ========================= */}
            <div className="register-dropdown">

              <button
                className="register-btn"
                onClick={() => {
                  setRegisterOpen(!registerOpen);
                  setLoginOpen(false);
                }}
              >
                Register

                <ChevronDown
                  size={17}
                  className={
                    registerOpen
                      ? "rotate-icon"
                      : ""
                  }
                />
              </button>

              {registerOpen && (
                <div className="register-menu">

                  {/* Customer Registration */}
                  <Link
                    to="/Userrig"
                    className="register-option"
                    onClick={() =>
                      setRegisterOpen(false)
                    }
                  >
                    <User size={19} />

                    <div>
                      <strong>
                        Register as Customer
                      </strong>

                      <span>
                        Find and book workers
                      </span>
                    </div>
                  </Link>

                  {/* Worker Registration */}
                  <Link
                    to="/register"
                    className="register-option"
                    onClick={() =>
                      setRegisterOpen(false)
                    }
                  >
                    <Briefcase size={19} />

                    <div>
                      <strong>
                        Register as Worker
                      </strong>

                      <span>
                        Offer your services
                      </span>
                    </div>
                  </Link>

                </div>
              )}

            </div>

          </div>

          {/* =========================
              MOBILE TOGGLE
          ========================= */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X size={30} />
            ) : (
              <Menu size={30} />
            )}
          </button>

        </div>
      </header>

      {/* =========================
          MOBILE MENU
      ========================= */}
      <div
        className={`mobile-menu ${
          menuOpen ? "active" : ""
        }`}
      >

        {/* Navigation Links */}
        {navLinks.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className="mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </Link>
        ))}

        {/* =========================
            MOBILE LOGIN
        ========================= */}
        <div className="mobile-login-section">

          <p className="mobile-login-title">
            Login
          </p>

          <Link
            to="/customer-login"
            className="mobile-login-option"
            onClick={() => setMenuOpen(false)}
          >
            <User size={19} />

            <span>
              Login as Customer
            </span>
          </Link>

          <Link
            to="/worker-login"
            className="mobile-login-option"
            onClick={() => setMenuOpen(false)}
          >
            <Briefcase size={19} />

            <span>
              Login as Worker
            </span>
          </Link>

        </div>

        {/* =========================
            MOBILE REGISTRATION
        ========================= */}
        <div className="mobile-register-section">

          <p className="mobile-register-title">
            Register
          </p>

          <Link
            to="/Userrig"
            className="mobile-register-option"
            onClick={() => setMenuOpen(false)}
          >
            <User size={19} />

            <span>
              Register as Customer
            </span>
          </Link>

          <Link
            to="/register"
            className="mobile-register-option"
            onClick={() => setMenuOpen(false)}
          >
            <Briefcase size={19} />

            <span>
              Register as Worker
            </span>
          </Link>

        </div>

      </div>
    </>
  );
}

export default Navbar;