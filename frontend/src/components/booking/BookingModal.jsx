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
} from "lucide-react";
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
}) => {
  const [localProblem, setLocalProblem] = useState(problemDescription || "");
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

  const handleSubmit = () => {
    if (!localProblem.trim()) {
      setError("Please describe the work or problem you need help with.");
      return;
    }
    onSendBooking(localProblem.trim());
  };

  if (!isOpen || !worker) return null;

  return (
    <div className="booking-modal-overlay" onClick={onClose}>
      <div className="booking-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="booking-modal-header">
          <h2>Book Service</h2>
          <button className="booking-modal-close" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className="booking-modal-body">
          {/* Worker Details */}
          <div className="booking-section">
            <h3>Worker Details</h3>
            <div className="booking-worker-info">
              <div className="booking-worker-avatar">
                <UserRound size={28} />
              </div>
              <div className="booking-worker-details">
                <div className="booking-worker-name">{worker.fullName || "Worker"}</div>
                <div className="booking-worker-meta">
                  <span className="booking-worker-category">
                    <Wrench size={14} /> {worker.category || category}
                  </span>
                  <span className="booking-worker-experience">
                    <BriefcaseBusiness size={14} /> {worker.experienceYears ?? 0} years
                  </span>
                </div>
                <div className="booking-worker-meta">
                  <span className="booking-worker-charges">
                    <IndianRupee size={14} /> ₹{Number(worker.charges ?? 0).toFixed(2)}/hour
                  </span>
                  <span className="booking-worker-distance">
                    <Navigation size={14} />{" "}
                    {worker.distanceKm !== undefined && worker.distanceKm !== null
                      ? worker.distanceKm < 1
                        ? `${Math.round(worker.distanceKm * 1000)} m`
                        : `${worker.distanceKm.toFixed(2)} km`
                      : "N/A"}
                  </span>
                </div>
                <div className="booking-worker-location">
                  <MapPin size={14} />
                  {[worker.area, worker.city, worker.district, worker.state]
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
                    String(worker.availability).toUpperCase() === "AVAILABLE"
                      ? "available"
                      : "busy"
                  }`}
                >
                  <span></span>
                  {String(worker.availability).toUpperCase() === "AVAILABLE"
                    ? "Available"
                    : "Busy"}
                </div>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="booking-section">
            <h3>Service Details</h3>
            <div className="booking-service-location">
              <div className="booking-service-location-label">
                <MapPin size={16} /> Service location
              </div>
              <div className="booking-service-location-value">{location.address || "Not set"}</div>
            </div>
            <div className="booking-service-category">
              <div className="booking-service-category-label">
                <Wrench size={16} /> Category
              </div>
              <div className="booking-service-category-value">
                {worker.category || category}
              </div>
            </div>
            <div className="booking-problem">
              <label htmlFor="problemDescription">Problem description</label>
              <textarea
                id="problemDescription"
                placeholder="Describe the problem or work you need..."
                value={localProblem}
                onChange={handleProblemChange}
                rows={4}
                disabled={isCreating || showSuccess}
              />
              {error && <div className="booking-error">{error}</div>}
            </div>
          </div>

          {/* Booking Summary */}
          <div className="booking-section">
            <h3>Booking Summary</h3>
            {!showSuccess ? (
              <div className="booking-summary-placeholder">
                <p>Platform fee will be calculated automatically.</p>
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
                  <span>₹{Number(bookingResponse.workerCharges ?? 0).toFixed(2)}</span>
                </div>
                <div className="booking-summary-row">
                  <span>Platform fee</span>
                  <span>₹{Number(bookingResponse.platformFee ?? 0).toFixed(2)}</span>
                </div>
                <div className="booking-summary-row total">
                  <span>Total amount</span>
                  <span>₹{Number(bookingResponse.totalAmount ?? 0).toFixed(2)}</span>
                </div>
                {bookingResponse.freeBooking && (
                  <div className="booking-free-badge">
                    <CheckCircle size={16} /> Free booking (first 3 bookings)
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Success Message */}
          {showSuccess && bookingResponse && (
            <div className="booking-success">
              <CheckCircle size={24} className="booking-success-icon" />
              <div>
                <h4>Booking request sent successfully.</h4>
                <p>
                  Booking ID: <strong>{bookingResponse.bookingId}</strong>
                </p>
                <p>
                  Worker: <strong>{bookingResponse.workerName}</strong>
                </p>
                <p>
                  Total amount: <strong>₹{Number(bookingResponse.totalAmount ?? 0).toFixed(2)}</strong>
                </p>
                <p>
                  Status: <span className="booking-status-pending">PENDING</span>
                </p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="booking-modal-actions">
            <button
              type="button"
              className="booking-cancel"
              onClick={onClose}
              disabled={isCreating}
            >
              Cancel
            </button>
            {!showSuccess && (
              <button
                type="button"
                className="booking-submit"
                onClick={handleSubmit}
                disabled={isCreating}
              >
                {isCreating ? "Sending Request..." : "Send Booking Request"}
              </button>
            )}
            {showSuccess && (
              <button type="button" className="booking-close-success" onClick={onClose}>
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