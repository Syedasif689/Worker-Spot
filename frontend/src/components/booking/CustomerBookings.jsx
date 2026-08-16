import { useState, useEffect } from "react";
import { RefreshCw, MapPin, AlertCircle } from "lucide-react";
import BookingCard from "./BookingCard";
import "./booking.css";  // if booking.css is in the same folder

const CustomerBookings = ({ token }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchBookings = async (showLoading = true) => {
    if (!token) {
      setError("Your session has expired. Please login again.");
      return;
    }

    try {
      if (showLoading) setLoading(true);
      else setRefreshing(true);
      setError("");

      const response = await fetch("http://localhost:8080/api/bookings/customer", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Failed to fetch bookings.");
      }

      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Unable to load bookings.");
      setBookings([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchBookings(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleRefresh = () => {
    fetchBookings(false);
  };

  if (loading) {
    return (
      <div className="customer-bookings-container">
        <div className="customer-bookings-loading">
          <RefreshCw size={28} className="customer-loading-icon" />
          <p>Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="customer-bookings-container">
      <div className="customer-bookings-header">
        <h2>My Bookings</h2>
        <button
          type="button"
          className="customer-bookings-refresh"
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw size={18} className={refreshing ? "spin" : ""} />
          {refreshing ? "Refreshing..." : "Refresh Bookings"}
        </button>
      </div>

      {error && (
        <div className="customer-bookings-error">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {!error && bookings.length === 0 && (
        <div className="customer-bookings-empty">
          <MapPin size={32} />
          <h3>No bookings yet</h3>
          <p>Your booking history will appear here.</p>
        </div>
      )}

      {bookings.length > 0 && (
        <div className="customer-bookings-list">
          {bookings.map((booking) => (
            <BookingCard key={booking.bookingId} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerBookings;   // <-- THIS MUST BE HERE