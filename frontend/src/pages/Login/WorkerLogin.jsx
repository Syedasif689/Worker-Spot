import { useState } from "react";
import {
  Briefcase,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Wrench,
  Users,
  ShieldCheck,
  LogIn,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Login.css";

function WorkerLogin() {
  const [showPassword, setShowPassword] = useState(false);

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
              <Briefcase size={28} />
            </div>

            <div>
              <h2>Worker Spot</h2>
              <span>Local services. Real opportunities.</span>
            </div>

          </div>

          {/* Message */}
          <div className="login-message">

            <div className="login-badge">
              <Wrench size={15} />
              Grow Your Work
            </div>

            <h1>
              Turn your
              <span> skills </span>
              into opportunities.
            </h1>

            <p>
              Login to Worker Spot and manage your worker
              profile, connect with customers and discover
              new opportunities in your local area.
            </p>

          </div>

          {/* Features */}
          <div className="login-features">

            <div className="login-feature">

              <div className="feature-icon">
                <Users size={21} />
              </div>

              <div>
                <h3>Connect With Customers</h3>
                <p>
                  Get opportunities from customers looking
                  for your services.
                </p>
              </div>

            </div>

            <div className="login-feature">

              <div className="feature-icon">
                <Wrench size={21} />
              </div>

              <div>
                <h3>Show Your Skills</h3>
                <p>
                  Build your profile with your skills,
                  experience and services.
                </p>
              </div>

            </div>

            <div className="login-feature">

              <div className="feature-icon">
                <ShieldCheck size={21} />
              </div>

              <div>
                <h3>Free Worker Access</h3>
                <p>
                  Worker Spot does not charge workers platform fees.
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
              <Briefcase size={27} />
            </div>

            <h1>Worker Login</h1>

            <p>
              Login to manage your services
            </p>

          </div>

          {/* Form */}
          <form>

            {/* Email */}
            <div className="login-form-group">

              <label htmlFor="worker-email">
                Email Address
              </label>

              <div className="login-input-box">

                <Mail size={19} />

                <input
                  id="worker-email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />

              </div>

            </div>

            {/* Password */}
            <div className="login-form-group">

              <label htmlFor="worker-password">
                Password
              </label>

              <div className="login-input-box">

                <Lock size={19} />

                <input
                  id="worker-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
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

            {/* Login */}
            <button
              type="submit"
              className="login-button"
            >
              Login as Worker
              <LogIn size={18} />
            </button>

          </form>

          {/* Register */}
          <div className="login-register">

            <p>
              Don't have a worker account?
            </p>

            <div className="login-register-links">

              <Link to="/register">
                <Briefcase size={17} />
                Create Worker Account
              </Link>

              <Link to="/customer-login">
                <User size={17} />
                Login as Customer
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

export default WorkerLogin;