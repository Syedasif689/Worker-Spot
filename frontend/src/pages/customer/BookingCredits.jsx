import {
  ArrowLeft,
  CheckCircle,
  IndianRupee,
  CreditCard,
  ShieldCheck,
  Info,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import "./BookingCredits.css";

function BookingCredits() {
  const navigate = useNavigate();

  const packages = [
    {
      name: "Starter",
      price: 20,
      bookings: 1,
      description: "Perfect for a single service request.",
    },
    {
      name: "Plus",
      price: 40,
      bookings: 3,
      description: "Good for occasional service needs.",
    },
    {
      name: "Pro",
      price: 80,
      bookings: 5,
      description: "Best for regular service requirements.",
      popular: true,
    },
    {
      name: "Premium",
      price: 100,
      bookings: 8,
      description: "More bookings at the best value.",
    },
  ];

  return (
    <div className="booking-credits-page">

      {/* TOPBAR */}
      <header className="booking-credits-topbar">
        <button
          type="button"
          className="booking-credits-back"
          onClick={() => navigate("/customer-dashboard")}
        >
          <ArrowLeft size={19} />
          <span>Back to Dashboard</span>
        </button>

        <div className="booking-credits-title">
          <div className="booking-credits-title-icon">
            <IndianRupee size={21} />
          </div>

          <div>
            <h1>Booking Credits</h1>
            <p>Get credits to connect with skilled workers.</p>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="booking-credits-content">

        {/* INTRO */}
        <section className="booking-credits-intro">
          <span className="booking-credits-badge">
            <CreditCard size={15} />
            Worker Spot Credits
          </span>

          <h2>Choose your booking credits</h2>

          <p>
            Purchase credits to send booking requests to workers.
            Worker charges are separate and are paid directly to the worker.
          </p>
        </section>

        {/* PACKAGES */}
        <section className="booking-credits-packages">
          {packages.map((pkg) => (
            <article
              key={pkg.name}
              className={`booking-credit-card ${
                pkg.popular ? "popular" : ""
              }`}
            >
              {pkg.popular && (
                <div className="booking-credit-popular">
                  Most Popular
                </div>
              )}

              <div className="booking-credit-card-header">
                <h3>{pkg.name}</h3>

                <div className="booking-credit-price">
                  <IndianRupee size={21} />
                  <strong>{pkg.price}</strong>
                </div>
              </div>

              <div className="booking-credit-count">
                {pkg.bookings}{" "}
                {pkg.bookings === 1 ? "Booking Credit" : "Booking Credits"}
              </div>

              <p className="booking-credit-description">
                {pkg.description}
              </p>

              <div className="booking-credit-features">
                <div>
                  <CheckCircle size={17} />
                  <span>
                    {pkg.bookings} booking{" "}
                    {pkg.bookings === 1 ? "request" : "requests"}
                  </span>
                </div>

                <div>
                  <CheckCircle size={17} />
                  <span>Connect with available workers</span>
                </div>

                <div>
                  <CheckCircle size={17} />
                  <span>No worker registration fee</span>
                </div>
              </div>

              <button
                type="button"
                className="booking-credit-buy-button"
                onClick={() =>
                  alert(`${pkg.name} package selected`)
                }
              >
                <CreditCard size={18} />
                Buy Credits
              </button>
            </article>
          ))}
        </section>

        {/* INFORMATION */}
        <section className="booking-credits-info">

          <div className="booking-credits-info-icon">
            <Info size={20} />
          </div>

          <div>
            <h3>How Booking Credits Work</h3>

            <p>
              Each successful booking request uses one booking credit.
              Credits are used only for the Worker Spot connection service.
            </p>

            <p>
              The worker's service charges are separate from booking credits.
              Worker Spot does not take the worker's service payment.
            </p>
          </div>
        </section>

        {/* SECURITY */}
        <section className="booking-credits-security">
          <ShieldCheck size={20} />

          <span>
            Your payment information is handled securely.
          </span>
        </section>

      </main>
    </div>
  );
}

export default BookingCredits;