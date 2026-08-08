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

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "How It Works", path: "/how-it-works" },
    { name: "About", path: "/about" },
  ];

  return (
    <>
      {/* Navbar */}
      <header className="navbar">
        <div className="navbar-container">

          {/* Logo */}
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

          {/* Desktop Navigation */}
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

          {/* Desktop Buttons */}
          <div className="nav-buttons">

            <Link
              to="/login"
              className="login-btn"
            >
              Login
            </Link>

            {/* Register Dropdown */}
            <div className="register-dropdown">

              <button
                className="register-btn"
                onClick={() =>
                  setRegisterOpen(!registerOpen)
                }
              >
                Register
                <ChevronDown
                  size={17}
                  className={registerOpen ? "rotate-icon" : ""}
                />
              </button>

              {registerOpen && (
                <div className="register-menu">

                  <Link
                    to="/Userrig"
                    className="register-option"
                    onClick={() => setRegisterOpen(false)}
                  >
                    <User size={19} />

                    <div>
                      <strong>Register as Customer</strong>
                      <span>Find and book workers</span>
                    </div>
                  </Link>

                  <Link
                    to="/register"
                    className="register-option"
                    onClick={() => setRegisterOpen(false)}
                  >
                    <Briefcase size={19} />

                    <div>
                      <strong>Register as Worker</strong>
                      <span>Offer your services</span>
                    </div>
                  </Link>

                </div>
              )}

            </div>

          </div>

          {/* Mobile Toggle */}
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

      {/* Mobile Menu */}
      <div
        className={`mobile-menu ${
          menuOpen ? "active" : ""
        }`}
      >

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

        <Link
          to="/login"
          className="mobile-login-btn"
          onClick={() => setMenuOpen(false)}
        >
          Login
        </Link>

        {/* Mobile Registration Options */}
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
            Register as Customer
          </Link>

          <Link
            to="/register"
            className="mobile-register-option"
            onClick={() => setMenuOpen(false)}
          >
            <Briefcase size={19} />
            Register as Worker
          </Link>

        </div>

      </div>
    </>
  );
}

export default Navbar;