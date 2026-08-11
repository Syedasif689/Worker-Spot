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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  mobile: "",
  password: "",
  confirmPassword: "",
  terms: false,
});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  // Submit registration
  const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  if (formData.password !== formData.confirmPassword) {
    setError("Passwords do not match.");
    return;
  }

  if (formData.password.length < 8) {
    setError("Password must be at least 8 characters.");
    return;
  }

  if (!formData.terms) {
    setError("Please agree to the Terms and Conditions.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(
      "http://localhost:8080/api/auth/register/customer",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          password: formData.password,
        }),
      }
    );

    const data = await response.json();

    console.log("Backend status:", response.status);
    console.log("Backend response:", data);

    if (!response.ok) {
      throw new Error(
        data.message || "Customer registration failed."
      );
    }

    alert("Customer registration successful!");

    setFormData({
      fullName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
      terms: false,
    });

  } catch (err) {
    console.error("Registration error:", err);

    setError(
      err.message || "Something went wrong. Please try again."
    );

  } finally {
    setLoading(false);
  }
};


  return (
    <div className="customer-register-page">

      {/* =========================
          LEFT HERO SECTION
      ========================= */}
      <section className="customer-hero">
        <div className="customer-hero-content">

          {/* Brand Badge */}
          <div className="customer-hero-badge">
            <Sparkles size={16} />
            <span>Worker Spot</span>
          </div>

          {/* Hero Icons */}
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

          {/* Main Heading */}
          <h1>
            Find Trusted
            <span> Workers</span>
          </h1>

          <p className="customer-hero-subtitle">
            Connect with skilled professionals in your area.
            Find the right worker for your needs and get your
            work done with confidence.
          </p>

          {/* Benefits */}
          <div className="customer-hero-benefits">

            <div className="customer-hero-benefit">
              <div className="customer-hero-benefit-icon">
                <HandCoins size={18} />
              </div>

              <div>
                <strong>Simple Booking</strong>
                <span>Easy way to find workers</span>
              </div>
            </div>

            <div className="customer-hero-benefit">
              <div className="customer-hero-benefit-icon">
                <CheckCircle size={18} />
              </div>

              <div>
                <strong>Trusted Workers</strong>
                <span>Connect with local professionals</span>
              </div>
            </div>

            <div className="customer-hero-benefit">
              <div className="customer-hero-benefit-icon">
                <Clock size={18} />
              </div>

              <div>
                <strong>Quick Response</strong>
                <span>Find help when you need it</span>
              </div>
            </div>

            <div className="customer-hero-benefit">
              <div className="customer-hero-benefit-icon">
                <ShieldCheck size={18} />
              </div>

              <div>
                <strong>Safe & Secure</strong>
                <span>Your information stays protected</span>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* =========================
          RIGHT REGISTRATION SECTION
      ========================= */}
      <section className="customer-form-panel">

        <div className="customer-register-card">

          {/* Form Header */}
          <div className="customer-register-header">

            <div className="customer-register-icon">
              <UserPlus size={28} />
            </div>

            <h1>Create Customer Account</h1>

            <p>
              Create your account and start finding
              trusted workers today.
            </p>

          </div>


          {/* =========================
              REGISTRATION FORM
          ========================= */}
          <form onSubmit={handleSubmit}>

            {/* Full Name */}
            <div className="form-group">

              <label htmlFor="fullName">
                Full Name
              </label>

              <div className="input-box">

                <User size={20} />

                <input
                  id="fullName"
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

              <label htmlFor="email">
                Email Address
              </label>

              <div className="input-box">

                <Mail size={20} />

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>
             {/* Mobile Number */}
<div className="form-group">

  <label htmlFor="mobile">
    Mobile Number
  </label>

  <div className="input-box">

    <input
      id="mobile"
      type="tel"
      name="mobile"
      placeholder="Enter your mobile number"
      value={formData.mobile}
      onChange={handleChange}
      maxLength="10"
      required
    />

  </div>

</div>


            {/* Password */}
            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="input-box">
                 
                <Lock size={20} />

                <input
                  id="password"
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
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
                   
              </div>
              <p className="password-hint">
               Password must be at least 8 characters.
              </p>
               

            </div>
            


            {/* Confirm Password */}
            <div className="form-group">

              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <div className="input-box">

                <Lock size={20} />

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirm password"
                      : "Show confirm password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>


            {/* Terms */}
            <div className="terms">

              <input
                id="terms"
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                required
              />

              <label htmlFor="terms">

                I agree to the{" "}

                <a
                  href="/terms"
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms & Conditions
                </a>

                {" "}and{" "}

                <a
                  href="/privacy"
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>

                .

              </label>

            </div>


            {/* Safety Notice */}
            <div className="registration-safety">

              <ShieldCheck size={15} />

              <span>
                Please read our{" "}

                <a
                  href="/safety"
                  target="_blank"
                  rel="noreferrer"
                >
                  Safety Guidelines
                </a>

                {" "}before using Worker Spot.
              </span>

            </div>


            {/* Error */}
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}


            {/* Submit */}
            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >
             <UserPlus size={20} />

              {loading
              ? "Creating Account..."
               : "Create Customer Account"}
            </button>


            {/* Existing Account */}
            <div className="already-account">

              <span>
                Already have an account?
              </span>

              <a href="/customer-login">
                Login as Customer
              </a>

            </div>

          </form>

        </div>

      </section>

    </div>
  );
}

export default CustomerRegister;