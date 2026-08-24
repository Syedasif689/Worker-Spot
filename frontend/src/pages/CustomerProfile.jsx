import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  CalendarDays,
  Ticket,
  CreditCard,
  Edit3,
  Save,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  LogOut,
} from "lucide-react";

import { getToken, logout } from "../utils/auth";

import "./CustomerProfile.css";

function CustomerProfile() {
  const navigate = useNavigate();

  // =====================================================
  // PROFILE STATE
  // =====================================================

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // =====================================================
  // EDIT STATE
  // =====================================================

  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");

  // =====================================================
  // MESSAGE STATE
  // =====================================================

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =====================================================
  // BACK TO CUSTOMER DASHBOARD
  // =====================================================

  const handleBackToDashboard = () => {
    navigate("/customer-dashboard");
  };

  // =====================================================
  // SAFE RESPONSE JSON
  // =====================================================

  const getResponseData = async (response) => {
    try {
      const text = await response.text();

      // Empty response
      if (!text || !text.trim()) {
        return {};
      }

      try {
        return JSON.parse(text);
      } catch (jsonError) {
        console.error(
          "Invalid JSON response:",
          text
        );

        return {};
      }
    } catch (error) {
      console.error(
        "Unable to read server response:",
        error
      );

      return {};
    }
  };

  // =====================================================
  // SESSION EXPIRED
  // =====================================================

  const handleSessionExpired = () => {
    console.warn(
      "Customer session expired. Logging out..."
    );

    // Prevent multiple logout attempts
    if (loggingOut) {
      return;
    }

    // Clear authentication
    logout();

    // Clear profile state
    setProfile(null);

    // Stop editing
    setEditing(false);

    // Show loading state before redirect
    setLoading(false);

    // Redirect to customer login
    navigate("/customer-login", {
      replace: true,
      state: {
        sessionExpired: true,
      },
    });
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    try {
      setLoggingOut(true);

      console.log(
        "Customer logout started."
      );

      // Clear authentication
      logout();

      console.log(
        "Customer authentication cleared."
      );

      // Redirect to login
      navigate("/customer-login", {
        replace: true,
      });
    } catch (err) {
      console.error(
        "Customer logout error:",
        err
      );

      setLoggingOut(false);

      setError(
        "Unable to logout. Please try again."
      );
    }
  };

  // =====================================================
  // LOAD CUSTOMER PROFILE
  // =====================================================

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const token = getToken();

      // ===================================================
      // NO TOKEN
      // ===================================================

      if (!token) {
        handleSessionExpired();
        return;
      }

      // ===================================================
      // API REQUEST
      // ===================================================

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/customers/me`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      // ===================================================
      // SAFE RESPONSE READING
      // ===================================================

      const data =
        await getResponseData(response);

      console.log(
        "Customer profile response:",
        response.status,
        data
      );

      // ===================================================
      // TOKEN EXPIRED / INVALID
      // ===================================================

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        handleSessionExpired();
        return;
      }

      // ===================================================
      // OTHER SERVER ERROR
      // ===================================================

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to load customer profile."
        );
      }

      // ===================================================
      // SUCCESS
      // ===================================================

      setProfile(data);

      setFullName(
        data.fullName || ""
      );

    } catch (err) {
      console.error(
        "Customer profile error:",
        err
      );

      setError(
        err.message ||
          "Unable to load your profile."
      );

    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD PROFILE WHEN PAGE OPENS
  // =====================================================

  useEffect(() => {
    loadProfile();
  }, []);

  // =====================================================
  // SAVE PROFILE
  // =====================================================

  const handleSave = async () => {
    // ===================================================
    // VALIDATE NAME
    // ===================================================

    if (!fullName.trim()) {
      setError(
        "Full name is required."
      );

      return;
    }

    try {
      setSaving(true);

      setError("");
      setMessage("");

      // =================================================
      // GET TOKEN
      // =================================================

      const token = getToken();

      if (!token) {
        handleSessionExpired();
        return;
      }

      // =================================================
      // UPDATE PROFILE
      // =================================================

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/customers/me`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            fullName:
              fullName.trim(),
          }),
        }
      );

      // =================================================
      // SAFE RESPONSE
      // =================================================

      const data =
        await getResponseData(response);

      console.log(
        "Customer profile update response:",
        response.status,
        data
      );

      // =================================================
      // TOKEN EXPIRED / INVALID
      // =================================================

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        handleSessionExpired();
        return;
      }

      // =================================================
      // OTHER ERROR
      // =================================================

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to update profile."
        );
      }

      // =================================================
      // UPDATE PROFILE STATE
      // =================================================

      setProfile(data);

      setFullName(
        data.fullName || ""
      );

      setEditing(false);

      setMessage(
        "Profile updated successfully."
      );

      // =================================================
      // CLEAR SUCCESS MESSAGE
      // =================================================

      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (err) {
      console.error(
        "Update customer profile error:",
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
  // CANCEL EDIT
  // =====================================================

  const handleCancel = () => {
    setFullName(
      profile?.fullName || ""
    );

    setEditing(false);

    setError("");
    setMessage("");
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="customer-profile-loading">

        <Loader2
          className="profile-spinner"
          size={32}
        />

        <p>
          Loading your profile...
        </p>

      </div>
    );
  }

  // =====================================================
  // PROFILE FAILED TO LOAD
  // =====================================================

  if (!profile) {
    return (
      <div className="customer-profile-error">

        <AlertCircle size={32} />

        <h3>
          Unable to load profile
        </h3>

        <p>
          {error ||
            "Something went wrong."}
        </p>

        <div className="profile-error-actions">

          {/* =================================================
              TRY AGAIN
          ================================================= */}

          <button
            type="button"
            onClick={loadProfile}
            className="profile-retry-btn"
            disabled={loggingOut}
          >
            <RefreshIcon />

            Try Again
          </button>

          {/* =================================================
              BACK TO DASHBOARD
          ================================================= */}

          <button
            type="button"
            onClick={
              handleBackToDashboard
            }
            className="profile-back-btn"
            disabled={loggingOut}
          >
            <ArrowLeft size={18} />

            Back to Dashboard
          </button>

          {/* =================================================
              LOGOUT / LOGIN AGAIN
          ================================================= */}

          <button
            type="button"
            onClick={handleLogout}
            className="profile-logout-btn"
            disabled={loggingOut}
          >
            {loggingOut ? (
              <>
                <Loader2
                  size={18}
                  className="profile-spinner"
                />

                Logging out...
              </>
            ) : (
              <>
                <LogOut size={18} />

                Logout & Login Again
              </>
            )}
          </button>

        </div>

      </div>
    );
  }

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const memberSince =
    profile.createdAt
      ? new Date(
          profile.createdAt
        ).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }
        )
      : "—";

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="customer-profile-page">

      {/* =================================================
          TOP NAVIGATION
      ================================================= */}

      <div className="customer-profile-top-navigation">

        {/* BACK TO DASHBOARD */}

        <button
          type="button"
          className="profile-back-dashboard-btn"
          onClick={
            handleBackToDashboard
          }
          disabled={loggingOut}
        >
          <ArrowLeft size={19} />

          <span>
            Back to Dashboard
          </span>

        </button>

        {/* LOGOUT */}

        <button
          type="button"
          className="profile-logout-btn"
          onClick={handleLogout}
          disabled={loggingOut}
        >

          {loggingOut ? (
            <>
              <Loader2
                size={18}
                className="profile-spinner"
              />

              Logging out...
            </>
          ) : (
            <>
              <LogOut size={18} />

              Logout
            </>
          )}

        </button>

      </div>

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="customer-profile-header">

        <div>

          <h1>
            My Profile
          </h1>

          <p>
            Manage your Worker Spot account information.
          </p>

        </div>

        {/* =================================================
            EDIT MODE
        ================================================= */}

        {!editing ? (

          <button
            type="button"
            className="profile-edit-btn"
            onClick={() => {
              setEditing(true);
              setError("");
              setMessage("");
            }}
            disabled={loggingOut}
          >
            <Edit3 size={18} />

            Edit Profile
          </button>

        ) : (

          <div className="profile-action-buttons">

            {/* CANCEL */}

            <button
              type="button"
              className="profile-cancel-btn"
              onClick={handleCancel}
              disabled={saving}
            >
              <X size={18} />

              Cancel
            </button>

            {/* SAVE */}

            <button
              type="button"
              className="profile-save-btn"
              onClick={handleSave}
              disabled={saving}
            >

              {saving ? (
                <>
                  <Loader2
                    size={18}
                    className="profile-spinner"
                  />

                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />

                  Save Changes
                </>
              )}

            </button>

          </div>

        )}

      </div>

      {/* =================================================
          SUCCESS MESSAGE
      ================================================= */}

      {message && (
        <div className="profile-success-message">

          <CheckCircle size={18} />

          {message}

        </div>
      )}

      {/* =================================================
          ERROR MESSAGE
      ================================================= */}

      {error && (
        <div className="profile-error-message">

          <AlertCircle size={18} />

          {error}

        </div>
      )}

      {/* =================================================
          PROFILE CARD
      ================================================= */}

      <div className="customer-profile-card">

        {/* =================================================
            PROFILE HERO
        ================================================= */}

        <div className="customer-profile-hero">

          <div className="customer-avatar">

            {profile.fullName
              ? profile.fullName
                  .charAt(0)
                  .toUpperCase()
              : "C"}

          </div>

          <div className="customer-profile-name">

            <h2>
              {profile.fullName}
            </h2>

            <span>

              <ShieldCheck size={15} />

              Customer Account

            </span>

          </div>

        </div>

        {/* =================================================
            PERSONAL INFORMATION
        ================================================= */}

        <div className="profile-section">

          <div className="profile-section-title">

            <User size={20} />

            <div>

              <h3>
                Personal Information
              </h3>

              <p>
                Your basic account information
              </p>

            </div>

          </div>

          <div className="profile-fields">

            {/* =================================================
                FULL NAME
            ================================================= */}

            <div className="profile-field">

              <label>
                Full Name
              </label>

              {editing ? (

                <input
                  type="text"
                  value={fullName}
                  onChange={(e) =>
                    setFullName(
                      e.target.value
                    )
                  }
                  maxLength={100}
                  placeholder="Enter your full name"
                  disabled={saving}
                />

              ) : (

                <div className="profile-value">

                  <User size={18} />

                  {profile.fullName}

                </div>

              )}

            </div>

            {/* =================================================
                EMAIL
            ================================================= */}

            <div className="profile-field">

              <label>
                Email Address
              </label>

              <div className="profile-value readonly">

                <Mail size={18} />

                {profile.email}

                <span className="readonly-label">
                  Account
                </span>

              </div>

            </div>

            {/* =================================================
                MOBILE
            ================================================= */}

            <div className="profile-field">

              <label>
                Mobile Number
              </label>

              <div className="profile-value readonly">

                <Phone size={18} />

                {profile.mobile}

                <span className="readonly-label">
                  Account
                </span>

              </div>

            </div>

            {/* =================================================
                CUSTOMER ID
            ================================================= */}

            <div className="profile-field">

              <label>
                Customer ID
              </label>

              <div className="profile-value readonly">

                <ShieldCheck size={18} />

                #{profile.userId}

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            BOOKING ACCESS
        ================================================= */}

        <div className="profile-section">

          <div className="profile-section-title">

            <Ticket size={20} />

            <div>

              <h3>
                Booking Access
              </h3>

              <p>
                Your Worker Spot booking usage
              </p>

            </div>

          </div>

          <div className="booking-stats">

            {/* =================================================
                USED
            ================================================= */}

            <div className="booking-stat-card">

              <div className="booking-stat-icon">
                <Ticket size={21} />
              </div>

              <div>

                <span>
                  Free Bookings Used
                </span>

                <strong>
                  {profile.freeBookingsUsed}
                </strong>

              </div>

            </div>

            {/* =================================================
                REMAINING
            ================================================= */}

            <div className="booking-stat-card">

              <div className="booking-stat-icon">
                <CheckCircle size={21} />
              </div>

              <div>

                <span>
                  Free Bookings Remaining
                </span>

                <strong>
                  {profile.remainingFreeBookings}
                </strong>

              </div>

            </div>

            {/* =================================================
                CREDITS
            ================================================= */}

            <div className="booking-stat-card">

              <div className="booking-stat-icon">
                <CreditCard size={21} />
              </div>

              <div>

                <span>
                  Booking Credits
                </span>

                <strong>
                  {profile.bookingCredits}
                </strong>

              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            ACCOUNT INFORMATION
        ================================================= */}

        <div className="profile-section">

          <div className="profile-section-title">

            <ShieldCheck size={20} />

            <div>

              <h3>
                Account Information
              </h3>

              <p>
                Worker Spot account details
              </p>

            </div>

          </div>

          <div className="account-info-grid">

            {/* =================================================
                STATUS
            ================================================= */}

            <div className="account-info-item">

              <span>
                Account Status
              </span>

              <strong
                className={
                  profile.active
                    ? "status-active"
                    : "status-inactive"
                }
              >

                {profile.active
                  ? "Active"
                  : "Inactive"}

              </strong>

            </div>

            {/* =================================================
                ACCOUNT TYPE
            ================================================= */}

            <div className="account-info-item">

              <span>
                Account Type
              </span>

              <strong>
                {profile.role}
              </strong>

            </div>

            {/* =================================================
                MEMBER SINCE
            ================================================= */}

            <div className="account-info-item">

              <span>
                Member Since
              </span>

              <strong>

                <CalendarDays size={16} />

                {memberSince}

              </strong>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

// =====================================================
// SMALL REFRESH ICON COMPONENT
// =====================================================

function RefreshIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <polyline points="21 3 21 9 15 9" />
    </svg>
  );
}

export default CustomerProfile;