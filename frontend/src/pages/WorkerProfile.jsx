import { useEffect, useState } from "react";
import {
  UserRound,
  Phone,
  Mail,
  Wrench,
  BriefcaseBusiness,
  Calendar,
  MapPin,
  IndianRupee,
  Clock3,
  FileText,
  Save,
  ArrowLeft,
  LocateFixed,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./WorkerProfile.css";

function WorkerProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    mobile: "",
    email: "",
    age: "",
    skill: "",
    experience: "",
    state: "",
    district: "",
    city: "",
    area: "",
    charges: "",
    availability: "Available",
    about: "",
  });

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [locationStatus, setLocationStatus] = useState("");
  const [gettingLocation, setGettingLocation] = useState(false);

  // =====================================================
  // LOAD CURRENT WORKER PROFILE
  // =====================================================

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoadingProfile(true);
        setError("");

        const token = localStorage.getItem("token");

        if (!token) {
          setError("Your session has expired. Please login again.");
          return;
        }

        const response = await fetch(
          "http://localhost:8080/api/workers/me",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const contentType = response.headers.get("content-type");

        let result = null;

        if (contentType?.includes("application/json")) {
          const text = await response.text();

          if (text) {
            try {
              result = JSON.parse(text);
            } catch {
              result = null;
            }
          }
        }

        if (!response.ok) {
          throw new Error(
            result?.message || "Unable to load worker profile."
          );
        }

        // Backend fields → Frontend fields
        setProfile({
          name: result.fullName || "",
          mobile: result.mobile || "",
          email: result.email || "",

          age:
            result.age !== null && result.age !== undefined
              ? result.age
              : "",

          skill: result.category || "",

          experience:
            result.experienceYears !== null &&
            result.experienceYears !== undefined
              ? result.experienceYears
              : "",

          state: result.state || "",
          district: result.district || "",
          city: result.city || "",
          area: result.area || "",

          charges:
            result.charges !== null &&
            result.charges !== undefined
              ? result.charges
              : "",

          availability:
            result.availability === "BUSY"
              ? "Busy"
              : "Available",

          about: result.about || "",
        });
      } catch (err) {
        console.error("Load worker profile error:", err);

        setError(
          err.message || "Unable to load your profile."
        );
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, []);

  // =====================================================
  // HANDLE INPUT CHANGES
  // =====================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
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

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`
          );

          if (!response.ok) {
            throw new Error(
              "Unable to find address."
            );
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

          setProfile((prev) => ({
            ...prev,
            state,
            district,
            city,
            area,
          }));

          setLocationStatus(
            "Location detected successfully."
          );
        } catch (error) {
          console.error(
            "Reverse geocoding error:",
            error
          );

          setLocationStatus(
            "Location detected, but address details could not be loaded."
          );
        } finally {
          setGettingLocation(false);
        }
      },

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

      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 0,
      }
    );
  };

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // -------------------------
    // Basic validation
    // -------------------------

    if (!profile.name.trim()) {
      setError("Name is required.");
      return;
    }

    if (Number(profile.age) < 19) {
      setError("Workers must be 19 years or older.");
      return;
    }

    if (Number(profile.age) > 100) {
      setError("Please provide a valid age.");
      return;
    }

    if (Number(profile.experience) < 0) {
      setError("Experience cannot be negative.");
      return;
    }

    if (Number(profile.charges) < 0) {
      setError("Charges cannot be negative.");
      return;
    }

    if (!profile.state.trim()) {
      setError("State is required.");
      return;
    }

    if (!profile.district.trim()) {
      setError("District is required.");
      return;
    }

    if (!profile.city.trim()) {
      setError("City / Town is required.");
      return;
    }

    try {
      setSaving(true);

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Your session has expired. Please login again."
        );
      }

      // Backend DTO field names
      const workerData = {
        fullName: profile.name.trim(),

        age: Number(profile.age),

        category: profile.skill.trim(),

        experienceYears: Number(
          profile.experience
        ),

        state: profile.state.trim(),

        district: profile.district.trim(),

        city: profile.city.trim(),

        area: profile.area.trim(),

        charges: Number(profile.charges),

        availability:
          profile.availability.toUpperCase(),

        about: profile.about.trim(),
      };

      const response = await fetch(
        "http://localhost:8080/api/workers/me",
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify(workerData),
        }
      );

      const contentType =
        response.headers.get("content-type");

      let result = null;

      if (contentType?.includes("application/json")) {
        const text = await response.text();

        if (text) {
          try {
            result = JSON.parse(text);
          } catch {
            result = null;
          }
        }
      }

      if (!response.ok) {
        throw new Error(
          result?.message ||
            "Failed to update worker profile."
        );
      }

      setSuccess(
        result?.message ||
          "Worker profile updated successfully!"
      );

      // Refresh profile data from backend
      // after successful update.
      setTimeout(() => {
        navigate("/worker-dashboard");
      }, 1200);
    } catch (err) {
      console.error(
        "Update worker profile error:",
        err
      );

      setError(
        err.message ||
          "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (loadingProfile) {
    return (
      <div className="worker-profile-page">
        <div className="worker-profile-loading">
          <Clock3 size={24} />
          <p>Loading your profile...</p>
        </div>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="worker-profile-page">

      {/* Header */}
      <div className="worker-profile-page-header">

        <button
          type="button"
          className="worker-profile-back"
          onClick={() =>
            navigate("/worker-dashboard")
          }
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div>
          <h1>Edit Profile</h1>

          <p>
            Keep your worker information updated to
            help customers find you.
          </p>
        </div>

      </div>

      {/* Form */}
      <form
        className="worker-profile-form"
        onSubmit={handleSubmit}
      >

        {/* =================================================
            PERSONAL INFORMATION
        ================================================= */}

        <section className="worker-profile-section">

          <div className="worker-profile-section-header">

            <div className="worker-profile-section-icon">
              <UserRound size={20} />
            </div>

            <div>
              <h2>Personal Information</h2>
              <p>Your basic profile information</p>
            </div>

          </div>

          <div className="worker-profile-fields">

            {/* Name */}
            <div className="worker-profile-field">

              <label htmlFor="name">
                Full Name
              </label>

              <div className="worker-profile-input-wrapper">

                <UserRound size={17} />

                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  value={profile.name}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* Mobile */}
            <div className="worker-profile-field">

              <label htmlFor="mobile">
                Mobile Number
              </label>

              <div className="worker-profile-input-wrapper">

                <Phone size={17} />

                <input
                  id="mobile"
                  type="tel"
                  value={profile.mobile}
                  readOnly
                />

              </div>

              <small>
                Mobile number cannot be changed here.
              </small>

            </div>

            {/* Email */}
            <div className="worker-profile-field">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="worker-profile-input-wrapper">

                <Mail size={17} />

                <input
                  id="email"
                  type="email"
                  value={profile.email}
                  readOnly
                />

              </div>

              <small>
                Email address cannot be changed here.
              </small>

            </div>

            {/* Age */}
            <div className="worker-profile-field">

              <label htmlFor="age">
                Age
              </label>

              <div className="worker-profile-input-wrapper">

                <Calendar size={17} />

                <input
                  id="age"
                  name="age"
                  type="number"
                  min="19"
                  max="100"
                  placeholder="Enter your age"
                  value={profile.age}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            PROFESSIONAL INFORMATION
        ================================================= */}

        <section className="worker-profile-section">

          <div className="worker-profile-section-header">

            <div className="worker-profile-section-icon">
              <Wrench size={20} />
            </div>

            <div>
              <h2>Professional Information</h2>
              <p>
                Tell customers about your service
              </p>
            </div>

          </div>

          <div className="worker-profile-fields">

            {/* Skill */}
            <div className="worker-profile-field">

              <label htmlFor="skill">
                Skill / Category
              </label>

              <div className="worker-profile-input-wrapper">

                <Wrench size={17} />

                <input
                  id="skill"
                  name="skill"
                  type="text"
                  placeholder="Example: Plumber"
                  value={profile.skill}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* Experience */}
            <div className="worker-profile-field">

              <label htmlFor="experience">
                Experience
              </label>

              <div className="worker-profile-input-wrapper">

                <BriefcaseBusiness size={17} />

                <input
                  id="experience"
                  name="experience"
                  type="number"
                  min="0"
                  placeholder="Years of experience"
                  value={profile.experience}
                  onChange={handleChange}
                  required
                />

                <span className="worker-profile-input-suffix">
                  Years
                </span>

              </div>

            </div>

            {/* Charges */}
            <div className="worker-profile-field">

              <label htmlFor="charges">
                Charges per hour
              </label>

              <div className="worker-profile-input-wrapper">

                <IndianRupee size={17} />

                <input
                  id="charges"
                  name="charges"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter your charges"
                  value={profile.charges}
                  onChange={handleChange}
                  required
                />

                <span className="worker-profile-input-suffix">
                  / hour
                </span>

              </div>

            </div>

            {/* Availability */}
            <div className="worker-profile-field">

              <label htmlFor="availability">
                Availability
              </label>

              <div className="worker-profile-input-wrapper">

                <Clock3 size={17} />

                <select
                  id="availability"
                  name="availability"
                  value={profile.availability}
                  onChange={handleChange}
                >
                  <option value="Available">
                    Available
                  </option>

                  <option value="Busy">
                    Busy
                  </option>
                </select>

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            LOCATION
        ================================================= */}

        <section className="worker-profile-section">

          <div className="worker-profile-section-header">

            <div className="worker-profile-section-icon">
              <MapPin size={20} />
            </div>

            <div>
              <h2>Location</h2>

              <p>
                Where customers can find your service
              </p>
            </div>

          </div>

          {/* Current Location */}
          <div className="worker-profile-location-action">

            <button
              type="button"
              className="worker-profile-location-button"
              onClick={handleUseCurrentLocation}
              disabled={gettingLocation}
            >

              <LocateFixed size={17} />

              {gettingLocation
                ? "Detecting Location..."
                : "Use Current Location"}

            </button>

            {locationStatus && (
              <p className="worker-profile-location-status">
                {locationStatus}
              </p>
            )}

          </div>

          <div className="worker-profile-fields">

            {/* State */}
            <div className="worker-profile-field">

              <label htmlFor="state">
                State
              </label>

              <div className="worker-profile-input-wrapper">

                <MapPin size={17} />

                <input
                  id="state"
                  name="state"
                  type="text"
                  placeholder="Enter state"
                  value={profile.state}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* District */}
            <div className="worker-profile-field">

              <label htmlFor="district">
                District
              </label>

              <div className="worker-profile-input-wrapper">

                <MapPin size={17} />

                <input
                  id="district"
                  name="district"
                  type="text"
                  placeholder="Enter district"
                  value={profile.district}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* City */}
            <div className="worker-profile-field">

              <label htmlFor="city">
                City / Town
              </label>

              <div className="worker-profile-input-wrapper">

                <MapPin size={17} />

                <input
                  id="city"
                  name="city"
                  type="text"
                  placeholder="Enter city or town"
                  value={profile.city}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* Area */}
            <div className="worker-profile-field">

              <label htmlFor="area">
                Area / Village
              </label>

              <div className="worker-profile-input-wrapper">

                <MapPin size={17} />

                <input
                  id="area"
                  name="area"
                  type="text"
                  placeholder="Enter area or village"
                  value={profile.area}
                  onChange={handleChange}
                />

              </div>

            </div>

          </div>

        </section>

        {/* =================================================
            ABOUT
        ================================================= */}

        <section className="worker-profile-section">

          <div className="worker-profile-section-header">

            <div className="worker-profile-section-icon">
              <FileText size={20} />
            </div>

            <div>
              <h2>About Your Service</h2>

              <p>
                Tell customers what you can help them with
              </p>
            </div>

          </div>

          <div className="worker-profile-field">

            <label htmlFor="about">
              About
            </label>

            <textarea
              id="about"
              name="about"
              rows="5"
              maxLength="2000"
              placeholder="Describe your skills, services and experience..."
              value={profile.about}
              onChange={handleChange}
            />

            <div className="worker-profile-character-count">
              {profile.about.length}/2000
            </div>

          </div>

        </section>

        {/* =================================================
            ERROR / SUCCESS
        ================================================= */}

        {error && (
          <div className="worker-profile-error">
            {error}
          </div>
        )}

        {success && (
          <div className="worker-profile-success">
            {success}
          </div>
        )}

        {/* =================================================
            ACTIONS
        ================================================= */}

        <div className="worker-profile-actions">

          <button
            type="button"
            className="worker-profile-cancel"
            onClick={() =>
              navigate("/worker-dashboard")
            }
            disabled={saving}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="worker-profile-save"
            disabled={saving}
          >

            <Save size={18} />

            {saving
              ? "Saving Changes..."
              : "Save Changes"}

          </button>

        </div>

      </form>

    </div>
  );
}

export default WorkerProfile;