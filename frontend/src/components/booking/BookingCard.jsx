import { UserRound, Wrench, IndianRupee, MapPin, Calendar } from "lucide-react";
import "./booking.css";

const BookingCard = ({ booking }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusClass = (status) => {
    const s = String(status).toUpperCase();
    if (s === "PENDING") return "status-pending";
    if (s === "ACCEPTED") return "status-accepted";
    if (s === "REJECTED") return "status-rejected";
    return "";
  };

  return (
    <div className="booking-card">
      <div className="booking-card-header">
        <div className="booking-card-worker">
          <div className="booking-card-avatar">
            <UserRound size={20} />
          </div>
          <div>
            <div className="booking-card-worker-name">
              {booking.workerName || "Worker"}
            </div>
            <div className="booking-card-worker-category">
              <Wrench size={14} /> {booking.workerCategory || booking.category || "N/A"}
            </div>
          </div>
        </div>
        <div className={`booking-card-status ${getStatusClass(booking.status)}`}>
          {booking.status || "PENDING"}
        </div>
      </div>

      <div className="booking-card-body">
        <div className="booking-card-detail">
          <span className="booking-card-label">Booking ID</span>
          <span>#{booking.bookingId}</span>
        </div>
        <div className="booking-card-detail">
          <span className="booking-card-label">Problem</span>
          <span>{booking.problemDescription || "N/A"}</span>
        </div>
        <div className="booking-card-detail">
          <span className="booking-card-label">Service location</span>
          <span>
            <MapPin size={14} />
            {booking.serviceLocation || "N/A"}
          </span>
        </div>
        <div className="booking-card-detail">
          <span className="booking-card-label">Amount</span>
          <span>
            <IndianRupee size={14} />
            ₹{Number(booking.totalAmount ?? 0).toFixed(2)}
            <span className="booking-card-breakdown">
              (₹{Number(booking.workerCharges ?? 0).toFixed(2)} + ₹
              {Number(booking.platformFee ?? 0).toFixed(2)} fee)
            </span>
          </span>
        </div>
        <div className="booking-card-detail">
          <span className="booking-card-label">Created</span>
          <span>
            <Calendar size={14} />
            {formatDate(booking.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;   // ✅ default export