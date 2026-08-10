import { useState } from "react";
import {
  User,
  Phone,
  Mail,
  Lock,
  MapPin,
  Briefcase,
  Calendar,
  Eye,
  EyeOff,
  UserPlus,
  ShieldCheck,
  Clock,
  HandCoins,
  Users,
  Sparkles,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

import "./Register.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
    location: "",
    category: "",
    age: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Number(formData.age) < 19) {
      setError("Workers must be 19 years or older.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.terms) {
      setError("Please agree to the Terms and Conditions.");
      return;
    }

    console.log("Worker Registration Data:", formData);

    alert("Worker registration successful!");

    // Later:
    // Send formData to Spring Boot API
  };

  return (
    <div className="register-page">
      <div className="register-layout">

        {/* =====================================================
            LEFT SIDE
        ====================================================== */}

        <section className="register-content">
          <div className="register-content-inner">

            {/* Brand */}
            <div className="register-brand">
              <div className="register-brand-icon">
                <Briefcase size={28} />
              </div>

              <div>
                <h2>
                  Worker<span> Spot</span>
                </h2>

                <p>Opportunities for skilled workers</p>
              </div>
            </div>

            {/* Badge */}
            <div className="register-badge">
              <Sparkles size={15} />
              <span>Join Worker Spot</span>
            </div>

            {/* Main Heading */}
            <div className="register-message">
              <h1>
                Turn your <span>skills</span> into opportunities.
              </h1>

              <p>
                Create your Worker Spot account and connect with customers
                looking for skilled workers in your area.
              </p>
            </div>

            {/* Benefits */}
            <div className="register-features">

              <div className="register-feature">
                <div className="feature-icon">
                  <HandCoins size={20} />
                </div>

                <div>
                  <h3>No registration fees</h3>
                  <p>
                    Worker Spot does not charge workers to join.
                  </p>
                </div>
              </div>

              <div className="register-feature">
                <div className="feature-icon">
                  <CheckCircle size={20} />
                </div>

                <div>
                  <h3>Keep your earnings</h3>
                  <p>
                    Your service charges are yours.
                  </p>
                </div>
              </div>

              <div className="register-feature">
                <div className="feature-icon">
                  <Clock size={20} />
                </div>

                <div>
                  <h3>Work on your terms</h3>
                  <p>
                    Choose when and which services you accept.
                  </p>
                </div>
              </div>

              <div className="register-feature">
                <div className="feature-icon">
                  <Users size={20} />
                </div>

                <div>
                  <h3>Connect with customers</h3>
                  <p>
                    Get opportunities from customers nearby.
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Message */}
            <div className="register-side-note">
              <ShieldCheck size={18} />

              <span>
                You remain an independent service provider.
              </span>
            </div>

          </div>
        </section>

        {/* =====================================================
            RIGHT SIDE
        ====================================================== */}

        <section className="register-form-side">

          <div className="register-container">

            {/* Header */}
            <div className="register-header">

              <div className="register-icon">
                <UserPlus size={27} />
              </div>

              <h1>Create Worker Account</h1>

              <p>
                Register as a worker and start receiving opportunities.
              </p>

            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>

              {/* Full Name */}
              <div className="register-form-group">
                <label>Full Name</label>

                <div className="register-input-box">
                  <User size={19} />

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

              {/* Mobile */}
              <div className="register-form-group">
                <label>Mobile Number</label>

                <div className="register-input-box">
                  <Phone size={19} />

                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    maxLength="10"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="register-form-group">
                <label>Email Address</label>

                <div className="register-input-box">
                  <Mail size={19} />

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
              <div className="register-form-group">
                <label>Password</label>

                <div className="register-input-box">
                  <Lock size={19} />

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
                    className="register-password-button"
                    onClick={() =>
                      setShowPassword(!showPassword)
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

              {/* Confirm Password */}
              <div className="register-form-group">
                <label>Confirm Password</label>

                <div className="register-input-box">
                  <Lock size={19} />

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
                    className="register-password-button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="register-form-group">
                <label>Location</label>

                <div className="register-input-box">
                  <MapPin size={19} />

                  <input
                    type="text"
                    name="location"
                    placeholder="City / Town / Area"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div className="register-form-group">
                <label>Work Category</label>

                <div className="register-input-box">
                  <Briefcase size={19} />

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      Select your category
                    </option>

                    <option value="Plumber">
                      Plumber
                    </option>

                    <option value="Electrician">
                      Electrician
                    </option>

                    <option value="Carpenter">
                      Carpenter
                    </option>

                    <option value="Mechanic">
                      Mechanic
                    </option>

                    <option value="Painter">
                      Painter
                    </option>

                    <option value="AC Technician">
                      AC Technician
                    </option>

                    <option value="Mason">
                      Mason
                    </option>

                    <option value="Welder">
                      Welder
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>
              </div>

              {/* Age */}
              <div className="register-form-group">
                <label>Age</label>

                <div className="register-input-box">
                  <Calendar size={19} />

                  <input
                    type="number"
                    name="age"
                    placeholder="Enter your age"
                    min="19"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />
                </div>

                <small>
                  Workers must be 19 years or older.
                </small>
              </div>

              {/* Worker Policy */}
              <div className="worker-policy">

                <div className="worker-policy-title">
                  <ShieldCheck size={19} />

                  <h3>
                    Worker Independence & No Worker Fees
                  </h3>
                </div>

                <p>
                  Workers on Worker Spot are independent service
                  providers and are not employees, agents, partners,
                  or representatives of Worker Spot.
                </p>

                <p>
                  <strong>
                    Worker Spot does not charge workers
                  </strong>{" "}
                  any registration fee, subscription fee, booking fee,
                  commission, platform fee, or service fee for using
                  the platform.
                </p>

                <p>
                  Workers independently decide whether to accept
                  service requests and are responsible for providing
                  their services to customers.
                </p>

              </div>

              {/* Terms */}
              <label className="register-terms">

                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  required
                />

                <span>
                  I have read and agree to the{" "}
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>
                  .
                </span>

              </label>

              {/* Safety */}
              <p className="registration-safety">
                <ShieldCheck size={14} />

                Please read our{" "}

                <a
                  href="/safety"
                  target="_blank"
                  rel="noreferrer"
                >
                  Safety Guidelines
                </a>{" "}
                before using Worker Spot.
              </p>

              {/* Error */}
              {error && (
                <div className="register-error">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="register-button"
              >
                <UserPlus size={19} />

                Create Worker Account

                <ArrowRight size={18} />
              </button>

            </form>

            {/* Login */}
            <div className="register-login">

              <p>
                Already have a Worker Spot account?
              </p>

              <a href="/worker-login">
                Login as Worker
              </a>

            </div>

          </div>

        </section>

      </div>
    </div>
  );
}

export default Register;