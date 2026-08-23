import { useEffect, useState } from "react";
import { getToken } from "../utils/auth";
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

  // =====================================================
  // API URL
  // =====================================================

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8080";

  // =====================================================
  // PROFILE STATE
  // =====================================================

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

    latitude: null,
    longitude: null,

    charges: "",
    availability: "Available",
    about: "",
  });

  const [loadingProfile, setLoadingProfile] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [locationStatus, setLocationStatus] =
    useState("");

  const [gettingLocation, setGettingLocation] =
    useState(false);

  // =====================================================
  // GET TOKEN
  // =====================================================

  const getToken = () => {
    const localToken =
      localStorage.getItem("token");

    const sessionToken =
      sessionStorage.getItem("token");

    const token =
      localToken || sessionToken;

    console.log(
      "WorkerProfile - Token exists:",
      !!token
    );

    if (token) {
      console.log(
        "WorkerProfile - Token preview:",
        `${token.substring(0, 20)}...`
      );
    }

    return token;
  };

  // =====================================================
  // HANDLE AUTH FAILURE
  // =====================================================

  const handleAuthFailure = () => {
    console.warn(
      "Authentication failed. Removing stored token."
    );

    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    localStorage.removeItem("role");
    sessionStorage.removeItem("role");

    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    setError(
      "Your session has expired. Please login again."
    );

    setTimeout(() => {
      navigate("/worker-login", {
        replace: true,
      });
    }, 1200);
  };

  // =====================================================
  // PARSE RESPONSE
  // =====================================================

  const parseResponse = async (response) => {
    const contentType =
      response.headers.get("content-type");

    if (
      contentType &&
      contentType.includes("application/json")
    ) {
      const text =
        await response.text();

      if (!text) {
        return null;
      }

      try {
        return JSON.parse(text);
      } catch (error) {
        console.warn(
          "Unable to parse JSON response:",
          error
        );

        return null;
      }
    }

    const text =
      await response.text();

    return text || null;
  };

  // =====================================================
  // LOAD CURRENT WORKER PROFILE
  // =====================================================

  useEffect(() => {
    let mounted = true;

    const loadProfile = async () => {
      try {
        if (!mounted) return;

        setLoadingProfile(true);
        setError("");
        setSuccess("");

        // =================================================
        // TOKEN
        // =================================================

        const token = getToken();

        if (!token) {
          setError(
            "Your session has expired. Please login again."
          );

          setLoadingProfile(false);

          setTimeout(() => {
            navigate("/worker-login", {
              replace: true,
            });
          }, 1000);

          return;
        }

        // =================================================
        // DEBUG
        // =================================================

        console.log(
          "======================================"
        );

        console.log(
          "WORKER PROFILE GET REQUEST"
        );

        console.log(
          "API URL:",
          `${API_URL}/api/workers/me`
        );

        console.log(
          "Authorization:",
          "Bearer ********"
        );

        console.log(
          "======================================"
        );

        // =================================================
        // REQUEST
        // =================================================

        const response =
          await fetch(
            `${API_URL}/api/workers/me`,
            {
              method: "GET",

              headers: {
                Authorization:
                  `Bearer ${token}`,

                Accept:
                  "application/json",
              },

              credentials: "include",
            }
          );

        // =================================================
        // DEBUG RESPONSE
        // =================================================

        console.log(
          "Worker profile response status:",
          response.status
        );

        console.log(
          "Worker profile response OK:",
          response.ok
        );

        const result =
          await parseResponse(response);

        console.log(
          "Worker profile response body:",
          result
        );

        // =================================================
        // AUTHENTICATION FAILURE
        // =================================================

        if (
          response.status === 401 ||
          response.status === 403
        ) {
          handleAuthFailure();
          return;
        }

        // =================================================
        // OTHER ERROR
        // =================================================

        if (!response.ok) {
          let message =
            "Unable to load worker profile.";

          if (
            result &&
            typeof result === "object"
          ) {
            message =
              result.message ||
              result.error ||
              message;
          } else if (
            typeof result === "string" &&
            result.trim()
          ) {
            message = result;
          }

          throw new Error(message);
        }

        // =================================================
        // MAKE SURE COMPONENT STILL EXISTS
        // =================================================

        if (!mounted) return;

        // =================================================
        // BACKEND → FRONTEND
        // =================================================

        setProfile({
          name:
            result?.fullName || "",

          mobile:
            result?.mobile || "",

          email:
            result?.email || "",

          age:
            result?.age !== null &&
            result?.age !== undefined
              ? result.age
              : "",

          skill:
            result?.category || "",

          experience:
            result?.experienceYears !== null &&
            result?.experienceYears !== undefined
              ? result.experienceYears
              : "",

          state:
            result?.state || "",

          district:
            result?.district || "",

          city:
            result?.city || "",

          area:
            result?.area || "",

          latitude:
            result?.latitude !== null &&
            result?.latitude !== undefined
              ? Number(result.latitude)
              : null,

          longitude:
            result?.longitude !== null &&
            result?.longitude !== undefined
              ? Number(result.longitude)
              : null,

          charges:
            result?.charges !== null &&
            result?.charges !== undefined
              ? result.charges
              : "",

          availability:
            result?.availability === "BUSY"
              ? "Busy"
              : "Available",

          about:
            result?.about || "",
        });

        // =================================================
        // GPS STATUS
        // =================================================

        if (
          result?.latitude !== null &&
          result?.latitude !== undefined &&
          result?.longitude !== null &&
          result?.longitude !== undefined
        ) {
          setLocationStatus(
            "Saved location is available."
          );
        } else {
          setLocationStatus(
            "No GPS location saved. Please use your current location."
          );
        }

      } catch (err) {
        console.error(
          "Load worker profile error:",
          err
        );

        if (!mounted) return;

        setError(
          err?.message ||
            "Unable to load your profile."
        );
      } finally {
        if (mounted) {
          setLoadingProfile(false);
        }
      }
    };

    loadProfile();

    return () => {
      mounted = false;
    };
  }, [navigate, API_URL]);

  // =====================================================
  // HANDLE INPUT CHANGES
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

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

    setLocationStatus(
      "Getting your current location..."
    );

    setError("");
    setSuccess("");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const {
          latitude,
          longitude,
        } = position.coords;

        console.log(
          "GPS latitude:",
          latitude
        );

        console.log(
          "GPS longitude:",
          longitude
        );

        try {
          // =================================================
          // REVERSE GEOCODING
          // =================================================

          const response =
            await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
              {
                headers: {
                  Accept:
                    "application/json",
                },
              }
            );

          if (!response.ok) {
            throw new Error(
              "Unable to find address."
            );
          }

          const data =
            await response.json();

          const address =
            data?.address || {};

          const state =
            address.state || "";

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

          // =================================================
          // SAVE GPS + ADDRESS
          // =================================================

          setProfile((prev) => ({
            ...prev,

            state,

            district,

            city,

            area,

            latitude,

            longitude,
          }));

          setLocationStatus(
            `Location detected successfully. GPS: ${latitude.toFixed(
              6
            )}, ${longitude.toFixed(6)}`
          );

        } catch (error) {
          console.error(
            "Reverse geocoding error:",
            error
          );

          // =================================================
          // GPS STILL SAVED
          // =================================================

          setProfile((prev) => ({
            ...prev,

            latitude,
            longitude,
          }));

          setLocationStatus(
            `GPS detected, but address details could not be loaded. GPS: ${latitude.toFixed(
              6
            )}, ${longitude.toFixed(6)}`
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

    // ===================================================
    // BASIC VALIDATION
    // ===================================================

    if (!profile.name.trim()) {
      setError("Name is required.");
      return;
    }

    if (
      !profile.age ||
      Number(profile.age) < 19
    ) {
      setError(
        "Workers must be 19 years or older."
      );

      return;
    }

    if (Number(profile.age) > 100) {
      setError(
        "Please provide a valid age."
      );

      return;
    }

    if (
      !profile.skill.trim()
    ) {
      setError(
        "Skill / category is required."
      );

      return;
    }

    if (
      !profile.experience ||
      Number(profile.experience) < 0
    ) {
      setError(
        "Please provide valid experience."
      );

      return;
    }

    if (
      profile.charges === "" ||
      Number(profile.charges) < 0
    ) {
      setError(
        "Please provide valid charges."
      );

      return;
    }

    if (!profile.state.trim()) {
      setError(
        "State is required."
      );

      return;
    }

    if (!profile.district.trim()) {
      setError(
        "District is required."
      );

      return;
    }

    if (!profile.city.trim()) {
      setError(
        "City / Town is required."
      );

      return;
    }

    // ===================================================
    // GPS VALIDATION
    // ===================================================

    if (
      profile.latitude === null ||
      profile.latitude === undefined ||
      profile.longitude === null ||
      profile.longitude === undefined ||
      Number.isNaN(
        Number(profile.latitude)
      ) ||
      Number.isNaN(
        Number(profile.longitude)
      )
    ) {
      setError(
        "Please use your current location before saving your profile."
      );

      return;
    }

    try {
      setSaving(true);

      // =================================================
      // TOKEN
      // =================================================

      const token = getToken();

      if (!token) {
        handleAuthFailure();
        return;
      }

      // =================================================
      // BACKEND DTO
      // =================================================

      const workerData = {
        fullName:
          profile.name.trim(),

        age:
          Number(profile.age),

        category:
          profile.skill.trim(),

        experienceYears:
          Number(profile.experience),

        state:
          profile.state.trim(),

        district:
          profile.district.trim(),

        city:
          profile.city.trim(),

        area:
          profile.area.trim(),

        latitude:
          Number(profile.latitude),

        longitude:
          Number(profile.longitude),

        charges:
          Number(profile.charges),

        availability:
          profile.availability.toUpperCase(),

        about:
          profile.about.trim(),
      };

      // =================================================
      // DEBUG
      // =================================================

      console.log(
        "======================================"
      );

      console.log(
        "WORKER PROFILE UPDATE REQUEST"
      );

      console.log(
        "API URL:",
        `${API_URL}/api/workers/me`
      );

      console.log(
        "Worker profile data:",
        workerData
      );

      console.log(
        "Authorization:",
        "Bearer ********"
      );

      console.log(
        "======================================"
      );

      // =================================================
      // PUT REQUEST
      // =================================================

      const response =
        await fetch(
          `${API_URL}/api/workers/me`,
          {
            method: "PUT",

            headers: {
              Authorization:
                `Bearer ${token}`,

              "Content-Type":
                "application/json",

              Accept:
                "application/json",
            },

            credentials: "include",

            body:
              JSON.stringify(workerData),
          }
        );

      // =================================================
      // RESPONSE
      // =================================================

      console.log(
        "Update profile status:",
        response.status
      );

      const result =
        await parseResponse(response);

      console.log(
        "Update profile response:",
        result
      );

      // =================================================
      // AUTH FAILURE
      // =================================================

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        handleAuthFailure();
        return;
      }

      // =================================================
      // OTHER ERROR
      // =================================================

      if (!response.ok) {
        let message =
          "Failed to update worker profile.";

        if (
          result &&
          typeof result === "object"
        ) {
          message =
            result.message ||
            result.error ||
            message;
        } else if (
          typeof result === "string" &&
          result.trim()
        ) {
          message = result;
        }

        throw new Error(message);
      }

      // =================================================
      // SUCCESS
      // =================================================

      setSuccess(
        result?.message ||
          "Worker profile updated successfully!"
      );

      // =================================================
      // DASHBOARD
      // =================================================

      setTimeout(() => {
        navigate(
          "/worker-dashboard"
        );
      }, 1200);

    } catch (err) {
      console.error(
        "Update worker profile error:",
        err
      );

      setError(
        err?.message ||
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

          <p>
            Loading your profile...
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="worker-profile-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="worker-profile-page-header">

        <button
          type="button"
          className="worker-profile-back"
          onClick={() =>
            navigate(
              "/worker-dashboard"
            )
          }
        >
          <ArrowLeft size={18} />

          Back to Dashboard
        </button>

        <div>

          <h1>
            Edit Profile
          </h1>

          <p>
            Keep your worker information
            updated to help customers
            find you.
          </p>

        </div>

      </div>

      {/* =================================================
          FORM
      ================================================= */}

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

              <h2>
                Personal Information
              </h2>

              <p>
                Your basic profile information
              </p>

            </div>

          </div>

          <div className="worker-profile-fields">

            {/* NAME */}

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

            {/* MOBILE */}

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
                Mobile number cannot be
                changed here.
              </small>

            </div>

            {/* EMAIL */}

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
                Email address cannot be
                changed here.
              </small>

            </div>

            {/* AGE */}

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

              <h2>
                Professional Information
              </h2>

              <p>
                Tell customers about your service
              </p>

            </div>

          </div>

          <div className="worker-profile-fields">

            {/* SKILL */}

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

            {/* EXPERIENCE */}

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

            {/* CHARGES */}

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

            {/* AVAILABILITY */}

            <div className="worker-profile-field">

              <label htmlFor="availability">
                Availability
              </label>

              <div className="worker-profile-input-wrapper">

                <Clock3 size={17} />

                <select
                  id="availability"
                  name="availability"
                  value={
                    profile.availability
                  }
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

              <h2>
                Location
              </h2>

              <p>
                Where customers can find
                your service
              </p>

            </div>

          </div>

          {/* CURRENT LOCATION */}

          <div className="worker-profile-location-action">

            <button
              type="button"
              className="worker-profile-location-button"
              onClick={
                handleUseCurrentLocation
              }
              disabled={
                gettingLocation
              }
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

            {/* STATE */}

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
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

            </div>

            {/* DISTRICT */}

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
                  value={
                    profile.district
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

            </div>

            {/* CITY */}

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
                  value={
                    profile.city
                  }
                  onChange={
                    handleChange
                  }
                  required
                />

              </div>

            </div>

            {/* AREA */}

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
                  value={
                    profile.area
                  }
                  onChange={
                    handleChange
                  }
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

              <h2>
                About Your Service
              </h2>

              <p>
                Tell customers what you
                can help them with
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
              value={
                profile.about
              }
              onChange={
                handleChange
              }
            />

            <div className="worker-profile-character-count">

              {
                profile.about.length
              }
              /2000

            </div>

          </div>

        </section>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div className="worker-profile-error">
            {error}
          </div>
        )}

        {/* =================================================
            SUCCESS
        ================================================= */}

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
              navigate(
                "/worker-dashboard"
              )
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