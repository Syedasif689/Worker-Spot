import { useEffect, useState } from "react";
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
} from "lucide-react";

import "./CustomerProfile.css";

function CustomerProfile() {
  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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

      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in.");
        return;
      }

      const response = await fetch(
        "http://localhost:8080/api/customers/me",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load customer profile."
        );
      }

      setProfile(data);
      setFullName(data.fullName || "");

    } catch (err) {
      console.error("Customer profile error:", err);

      setError(
        err.message || "Unable to load your profile."
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

      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in.");
        return;
      }

      const response = await fetch(
        "http://localhost:8080/api/customers/me",
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

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update profile."
        );
      }

      setProfile(data);
      setFullName(data.fullName || "");

      setEditing(false);
      setMessage("Profile updated successfully.");

      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (err) {
      console.error("Update customer profile error:", err);

      setError(
        err.message || "Unable to update your profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // CANCEL EDIT
  // =====================================================

  const handleCancel = () => {
    setFullName(profile?.fullName || "");
    setEditing(false);
    setError("");
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="customer-profile-loading">
        <Loader2 className="profile-spinner" size={32} />

        <p>Loading your profile...</p>
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

        <h3>Unable to load profile</h3>

        <p>{error || "Something went wrong."}</p>

        <button onClick={loadProfile}>
          Try Again
        </button>
      </div>
    );
  }

  // =====================================================
  // DATE FORMAT
  // =====================================================

  const memberSince = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString(
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
          HEADER
      ================================================= */}

      <div className="customer-profile-header">

        <div>
          <h1>My Profile</h1>

          <p>
            Manage your Worker Spot account information.
          </p>
        </div>

        {!editing ? (
          <button
            className="profile-edit-btn"
            onClick={() => {
              setEditing(true);
              setError("");
              setMessage("");
            }}
          >
            <Edit3 size={18} />

            Edit Profile
          </button>
        ) : (
          <div className="profile-action-buttons">

            <button
              className="profile-cancel-btn"
              onClick={handleCancel}
              disabled={saving}
            >
              <X size={18} />

              Cancel
            </button>

            <button
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

        {/* PROFILE HERO */}

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
            ACCOUNT INFORMATION
        ================================================= */}

        <div className="profile-section">

          <div className="profile-section-title">
            <User size={20} />

            <div>
              <h3>Personal Information</h3>

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
                    setFullName(e.target.value)
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
              <h3>Booking Access</h3>

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
              <h3>Account Information</h3>

              <p>
                Worker Spot account details
              </p>
            </div>

          </div>


          <div className="account-info-grid">

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


            <div className="account-info-item">

              <span>
                Account Type
              </span>

              <strong>
                {profile.role}
              </strong>

            </div>


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