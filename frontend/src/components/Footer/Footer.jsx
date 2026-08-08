import "./Footer.css";
import { Link } from "react-router-dom";
import {
  Wrench,
  MapPin,
  Mail,
  Phone,
  ArrowUp,
} from "lucide-react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}

        <div className="footer-brand">

          <div className="footer-logo">
            <Wrench size={28} />
          </div>

          <h2>
            Worker <span>Spot</span>
          </h2>

          <p>
            Connecting skilled workers with local communities through a
            trusted, secure and easy-to-use platform.
          </p>

        </div>

        {/* Quick Links */}

        <div className="footer-links">

          <h3>Quick Links</h3>

          <Link to="/">Home</Link>
          <Link to="/categories">Categories</Link>
          <Link to="/how-it-works">How It Works</Link>
          <Link to="/about">About</Link>

        </div>

        {/* Services */}

        <div className="footer-links">

          <h3>Popular Services</h3>

          <a href="#">Electrician</a>
          <a href="#">Plumber</a>
          <a href="#">Carpenter</a>
          <a href="#">Mechanic</a>

        </div>

        {/* Contact */}

        <div className="footer-links">

          <h3>Contact</h3>

          <p>
            <MapPin size={18} />
            India
          </p>

          <p>
            <Mail size={18} />
            support@workerspot.com
          </p>

          <p>
            <Phone size={18} />
            +91 XXXXX XXXXX
          </p>

        </div>

      </div>

      {/* Bottom */}

      <div className="footer-bottom">

        <p>
          © 2026 <span>Worker Spot</span>. All Rights Reserved.
        </p>

        <div className="footer-social">

          <a href="#">
            <FaGithub size={20} />
          </a>

          <a href="#">
            <FaLinkedin size={20} />
          </a>

          <a href="#">
            <FaInstagram size={20} />
          </a>

        </div>

        <button
          className="scroll-top"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <ArrowUp size={20} />
        </button>

      </div>

    </footer>
  );
}

export default Footer;