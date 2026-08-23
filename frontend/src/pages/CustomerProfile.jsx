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

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // =====================================================
  // BACK TO CUSTOMER DASHBOARD
  // =====================================================

  const handleBackToDashboard = () => {
    navigate("/customer-dashboard");
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    try {
      setLoggingOut(true);

      console.log("Customer logout started.");

      // Clear authentication from both
      // localStorage and sessionStorage
      logout();

      console.log("Customer authentication cleared.");

      // Replace current history entry so the user
      // cannot simply return to the profile page
      navigate("/customer-login", {
        replace: true,
      });
    } catch (err) {
      console.error("Customer logout error:", err);

      setLoggingOut(false);
      setError("Unable to logout. Please try again.");
    }
  };

  // =====================================================
  // LOAD CUSTOMER PROFILE
  // =====================================================

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      if (!token) {
        setError("You are not logged in.");

        setTimeout(() => {
          navigate("/customer-login", {
            replace: true,
          });
        }, 800);

        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/customers/me`,
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      // ===================================================
      // AUTH FAILURE
      // ===================================================

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        logout();

        setError(
          "Your session has expired. Please login again."
        );

        setTimeout(() => {
          navigate("/customer-login", {
            replace: true,
          });
        }, 800);

        return;
      }

      // ===================================================
      // OTHER ERROR
      // ===================================================

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to load customer profile."
        );
      }

      setProfile(data);
      setFullName(data.fullName || "");
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
  // SAVE PROFILE
  // =====================================================

  const handleSave = async () => {
    if (!fullName.trim()) {
      setError("Full name is required.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const token = getToken();

      if (!token) {
        setError("You are not logged in.");

        navigate("/customer-login", {
          replace: true,
        });

        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/customers/me`,
        {
          method: "PUT",

          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            fullName: fullName.trim(),
          }),
        }
      );

      const data = await response.json();

      // ===================================================
      // AUTH FAILURE
      // ===================================================

      if (
        response.status === 401 ||
        response.status === 403
      ) {
        logout();

        navigate("/customer-login", {
          replace: true,
        });

        return;
      }

      // ===================================================
      // OTHER ERROR
      // ===================================================

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update profile."
        );
      }

      // ===================================================
      // UPDATE PROFILE
      // ===================================================

      setProfile(data);
      setFullName(data.fullName || "");

      setEditing(false);
      setMessage(
        "Profile updated successfully."
      );

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
  // ERROR
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

          <button
            type="button"
            onClick={loadProfile}
            className="profile-retry-btn"
          >
            Try Again
          </button>

          <button
            type="button"
            onClick={
              handleBackToDashboard
            }
            className="profile-back-btn"
          >
            <ArrowLeft size={18} />

            Back to Dashboard
          </button>

        </div>
      </div>
    );
  }

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const memberSince = profile.createdAt
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

            <button
              type="button"
              className="profile-cancel-btn"
              onClick={handleCancel}
              disabled={saving}
            >
              <X size={18} />

              Cancel
            </button>

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
          MESSAGES
      ================================================= */}

      {message && (
        <div className="profile-success-message">

          <CheckCircle size={18} />

          {message}

        </div>
      )}

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


            {/* FULL NAME */}

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
                />

              ) : (

                <div className="profile-value">

                  <User size={18} />

                  {profile.fullName}

                </div>

              )}

            </div>


            {/* EMAIL */}

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


            {/* MOBILE */}

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


            {/* CUSTOMER ID */}

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


            {/* USED */}

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


            {/* REMAINING */}

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


            {/* CREDITS */}

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


            {/* STATUS */}

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


            {/* ACCOUNT TYPE */}

            <div className="account-info-item">

              <span>
                Account Type
              </span>

              <strong>
                {profile.role}
              </strong>

            </div>


            {/* MEMBER SINCE */}

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

export default CustomerProfile;