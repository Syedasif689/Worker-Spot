import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Users,
  Briefcase,
  ShieldCheck,
  Clock,
  HandCoins,
  Sparkles,
  CheckCircle,
} from "lucide-react";

import "./Userrig.css";

function CustomerRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.terms) {
      setError("Please agree to the Terms and Conditions.");
      return;
    }

    console.log("Customer Registration Data:", formData);

    alert("Customer registration successful!");

    // Later:
    // Send formData to Spring Boot API
  };

  return (
    <div className="customer-register-page">
      <div className="customer-register-container">

        {/* ===== LEFT HERO PANEL ===== */}
        <div className="customer-hero">
          <div className="customer-hero-content">

            <div className="customer-hero-badge">
              <Sparkles size={16} />
              <span>Worker Spot</span>
            </div>

            <div className="customer-hero-icon-group">
              <div className="customer-hero-icon-ring">
                <Users size={48} strokeWidth={1.5} />
              </div>
              <div className="customer-hero-icon-ring small">
                <Briefcase size={24} strokeWidth={1.5} />
              </div>
              <div className="customer-hero-icon-ring small">
                <ShieldCheck size={24} strokeWidth={1.5} />
              </div>
            </div>

            <h1>Find Trusted Workers</h1>

            <p className="customer-hero-subtitle">
              Connect with skilled professionals in your area. Post a job,
              get quotes, and hire with confidence — all in one place.
            </p>

            <div className="customer-hero-benefits">
              <div className="customer-hero-benefit">
                <div className="customer-hero-benefit-icon">
                  <HandCoins size={18} />
                </div>
                <span>No booking fees</span>
              </div>

              <div className="customer-hero-benefit">
                <div className="customer-hero-benefit-icon">
                  <CheckCircle size={18} />
                </div>
                <span>Verified workers</span>
              </div>

              <div className="customer-hero-benefit">
                <div className="customer-hero-benefit-icon">
                  <Clock size={18} />
                </div>
                <span>Quick response</span>
              </div>

              <div className="customer-hero-benefit">
                <div className="customer-hero-benefit-icon">
                  <ShieldCheck size={18} />
                </div>
                <span>Safe &amp; secure</span>
              </div>
            </div>


          </div>
        </div>

        {/* ===== RIGHT FORM PANEL ===== */}
        <div className="customer-form-panel">
          <div className="customer-register-card">

            {/* Header */}
            <div className="customer-register-header">
              <div className="customer-register-icon">
                <UserPlus size={28} />
              </div>
              <h1>Customer Registration</h1>
              <p>
                Create your account and start hiring trusted workers today.
              </p>
            </div>

            <form onSubmit={handleSubmit}>

              {/* Full Name */}
              <div className="form-group">
                <label>Full Name</label>
                <div className="input-box">
                  <User size={20} />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-group">
                <label>Email</label>
                <div className="input-box">
                  <Mail size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label>Password</label>
                <div className="input-box">
                  <Lock size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="form-group">
                <label>Confirm Password</label>
                <div className="input-box">
                  <Lock size={20} />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="password-button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="terms">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                />
                <span>
                  I have read and agree to the{" "}
                  <a href="/terms" target="_blank" rel="noreferrer">
                    Terms & Conditions
                  </a>
                  {" "}and{" "}
                  <a href="/privacy" target="_blank" rel="noreferrer">
                    Privacy Policy
                  </a>
                  .
                </span>
              </div>

              {/* Safety */}
              <p className="registration-safety">
                🛡️ Please read our{" "}
                <a href="/safety" target="_blank" rel="noreferrer">
                  Safety Guidelines
                </a>
                {" "}before using Worker Spot.
              </p>

              {/* Error */}
              {error && <div className="error-message">{error}</div>}

              {/* Submit */}
              <button type="submit" className="register-button">
                <UserPlus size={20} />
                Register as Customer
              </button>

            </form>

          </div>
        </div>

      </div>
    </div>
  );
}

export default CustomerRegister;