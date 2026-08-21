import {
  ArrowLeft,
  CheckCircle,
  IndianRupee,
  CreditCard,
  ShieldCheck,
  Info,
  LoaderCircle,
} from "lucide-react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BookingCredits.css";

function BookingCredits() {
  const navigate = useNavigate();

  const [loadingPackage, setLoadingPackage] = useState(null);
  const [message, setMessage] = useState("");

  const packages = [
    {
      name: "Starter",
      packageName: "STARTER",
      price: 20,
      bookings: 1,
      description: "Perfect for a single service request.",
    },
    {
      name: "Plus",
      packageName: "PLUS",
      price: 40,
      bookings: 3,
      description: "Good for occasional service needs.",
    },
    {
      name: "Pro",
      packageName: "PRO",
      price: 80,
      bookings: 5,
      description: "Best for regular service requirements.",
      popular: true,
    },
    {
      name: "Premium",
      packageName: "PREMIUM",
      price: 100,
      bookings: 8,
      description: "More bookings at the best value.",
    },
  ];

  // =====================================================
  // LOAD RAZORPAY SCRIPT
  // =====================================================

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  // =====================================================
  // BUY PACKAGE
  // =====================================================

  const handleBuyCredits = async (pkg) => {
    try {
      setMessage("");
      setLoadingPackage(pkg.packageName);

      // ===============================================
      // LOAD RAZORPAY
      // ===============================================

      const razorpayLoaded =
        await loadRazorpayScript();

      if (!razorpayLoaded) {
        throw new Error(
          "Unable to load payment service. Please check your internet connection."
        );
      }

      // ===============================================
      // GET JWT TOKEN
      // ===============================================

      const token =
        localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Please login again to continue."
        );
      }

      // ===============================================
      // CREATE PAYMENT ORDER
      // ===============================================

      const API_URL =
        import.meta.env.VITE_API_URL;

      const orderResponse =
        await fetch(
          `${API_URL}/api/payments/create-order`,
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json",

              Authorization: `Bearer ${token}`,
            },

            body: JSON.stringify({
              packageName: pkg.packageName,
            }),
          }
        );

      const orderData =
        await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(
          orderData.message ||
          "Unable to create payment order."
        );
      }

      /*
       * Backend response:
       *
       * {
       *   orderId,
       *   amount,
       *   keyId
       * }
       */

      const {
        orderId,
        amount,
        keyId,
      } = orderData;

      // ===============================================
      // RAZORPAY OPTIONS
      // ===============================================

      const options = {
        key: keyId,

        amount: Math.round(amount * 100),

        currency: "INR",

        name: "Worker Spot",

        description:
          `${pkg.bookings} Booking Credit${
            pkg.bookings > 1 ? "s" : ""
          }`,

        order_id: orderId,

        theme: {
          color: "#FF8A00",
        },

        handler: async function (response) {
          try {
            /*
             * Razorpay sends:
             *
             * razorpay_payment_id
             * razorpay_order_id
             * razorpay_signature
             */

            const verifyResponse =
              await fetch(
                `${API_URL}/api/payments/verify`,
                {
                  method: "POST",

                  headers: {
                    "Content-Type":
                      "application/json",

                    Authorization:
                      `Bearer ${token}`,
                  },

                  body: JSON.stringify({
                    orderId:
                      response.razorpay_order_id,

                    paymentId:
                      response.razorpay_payment_id,

                    signature:
                      response.razorpay_signature,
                  }),
                }
              );

            const verifyData =
              await verifyResponse.json();

            if (!verifyResponse.ok) {
              throw new Error(
                verifyData.message ||
                "Payment verification failed."
              );
            }

            // ===========================================
            // PAYMENT SUCCESS
            // ===========================================

            setMessage(
              `Payment successful! ${pkg.bookings} booking credit${
                pkg.bookings > 1 ? "s have" : " has"
              } been added to your account.`
            );

            setTimeout(() => {
              navigate("/customer-dashboard");
            }, 2000);

          } catch (error) {

            console.error(
              "Payment verification error:",
              error
            );

            setMessage(
              error.message ||
              "Payment was successful, but verification failed. Please contact support."
            );

          } finally {
            setLoadingPackage(null);
          }
        },

        modal: {
          ondismiss: function () {
            setLoadingPackage(null);
          },
        },
      };

      // ===============================================
      // OPEN RAZORPAY CHECKOUT
      // ===============================================

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();

    } catch (error) {

      console.error(
        "Payment error:",
        error
      );

      setMessage(
        error.message ||
        "Something went wrong while starting the payment."
      );

      setLoadingPackage(null);
    }
  };

  return (
    <div className="booking-credits-page">

      {/* TOPBAR */}

      <header className="booking-credits-topbar">

        <button
          type="button"
          className="booking-credits-back"
          onClick={() =>
            navigate("/customer-dashboard")
          }
          disabled={loadingPackage !== null}
        >
          <ArrowLeft size={19} />

          <span>
            Back to Dashboard
          </span>
        </button>

        <div className="booking-credits-title">

          <div className="booking-credits-title-icon">
            <IndianRupee size={21} />
          </div>

          <div>
            <h1>
              Booking Credits
            </h1>

            <p>
              Get credits to connect with skilled workers.
            </p>
          </div>

        </div>

      </header>


      {/* CONTENT */}

      <main className="booking-credits-content">

        {/* MESSAGE */}

        {message && (
          <div className="booking-payment-message">
            {message}
          </div>
        )}


        {/* INTRO */}

        <section className="booking-credits-intro">

          <span className="booking-credits-badge">

            <CreditCard size={15} />

            Worker Spot Credits

          </span>

          <h2>
            Choose your booking credits
          </h2>

          <p>
            Purchase credits to send booking requests to workers.
            Worker charges are separate and are paid directly
            to the worker.
          </p>

        </section>


        {/* PACKAGES */}

        <section className="booking-credits-packages">

          {packages.map((pkg) => (

            <article
              key={pkg.packageName}
              className={`booking-credit-card ${
                pkg.popular
                  ? "popular"
                  : ""
              }`}
            >

              {pkg.popular && (

                <div className="booking-credit-popular">
                  Most Popular
                </div>

              )}


              {/* CARD HEADER */}

              <div className="booking-credit-card-header">

                <h3>
                  {pkg.name}
                </h3>

                <div className="booking-credit-price">

                  <IndianRupee size={21} />

                  <strong>
                    {pkg.price}
                  </strong>

                </div>

              </div>


              {/* CREDIT COUNT */}

              <div className="booking-credit-count">

                {pkg.bookings}{" "}

                {pkg.bookings === 1
                  ? "Booking Credit"
                  : "Booking Credits"}

              </div>


              {/* DESCRIPTION */}

              <p className="booking-credit-description">

                {pkg.description}

              </p>


              {/* FEATURES */}

              <div className="booking-credit-features">

                <div>

                  <CheckCircle size={17} />

                  <span>

                    {pkg.bookings} booking{" "}

                    {pkg.bookings === 1
                      ? "request"
                      : "requests"}

                  </span>

                </div>


                <div>

                  <CheckCircle size={17} />

                  <span>
                    Connect with available workers
                  </span>

                </div>


                <div>

                  <CheckCircle size={17} />

                  <span>
                    No worker registration fee
                  </span>

                </div>

              </div>


              {/* BUY BUTTON */}

              <button
                type="button"
                className="booking-credit-buy-button"
                onClick={() =>
                  handleBuyCredits(pkg)
                }
                disabled={
                  loadingPackage !== null
                }
              >

                {loadingPackage ===
                pkg.packageName ? (

                  <>
                    <LoaderCircle
                      size={18}
                      className="booking-payment-loader"
                    />

                    Processing...

                  </>

                ) : (

                  <>

                    <CreditCard size={18} />

                    Buy Credits

                  </>

                )}

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

            <h3>
              How Booking Credits Work
            </h3>

            <p>
              Each successful booking request uses one booking
              credit. Credits are used only for the Worker Spot
              connection service.
            </p>

            <p>
              The worker's service charges are separate from
              booking credits. Worker Spot does not take the
              worker's service payment.
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