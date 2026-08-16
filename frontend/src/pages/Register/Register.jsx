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
  Wrench,
  IndianRupee,
  FileText,
  LocateFixed,
} from "lucide-react";

import "./Register.css";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // =====================================================
  // LOCATION STATE
  // =====================================================

  const [locationStatus, setLocationStatus] = useState("");
  const [gettingLocation, setGettingLocation] = useState(false);

  // =====================================================
  // FORM DATA
  // =====================================================

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",

    category: "",
    age: "",
    experienceYears: "",
    charges: "",
    about: "",

    state: "",
    district: "",
    city: "",
    area: "",

    // GPS coordinates
    latitude: "",
    longitude: "",

    terms: false,
  });

  // =====================================================
  // HANDLE INPUT CHANGES
  // =====================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setSuccess("");
  };

  // =====================================================
  // USE CURRENT LOCATION
  // =====================================================

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus(
        "Location services are not supported by this browser."
      );
      return;
    }

    setGettingLocation(true);
    setLocationStatus("Getting your current location...");
    setError("");
    setSuccess("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        // -------------------------------------------------
        // Save coordinates immediately
        // -------------------------------------------------

        setFormData((prev) => ({
          ...prev,
          latitude: latitude.toString(),
          longitude: longitude.toString(),
        }));

        try {
          // -------------------------------------------------
          // Reverse geocoding
          // -------------------------------------------------

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );

          if (!response.ok) {
            throw new Error("Unable to find address.");
          }

          const data = await response.json();
          const address = data.address || {};

          const state = address.state || "";

          const district =
            address.state_district ||
            address.district ||
            address.county ||
            "";

          const city =
            address.city ||
            address.town ||
            address.village ||
            address.municipality ||
            "";

          const area =
            address.suburb ||
            address.neighbourhood ||
            address.residential ||
            address.hamlet ||
            "";

          // -------------------------------------------------
          // Save address + coordinates
          // -------------------------------------------------

          setFormData((prev) => ({
            ...prev,

            latitude: latitude.toString(),
            longitude: longitude.toString(),

            state,
            district,
            city,
            area,
          }));

          setLocationStatus(
            "Location detected successfully."
          );
        } catch (reverseError) {
          console.error(
            "Reverse geocoding error:",
            reverseError
          );

          // Coordinates are still valid even if
          // address lookup fails.

          setLocationStatus(
            "Location detected. Please enter the address manually."
          );
        } finally {
          setGettingLocation(false);
        }
      },

      // -----------------------------------------------------
      // LOCATION ERROR
      // -----------------------------------------------------

      (error) => {
        setGettingLocation(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationStatus(
              "Location permission was denied. Please allow location access."
            );
            break;

          case error.POSITION_UNAVAILABLE:
            setLocationStatus(
              "Your current location is unavailable."
            );
            break;

          case error.TIMEOUT:
            setLocationStatus(
              "Location request timed out. Please try again."
            );
            break;

          default:
            setLocationStatus(
              "Unable to detect your location."
            );
        }
      },

      // -----------------------------------------------------
      // GPS OPTIONS
      // -----------------------------------------------------

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  // =====================================================
  // WORKER REGISTRATION
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // -----------------------------------------------------
    // FRONTEND VALIDATION
    // -----------------------------------------------------

    if (!formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (Number(formData.age) < 19) {
      setError("Workers must be 19 years or older.");
      return;
    }

    if (Number(formData.age) > 100) {
      setError("Please provide a valid age.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!/^[6-9][0-9]{9}$/.test(formData.mobile)) {
      setError(
        "Please provide a valid 10-digit Indian mobile number."
      );
      return;
    }

    if (Number(formData.experienceYears) < 0) {
      setError("Experience cannot be negative.");
      return;
    }

    if (Number(formData.charges) < 0) {
      setError("Charges cannot be negative.");
      return;
    }

    // -----------------------------------------------------
    // LOCATION VALIDATION
    // -----------------------------------------------------

    if (
      !formData.latitude ||
      !formData.longitude
    ) {
      setError(
        "Please use Current Location before creating your worker account."
      );
      return;
    }

    if (!formData.state.trim()) {
      setError("Please provide your state.");
      return;
    }

    if (!formData.district.trim()) {
      setError("Please provide your district.");
      return;
    }

    if (!formData.city.trim()) {
      setError("Please provide your city or town.");
      return;
    }

    if (!formData.terms) {
      setError(
        "Please agree to the Terms and Conditions."
      );
      return;
    }

    // =====================================================
    // DATA SENT TO BACKEND
    // =====================================================

    const workerData = {
      fullName: formData.fullName.trim(),
      mobile: formData.mobile.trim(),
      email: formData.email.trim(),
      password: formData.password,

      category: formData.category,

      age: Number(formData.age),

      experienceYears:
        Number(formData.experienceYears),

      charges: Number(formData.charges),

      state: formData.state.trim(),
      district: formData.district.trim(),
      city: formData.city.trim(),
      area: formData.area.trim(),

      // IMPORTANT:
      // GPS coordinates sent to Spring Boot
      latitude: Number(formData.latitude),
      longitude: Number(formData.longitude),

      about: formData.about.trim(),
    };

    console.log(
      "Worker registration data:",
      workerData
    );

    // =====================================================
    // API REQUEST
    // =====================================================

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/auth/register/worker",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(workerData),
        }
      );

      // =================================================
      // SAFE RESPONSE HANDLING
      // =================================================

      const contentType =
        response.headers.get("content-type");

      let result = null;

      if (
        contentType &&
        contentType.includes("application/json")
      ) {
        const text = await response.text();

        if (text) {
          try {
            result = JSON.parse(text);
          } catch {
            result = null;
          }
        }
      } else {
        const text = await response.text();

        if (text) {
          result = {
            message: text,
          };
        }
      }

      // =================================================
      // ERROR RESPONSE
      // =================================================

      if (!response.ok) {
        let errorMessage =
          "Worker registration failed.";

        if (result?.message) {
          errorMessage = result.message;
        } else if (result?.error) {
          errorMessage = result.error;
        } else if (response.status === 409) {
          errorMessage =
            "Email or mobile number is already registered.";
        } else if (response.status === 400) {
          errorMessage =
            "Please check your registration details.";
        } else if (response.status === 500) {
          errorMessage =
            "Server error. Please try again later.";
        }

        throw new Error(errorMessage);
      }

      // =================================================
      // SUCCESS
      // =================================================

      setSuccess(
        result?.message ||
          "Worker registered successfully!"
      );

      // =================================================
      // CLEAR FORM
      // =================================================

      setFormData({
        fullName: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: "",

        category: "",
        age: "",
        experienceYears: "",
        charges: "",
        about: "",

        state: "",
        district: "",
        city: "",
        area: "",

        latitude: "",
        longitude: "",

        terms: false,
      });

      setLocationStatus("");
    } catch (err) {
      console.error(
        "Worker registration error:",
        err
      );

      setError(
        err.message ||
          "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UI
  // =====================================================

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

                <p>
                  Opportunities for skilled workers
                </p>

              </div>

            </div>

            {/* Badge */}

            <div className="register-badge">

              <Sparkles size={15} />

              <span>
                Join Worker Spot
              </span>

            </div>

            {/* Main Heading */}

            <div className="register-message">

              <h1>
                Turn your <span>skills</span>{" "}
                into opportunities.
              </h1>

              <p>
                Create your Worker Spot account
                and connect with customers looking
                for skilled workers in your area.
              </p>

            </div>

            {/* Benefits */}

            <div className="register-features">

              <div className="register-feature">

                <div className="feature-icon">
                  <HandCoins size={20} />
                </div>

                <div>

                  <h3>
                    No registration fees
                  </h3>

                  <p>
                    Worker Spot does not charge
                    workers to join.
                  </p>

                </div>

              </div>

              <div className="register-feature">

                <div className="feature-icon">
                  <CheckCircle size={20} />
                </div>

                <div>

                  <h3>
                    Keep your earnings
                  </h3>

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

                  <h3>
                    Work on your terms
                  </h3>

                  <p>
                    Choose when and which services
                    you accept.
                  </p>

                </div>

              </div>

              <div className="register-feature">

                <div className="feature-icon">
                  <Users size={20} />
                </div>

                <div>

                  <h3>
                    Connect with customers
                  </h3>

                  <p>
                    Get opportunities from
                    customers nearby.
                  </p>

                </div>

              </div>

            </div>

            {/* Bottom Message */}

            <div className="register-side-note">

              <ShieldCheck size={18} />

              <span>
                You remain an independent
                service provider.
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

              <h1>
                Create Worker Account
              </h1>

              <p>
                Register as a worker and start
                receiving opportunities.
              </p>

            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form onSubmit={handleSubmit}>

              {/* =================================================
                  PERSONAL INFORMATION
              ================================================= */}

              {/* Full Name */}

              <div className="register-form-group">

                <label>
                  Full Name
                </label>

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

                <label>
                  Mobile Number
                </label>

                <div className="register-input-box">

                  <Phone size={19} />

                  <input
                    type="tel"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    value={formData.mobile}
                    onChange={handleChange}
                    pattern="[6-9][0-9]{9}"
                    maxLength="10"
                    required
                  />

                </div>

              </div>

              {/* Email */}

              <div className="register-form-group">

                <label>
                  Email Address
                </label>

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

                <label>
                  Password
                </label>

                <div className="register-input-box">

                  <Lock size={19} />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength="8"
                    required
                  />

                  <button
                    type="button"
                    className="register-password-button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
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

                <label>
                  Confirm Password
                </label>

                <div className="register-input-box">

                  <Lock size={19} />

                  <input
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
                    className="register-password-button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
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

              {/* =================================================
                  WORKER INFORMATION
              ================================================= */}

              {/* Category */}

              <div className="register-form-group">

                <label>
                  Work Category
                </label>

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

                <label>
                  Age
                </label>

                <div className="register-input-box">

                  <Calendar size={19} />

                  <input
                    type="number"
                    name="age"
                    placeholder="Enter your age"
                    min="19"
                    max="100"
                    value={formData.age}
                    onChange={handleChange}
                    required
                  />

                </div>

                <small>
                  Workers must be 19 years or older.
                </small>

              </div>

              {/* Experience */}

              <div className="register-form-group">

                <label>
                  Experience
                </label>

                <div className="register-input-box">

                  <Wrench size={19} />

                  <input
                    type="number"
                    name="experienceYears"
                    placeholder="Years of experience"
                    min="0"
                    value={
                      formData.experienceYears
                    }
                    onChange={handleChange}
                    required
                  />

                </div>

                <small>
                  Enter your total professional
                  experience in years.
                </small>

              </div>

              {/* Charges */}

              <div className="register-form-group">

                <label>
                  Service Charges
                </label>

                <div className="register-input-box">

                  <IndianRupee size={19} />

                  <input
                    type="number"
                    name="charges"
                    placeholder="Your starting service charge"
                    min="0"
                    step="0.01"
                    value={formData.charges}
                    onChange={handleChange}
                    required
                  />

                </div>

                <small>
                  Set the amount you normally
                  charge for your service.
                </small>

              </div>

              {/* About */}

              <div className="register-form-group">

                <label>
                  About You
                </label>

                <div className="register-input-box register-textarea-box">

                  <FileText size={19} />

                  <textarea
                    name="about"
                    placeholder="Tell customers about your skills and experience"
                    value={formData.about}
                    onChange={handleChange}
                    maxLength="2000"
                    rows="4"
                  />

                </div>

                <small>
                  Maximum 2000 characters.
                </small>

              </div>

              {/* =================================================
                  LOCATION
              ================================================= */}

              <div className="register-form-group">

                <label>
                  Worker Location
                </label>

                {/* Current Location Button */}

                <div className="register-location-action">

                  <button
                    type="button"
                    className="register-location-button"
                    onClick={
                      handleUseCurrentLocation
                    }
                    disabled={gettingLocation}
                  >

                    <LocateFixed size={18} />

                    {gettingLocation
                      ? "Detecting Location..."
                      : "Use Current Location"}

                  </button>

                  {locationStatus && (
                    <p className="register-location-status">
                      {locationStatus}
                    </p>
                  )}

                </div>

              </div>

              {/* State */}

              <div className="register-form-group">

                <label>
                  State
                </label>

                <div className="register-input-box">

                  <MapPin size={19} />

                  <input
                    type="text"
                    name="state"
                    placeholder="Enter your state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* District */}

              <div className="register-form-group">

                <label>
                  District
                </label>

                <div className="register-input-box">

                  <MapPin size={19} />

                  <input
                    type="text"
                    name="district"
                    placeholder="Enter your district"
                    value={formData.district}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* City */}

              <div className="register-form-group">

                <label>
                  City / Town
                </label>

                <div className="register-input-box">

                  <MapPin size={19} />

                  <input
                    type="text"
                    name="city"
                    placeholder="Enter your city or town"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />

                </div>

              </div>

              {/* Area */}

              <div className="register-form-group">

                <label>
                  Area / Village
                </label>

                <div className="register-input-box">

                  <MapPin size={19} />

                  <input
                    type="text"
                    name="area"
                    placeholder="Enter your area or village"
                    value={formData.area}
                    onChange={handleChange}
                  />

                </div>

              </div>

              {/* =================================================
                  GPS INFORMATION
              ================================================= */}

              {formData.latitude &&
                formData.longitude && (
                  <div className="register-location-detected">

                    <CheckCircle size={17} />

                    <div>

                      <strong>
                        GPS location saved
                      </strong>

                      <small>
                        Location coordinates will
                        be used to help nearby
                        customers find you.
                      </small>

                    </div>

                  </div>
                )}

              {/* =================================================
                  WORKER POLICY
              ================================================= */}

              <div className="worker-policy">

                <div className="worker-policy-title">

                  <ShieldCheck size={19} />

                  <h3>
                    Worker Independence & No
                    Worker Fees
                  </h3>

                </div>

                <p>
                  Workers on Worker Spot are
                  independent service providers
                  and are not employees, agents,
                  partners, or representatives of
                  Worker Spot.
                </p>

                <p>

                  <strong>
                    Worker Spot does not charge
                    workers
                  </strong>{" "}
                  any registration fee,
                  subscription fee, booking fee,
                  commission, platform fee, or
                  service fee for using the
                  platform.

                </p>

                <p>
                  Workers independently decide
                  whether to accept service
                  requests and are responsible for
                  providing their services to
                  customers.
                </p>

              </div>

              {/* =================================================
                  TERMS
              ================================================= */}

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

              {/* =================================================
                  ERROR
              ================================================= */}

              {error && (
                <div className="register-error">
                  {error}
                </div>
              )}

              {/* =================================================
                  SUCCESS
              ================================================= */}

              {success && (
                <div className="register-success">

                  <CheckCircle size={18} />

                  <span>
                    {success}
                  </span>

                </div>
              )}

              {/* =================================================
                  SUBMIT
              ================================================= */}

              <button
                type="submit"
                className="register-button"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <Clock size={19} />

                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus size={19} />

                    Create Worker Account

                    <ArrowRight size={18} />
                  </>
                )}

              </button>

            </form>

            {/* =================================================
                LOGIN
            ================================================= */}

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