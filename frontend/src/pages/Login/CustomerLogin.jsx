import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  MapPin,
  Search,
  ShieldCheck,
  LogIn,
  Briefcase,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function CustomerLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = awaitfetch(
  `${import.meta.env.VITE_API_URL}/api/auth/login`,
  {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password: password,
            role: "CUSTOMER",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Invalid email or password"
        );
      }

      // Store JWT
      localStorage.setItem("token", data.token);

      // Store logged-in user information
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: data.userId,
          fullName: data.fullName,
          email: data.email,
          role: data.role,
        })
      );

      console.log("Customer login successful:", data);

      // Make sure only CUSTOMER accounts continue
      if (data.role !== "CUSTOMER") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        throw new Error(
          "This account is not registered as a customer."
        );
      }

      // Temporary dashboard route
      navigate("/customer-dashboard");

    } catch (error) {
      console.error("Customer login error:", error);

      setError(
        error.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* =========================
          LEFT CONTENT
      ========================= */}

      <div className="login-content">
        <div className="login-content-inner">

          {/* Brand */}
          <div className="login-brand">
            <div className="login-brand-icon">
              <User size={28} />
            </div>

            <div>
              <h2>Worker Spot</h2>
              <span>
                Local services. Real opportunities.
              </span>
            </div>
          </div>

          {/* Message */}
          <div className="login-message">

            <div className="login-badge">
              <MapPin size={15} />
              Find Workers Near You
            </div>

            <h1>
              Get the right
              <span> worker </span>
              for your work.
            </h1>

            <p>
              Login to Worker Spot and discover local workers
              for your service needs. Find the right person,
              connect with them and get your work done.
            </p>

          </div>

          {/* Features */}
          <div className="login-features">

            <div className="login-feature">
              <div className="feature-icon">
                <Search size={21} />
              </div>

              <div>
                <h3>Find Local Workers</h3>
                <p>
                  Discover workers available in your area.
                </p>
              </div>
            </div>

            <div className="login-feature">
              <div className="feature-icon">
                <Briefcase size={21} />
              </div>

              <div>
                <h3>Choose the Right Service</h3>
                <p>
                  Find workers based on their skills and
                  experience.
                </p>
              </div>
            </div>

            <div className="login-feature">
              <div className="feature-icon">
                <ShieldCheck size={21} />
              </div>

              <div>
                <h3>Simple & Secure</h3>
                <p>
                  Connect with workers through Worker Spot.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* =========================
          RIGHT LOGIN FORM
      ========================= */}

      <div className="login-form-side">

        <div className="login-container">

          {/* Header */}
          <div className="login-header">

            <div className="login-icon">
              <User size={27} />
            </div>

            <h1>Customer Login</h1>

            <p>
              Login to find and book workers
            </p>

          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="login-form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="login-input-box">

                <Mail size={19} />

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  required
                />

              </div>

            </div>

            {/* Password */}
            <div className="login-form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="login-input-box">

                <Lock size={19} />

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  required
                />

                <button
                  type="button"
                  className="login-password-button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>

              </div>

            </div>

            {/* Options */}
            <div className="login-options">

              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>

              <Link to="/forgot-password">
                Forgot password?
              </Link>

            </div>

            {/* Error */}
            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            {/* Login */}
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login as Customer"}

              {!loading && <LogIn size={18} />}
            </button>

          </form>

          {/* Register */}
          <div className="login-register">

            <p>
              Don't have a customer account?
            </p>

            <div className="login-register-links">

              <Link to="/Userrig">
                <User size={17} />
                Create Customer Account
              </Link>

              <Link to="/worker-login">
                <Briefcase size={17} />
                Login as Worker
              </Link>

            </div>

          </div>

          {/* Safety */}
          <div className="login-safety">
            <ShieldCheck size={14} />
            Your account information is protected
          </div>

        </div>

      </div>

    </div>
  );
}

export default CustomerLogin;