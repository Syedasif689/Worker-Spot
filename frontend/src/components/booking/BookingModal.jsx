import { useState, useEffect } from "react";
import {
  X,
  UserRound,
  Wrench,
  BriefcaseBusiness,
  IndianRupee,
  Navigation,
  MapPin,
  CheckCircle,
  Lock,
  CreditCard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./booking.css";

const BookingModal = ({
  isOpen,
  onClose,
  worker,
  location,
  category,
  onSendBooking,
  isCreating,
  bookingResponse,
  showSuccess,
  problemDescription,
  setProblemDescription,

  // =====================================================
  // FREE BOOKING STATUS
  // =====================================================
  // Optional for now.
  // Backend should eventually provide this value.
  freeBookingsRemaining,
}) => {
  const navigate = useNavigate();

  const [localProblem, setLocalProblem] = useState(
    problemDescription || ""
  );

  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setLocalProblem(problemDescription || "");
      setError("");
    }
  }, [isOpen, problemDescription]);

  const handleProblemChange = (e) => {
    const value = e.target.value;

    setLocalProblem(value);
    setProblemDescription(value);
    setError("");
  };

  // =====================================================
  // FREE TIER STATUS
  // =====================================================

  const hasFreeBookingLimit =
    freeBookingsRemaining !== undefined &&
    freeBookingsRemaining !== null;

  const freeBookingsCompleted =
    hasFreeBookingLimit &&
    Number(freeBookingsRemaining) <= 0;

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = () => {
    if (freeBookingsCompleted) {
      setError(
        "Your 3 free bookings have been used. Please purchase Booking Credits to continue."
      );
      return;
    }

    if (!localProblem.trim()) {
      setError(
        "Please describe the work or problem you need help with."
      );
      return;
    }

    onSendBooking(localProblem.trim());
  };

  // =====================================================
  // GO TO CREDITS
  // =====================================================

  const handleBuyCredits = () => {
    onClose();
    navigate("/customer/booking-credits");
  };

  if (!isOpen || !worker) return null;

  return (
    <div
      className="booking-modal-overlay"
      onClick={onClose}
    >
      <div
        className="booking-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <div className="booking-modal-header">
          <h2>
            {freeBookingsCompleted
              ? "Booking Credits Required"
              : "Book Service"}
          </h2>

          <button
            className="booking-modal-close"
            onClick={onClose}
            type="button"
          >
            <X size={24} />
          </button>
        </div>

        <div className="booking-modal-body">

          {/* =================================================
              FREE TIER LOCK
          ================================================= */}

          {freeBookingsCompleted && (
            <div className="booking-credit-lock">
              <div className="booking-credit-lock-icon">
                <Lock size={25} />
              </div>

              <div className="booking-credit-lock-content">
                <h3>Free bookings completed</h3>

                <p>
                  You have used all 3 of your free bookings.
                  Purchase Booking Credits to send another
                  booking request.
                </p>

                <button
                  type="button"
                  className="booking-credit-lock-button"
                  onClick={handleBuyCredits}
                >
                  <CreditCard size={18} />
                  Buy Booking Credits
                </button>
              </div>
            </div>
          )}

          {/* =================================================
              WORKER DETAILS
          ================================================= */}

          <div className="booking-section">
            <h3>Worker Details</h3>

            <div className="booking-worker-info">
              <div className="booking-worker-avatar">
                <UserRound size={28} />
              </div>

              <div className="booking-worker-details">

                <div className="booking-worker-name">
                  {worker.fullName || "Worker"}
                </div>

                <div className="booking-worker-meta">

                  <span className="booking-worker-category">
                    <Wrench size={14} />
                    {worker.category || category}
                  </span>

                  <span className="booking-worker-experience">
                    <BriefcaseBusiness size={14} />
                    {worker.experienceYears ?? 0} years
                  </span>

                </div>

                <div className="booking-worker-meta">

                  <span className="booking-worker-charges">
                    <IndianRupee size={14} />
                    ₹{Number(worker.charges ?? 0).toFixed(2)}/hour
                  </span>

                  <span className="booking-worker-distance">
                    <Navigation size={14} />

                    {worker.distanceKm !== undefined &&
                    worker.distanceKm !== null
                      ? worker.distanceKm < 1
                        ? `${Math.round(
                            worker.distanceKm * 1000
                          )} m`
                        : `${worker.distanceKm.toFixed(2)} km`
                      : "N/A"}
                  </span>

                </div>

                <div className="booking-worker-location">
                  <MapPin size={14} />

                  {[
                    worker.area,
                    worker.city,
                    worker.district,
                    worker.state,
                  ]
                    .filter(Boolean)
                    .join(", ") || "Location unavailable"}
                </div>

                {worker.about && (
                  <div className="booking-worker-about">
                    <p>{worker.about}</p>
                  </div>
                )}

                <div
                  className={`booking-worker-availability ${
                    String(worker.availability).toUpperCase() ===
                    "AVAILABLE"
                      ? "available"
                      : "busy"
                  }`}
                >
                  <span></span>

                  {String(worker.availability).toUpperCase() ===
                  "AVAILABLE"
                    ? "Available"
                    : "Busy"}
                </div>

              </div>
            </div>
          </div>

          {/* =================================================
              SERVICE DETAILS
          ================================================= */}

          <div className="booking-section">
            <h3>Service Details</h3>

            <div className="booking-service-location">
              <div className="booking-service-location-label">
                <MapPin size={16} />
                Service location
              </div>

              <div className="booking-service-location-value">
                {location.address || "Not set"}
              </div>
            </div>

            <div className="booking-service-category">
              <div className="booking-service-category-label">
                <Wrench size={16} />
                Category
              </div>

              <div className="booking-service-category-value">
                {worker.category || category}
              </div>
            </div>

            {/* =================================================
                PROBLEM DESCRIPTION
            ================================================= */}

            <div className="booking-problem">
              <label htmlFor="problemDescription">
                Problem description
              </label>

              <textarea
                id="problemDescription"
                placeholder="Describe the problem or work you need..."
                value={localProblem}
                onChange={handleProblemChange}
                rows={4}
                disabled={
                  isCreating ||
                  showSuccess ||
                  freeBookingsCompleted
                }
              />

              {error && (
                <div className="booking-error">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* =================================================
              BOOKING SUMMARY
          ================================================= */}

          <div className="booking-section">
            <h3>Booking Summary</h3>

            {!showSuccess ? (
              <div className="booking-summary-placeholder">

                <p>
                  Platform fee will be calculated automatically.
                </p>

                <div className="booking-summary-dummy">

                  <div className="booking-summary-row">
                    <span>Worker charges</span>
                    <span>—</span>
                  </div>

                  <div className="booking-summary-row">
                    <span>Platform fee</span>
                    <span>—</span>
                  </div>

                  <div className="booking-summary-row total">
                    <span>Total amount</span>
                    <span>—</span>
                  </div>

                </div>

              </div>
            ) : (
              <div className="booking-summary-result">

                <div className="booking-summary-row">
                  <span>Worker charges</span>
                  <span>
                    ₹
                    {Number(
                      bookingResponse.workerCharges ?? 0
                    ).toFixed(2)}
                  </span>
                </div>

                <div className="booking-summary-row">
                  <span>Platform fee</span>
                  <span>
                    ₹
                    {Number(
                      bookingResponse.platformFee ?? 0
                    ).toFixed(2)}
                  </span>
                </div>

                <div className="booking-summary-row total">
                  <span>Total amount</span>
                  <span>
                    ₹
                    {Number(
                      bookingResponse.totalAmount ?? 0
                    ).toFixed(2)}
                  </span>
                </div>

                {bookingResponse.freeBooking && (
                  <div className="booking-free-badge">
                    <CheckCircle size={16} />
                    Free booking
                  </div>
                )}

              </div>
            )}
          </div>

          {/* =================================================
              SUCCESS
          ================================================= */}

          {showSuccess && bookingResponse && (
            <div className="booking-success">

              <CheckCircle
                size={24}
                className="booking-success-icon"
              />

              <div>

                <h4>
                  Booking request sent successfully.
                </h4>

                <p>
                  Booking ID:{" "}
                  <strong>
                    {bookingResponse.bookingId}
                  </strong>
                </p>

                <p>
                  Worker:{" "}
                  <strong>
                    {bookingResponse.workerName}
                  </strong>
                </p>

                <p>
                  Total amount:{" "}
                  <strong>
                    ₹
                    {Number(
                      bookingResponse.totalAmount ?? 0
                    ).toFixed(2)}
                  </strong>
                </p>

                <p>
                  Status:{" "}
                  <span className="booking-status-pending">
                    PENDING
                  </span>
                </p>

              </div>
            </div>
          )}

          {/* =================================================
              ACTIONS
          ================================================= */}

          <div className="booking-modal-actions">

            <button
              type="button"
              className="booking-cancel"
              onClick={onClose}
              disabled={isCreating}
            >
              Cancel
            </button>

            {!showSuccess && !freeBookingsCompleted && (
              <button
                type="button"
                className="booking-submit"
                onClick={handleSubmit}
                disabled={isCreating}
              >
                {isCreating
                  ? "Sending Request..."
                  : "Send Booking Request"}
              </button>
            )}

            {showSuccess && (
              <button
                type="button"
                className="booking-close-success"
                onClick={onClose}
              >
                Close
              </button>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default BookingModal;