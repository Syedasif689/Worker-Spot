import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  LocateFixed,
  Search,
  ChevronDown,
  Wrench,
  Zap,
  Hammer,
  Droplets,
  Paintbrush,
  Snowflake,
  CarFront,
  UserRound,
  Navigation,
  CheckCircle,
  BriefcaseBusiness,
  IndianRupee,
  RefreshCw,
  Calendar,
  Lock,
  History,
  Home,
} from "lucide-react";

import "./CustomerDashboard.css";
import BookingModal from "../../components/booking/BookingModal";
import CustomerBookings from "../../components/booking/CustomerBookings";

function CustomerDashboard() {
  const navigate = useNavigate();

  // =====================================================
  // REF FOR SCROLLING TO BOOKINGS
  // =====================================================

  const bookingsRef = useRef(null);

  // =====================================================
  // LOCATION
  // =====================================================

  const [location, setLocation] = useState({
    address: "",
    state: "",
    district: "",
    city: "",
    area: "",
    latitude: null,
    longitude: null,
  });

  const [locationMode, setLocationMode] = useState("none");
  const [locationStatus, setLocationStatus] = useState("");
  const [gettingLocation, setGettingLocation] = useState(false);
  const [manualLocation, setManualLocation] = useState("");

  // =====================================================
  // WORKERS
  // =====================================================

  const [selectedCategory, setSelectedCategory] = useState("");
  const [workers, setWorkers] = useState([]);
  const [loadingWorkers, setLoadingWorkers] = useState(false);
  const [workerError, setWorkerError] = useState("");

  // =====================================================
  // BOOKING MODAL
  // =====================================================

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [problemDescription, setProblemDescription] = useState("");
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);
  const [bookingResponse, setBookingResponse] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // =====================================================
  // MY BOOKINGS
  // =====================================================

  const [showBookings, setShowBookings] = useState(false);
  const [customerBookings, setCustomerBookings] = useState([]);

  // =====================================================
  // BOOKING ACCESS - BACKEND AUTHORITY
  // =====================================================

  const FREE_BOOKING_LIMIT = 3;

  const [freeBookingsUsed, setFreeBookingsUsed] = useState(0);

  const [freeBookingsRemaining, setFreeBookingsRemaining] =
    useState(FREE_BOOKING_LIMIT);

  const [freeBookingsCompleted, setFreeBookingsCompleted] = useState(false);

  const [bookingCredits, setBookingCredits] = useState(0);

  const [canBook, setCanBook] = useState(true);

  const [loadingBookingAccess, setLoadingBookingAccess] = useState(true);

  // =====================================================
  // LOAD BOOKING ACCESS FROM BACKEND
  // =====================================================

  useEffect(() => {
    const loadBookingAccess = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoadingBookingAccess(false);
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/bookings/access`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.message || "Unable to load booking access."
          );
        }

        console.log("Booking access from backend:", data);

        setFreeBookingsUsed(Number(data.freeBookingsUsed ?? 0));

        setFreeBookingsRemaining(
          Number(data.freeBookingsRemaining ?? 0)
        );

        setFreeBookingsCompleted(Boolean(data.freeBookingsCompleted));

        setBookingCredits(Number(data.bookingCredits ?? 0));

        setCanBook(Boolean(data.canBook));
      } catch (error) {
        console.error("Booking access error:", error);
      } finally {
        setLoadingBookingAccess(false);
      }
    };

    loadBookingAccess();
  }, []);

  // =====================================================
  // SCROLL TO BOOKINGS
  // =====================================================

  useEffect(() => {
    if (showBookings && bookingsRef.current) {
      setTimeout(() => {
        bookingsRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 150);
    }
  }, [showBookings]);

  // =====================================================
  // CATEGORIES
  // =====================================================

  const categories = [
    {
      name: "Mechanic",
      icon: CarFront,
    },
    {
      name: "Plumber",
      icon: Droplets,
    },
    {
      name: "Electrician",
      icon: Zap,
    },
    {
      name: "Carpenter",
      icon: Hammer,
    },
    {
      name: "Painter",
      icon: Paintbrush,
    },
    {
      name: "AC Technician",
      icon: Snowflake,
    },
    {
      name: "Welder",
      icon: Wrench,
    },
  ];

  // =====================================================
  // REVERSE GEOCODING
  // =====================================================

  const getAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to find address.");
      }

      const data = await response.json();

      const address = data.address || {};

      const state = address.state || "";

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

      const displayAddress =
        data.display_name ||
        [area, city, district, state].filter(Boolean).join(", ");

      return {
        address: displayAddress,
        state,
        district,
        city,
        area,
      };
    } catch (error) {
      console.error("Reverse geocoding error:", error);

      return {
        address: `${Number(latitude).toFixed(6)}, ${Number(
          longitude
        ).toFixed(6)}`,
        state: "",
        district: "",
        city: "",
        area: "",
      };
    }
  };

  // =====================================================
  // FIND NEARBY WORKERS
  // =====================================================

  const findNearbyWorkers = async (
    category,
    latitude = location.latitude,
    longitude = location.longitude
  ) => {
    if (
      latitude === null ||
      longitude === null ||
      latitude === undefined ||
      longitude === undefined
    ) {
      setWorkerError("Please select a valid service location first.");
      setWorkers([]);
      return;
    }

    if (!category) {
      setWorkers([]);
      return;
    }

    try {
      setLoadingWorkers(true);
      setWorkerError("");

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Your session has expired. Please login again.");
      }

      const url =
        `${import.meta.env.VITE_API_URL}/api/workers/nearby` +
        `?latitude=${encodeURIComponent(latitude)}` +
        `&longitude=${encodeURIComponent(longitude)}` +
        `&category=${encodeURIComponent(category)}`;

      console.log("================================");
      console.log("NEARBY WORKER SEARCH");
      console.log("Category:", category);
      console.log("Latitude:", latitude);
      console.log("Longitude:", longitude);
      console.log("API:", url);
      console.log("================================");

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const text = await response.text();

      console.log("Raw nearby-worker response:", text);

      let result;

      try {
        result = text ? JSON.parse(text) : [];
      } catch (error) {
        console.error("Worker JSON parsing error:", error);

        throw new Error("Invalid response received from server.");
      }

      console.log("Actual nearby workers response:", result);

      console.log(
        "Number of workers:",
        Array.isArray(result) ? result.length : "NOT ARRAY"
      );

      if (!response.ok) {
        throw new Error(
          result?.message || "Unable to find nearby workers."
        );
      }

      if (!Array.isArray(result)) {
        throw new Error("Server returned an invalid worker list.");
      }

      setWorkers(result);

      if (result.length === 0) {
        setWorkerError(
          `No ${category} workers found near your location.`
        );
      }
    } catch (error) {
      console.error("Nearby workers error:", error);

      setWorkers([]);

      setWorkerError(
        error.message || "Unable to load nearby workers."
      );
    } finally {
      setLoadingWorkers(false);
    }
  };

  // =====================================================
  // CURRENT LOCATION
  // =====================================================

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus(
        "Location services are not supported by this browser."
      );

      return;
    }

    setGettingLocation(true);

    setLocationStatus("Detecting your current location...");

    setWorkerError("");
    setWorkers([]);

   navigator.geolocation.getCurrentPosition(
  async (position) => {
    const { latitude, longitude } = position.coords;

    try {
      const addressData = await getAddressFromCoordinates(
        latitude,
        longitude
      );

      const newLocation = {
        ...addressData,
        latitude,
        longitude,
      };

      setLocation(newLocation);
      setLocationMode("current");

      setLocationStatus(
        "Current location detected successfully."
      );

      console.log(
        "Customer coordinates:",
        latitude,
        longitude
      );

      if (selectedCategory) {
        await findNearbyWorkers(
          selectedCategory,
          latitude,
          longitude
        );
      }
    } catch (error) {
      console.error("Current location error:", error);

      setLocation({
        address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
        state: "",
        district: "",
        city: "",
        area: "",
        latitude,
        longitude,
      });

      setLocationMode("current");

      setLocationStatus(
        "Location detected successfully."
      );

      if (selectedCategory) {
        await findNearbyWorkers(
          selectedCategory,
          latitude,
          longitude
        );
      }
    } finally {
      setGettingLocation(false);
    }
  },
  (error) => {
    setGettingLocation(false);

    console.error(
      "Geolocation error:",
      error.code,
      error.message
    );

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
          "Unable to detect your current location."
        );
    }
  },
  {
    enableHighAccuracy: false,
    timeout: 30000,
    maximumAge: 60000,
  }
);
  };

  // =====================================================
  // MANUAL LOCATION INPUT
  // =====================================================

  const handleManualLocation = (e) => {
    setManualLocation(e.target.value);
    setLocationStatus("");
    setWorkerError("");
  };

  // =====================================================
  // MANUAL LOCATION SEARCH
  // =====================================================

  const handleManualLocationSubmit = async (e) => {
    e.preventDefault();

    const value = manualLocation.trim();

    if (!value) {
      setLocationStatus("Please enter a location.");
      return;
    }

    try {
      setGettingLocation(true);
      setWorkerError("");
      setWorkers([]);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&addressdetails=1&q=${encodeURIComponent(
          value
        )}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Unable to search this location.");
      }

      const results = await response.json();

      if (!Array.isArray(results) || results.length === 0) {
        throw new Error("Location could not be found.");
      }

      const data = results[0];

      const latitude = Number(data.lat);
      const longitude = Number(data.lon);

      if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
        throw new Error("Location coordinates are invalid.");
      }

      const address = data.address || {};

      const state = address.state || "";

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

      const displayAddress = data.display_name || value;

      const newLocation = {
        address: displayAddress,
        state,
        district,
        city,
        area,
        latitude,
        longitude,
      };

      setLocation(newLocation);

      setLocationMode("manual");

      setLocationStatus("Location selected successfully.");

      console.log(
        "Manual location coordinates:",
        latitude,
        longitude
      );

      if (selectedCategory) {
        await findNearbyWorkers(
          selectedCategory,
          latitude,
          longitude
        );
      }
    } catch (error) {
      console.error("Manual location error:", error);

      setLocationStatus(
        error.message || "Unable to find this location."
      );

      setWorkers([]);
    } finally {
      setGettingLocation(false);
    }
  };

  // =====================================================
  // CATEGORY CLICK
  // =====================================================

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);

    setWorkerError("");

    setWorkers([]);

    if (
      location.latitude === null ||
      location.longitude === null
    ) {
      setWorkerError(
        "Please select your service location first."
      );

      return;
    }

    await findNearbyWorkers(
      category,
      location.latitude,
      location.longitude
    );
  };

  // =====================================================
  // REFRESH WORKERS
  // =====================================================

  const handleRefreshWorkers = () => {
    if (!selectedCategory) {
      return;
    }

    findNearbyWorkers(
      selectedCategory,
      location.latitude,
      location.longitude
    );
  };

  // =====================================================
  // DISTANCE
  // =====================================================

  const formatDistance = (distance) => {
    if (
      distance === null ||
      distance === undefined ||
      Number.isNaN(Number(distance))
    ) {
      return "Distance unavailable";
    }

    const value = Number(distance);

    if (value < 1) {
      return `${Math.round(value * 1000)} m away`;
    }

    return `${value.toFixed(2)} km away`;
  };

  // =====================================================
  // AVAILABILITY
  // =====================================================

  const getAvailabilityText = (availability) => {
    return String(availability).toUpperCase() === "AVAILABLE"
      ? "Available"
      : "Busy";
  };

  // =====================================================
  // GET ACTIVE BOOKING FOR WORKER
  // =====================================================

  const getWorkerBooking = (workerId) => {
    return customerBookings.find((booking) => {
      if (Number(booking.workerId) !== Number(workerId)) {
        return false;
      }

      const status = String(booking.status).toUpperCase();

      return status === "PENDING" || status === "ACCEPTED";
    });
  };

  // =====================================================
  // OPEN WORKER / BOOKING MODAL
  // =====================================================

  const handleViewWorker = (worker) => {
    if (!canBook) {
      navigate("/customer/booking-credits");
      return;
    }

    const existingBooking = getWorkerBooking(worker.workerId);

    if (existingBooking) {
      const status = String(existingBooking.status).toUpperCase();

      if (status === "PENDING") {
        alert(
          "You have already sent a booking request to this worker. Please wait for the worker to respond."
        );

        return;
      }

      if (status === "ACCEPTED") {
        alert(
          "This worker is currently working on your booking."
        );

        return;
      }
    }

    setSelectedWorker(worker);

    setProblemDescription("");

    setBookingResponse(null);

    setShowSuccess(false);

    setShowBookingModal(true);
  };

  // =====================================================
  // CLOSE BOOKING MODAL
  // =====================================================

  const handleCloseModal = () => {
    setShowBookingModal(false);

    setSelectedWorker(null);

    setProblemDescription("");

    setBookingResponse(null);

    setShowSuccess(false);

    setIsCreatingBooking(false);
  };

  // =====================================================
  // SEND BOOKING
  // =====================================================

  const handleSendBooking = async (description) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert(
        "Your session has expired. Please login again."
      );

      return;
    }

    if (!selectedWorker) {
      alert("No worker selected.");
      return;
    }

    if (
      location.latitude === null ||
      location.longitude === null ||
      !location.address
    ) {
      alert(
        "Service location is not set. Please select a location first."
      );

      return;
    }

    const payload = {
      workerId: selectedWorker.workerId,

      category:
        selectedWorker.category || selectedCategory,

      serviceLocation: location.address,

      serviceState: location.state || "",

      serviceDistrict: location.district || "",

      serviceCity: location.city || "",

      serviceArea: location.area || "",

      customerLatitude: location.latitude,

      customerLongitude: location.longitude,

      problemDescription: description,
    };

    try {
      setIsCreatingBooking(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bookings`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to create booking."
        );
      }

      console.log("Booking created:", data);

      setBookingResponse(data);

      setShowSuccess(true);

      setCustomerBookings((prev) => [
        data,
        ...prev.filter(
          (booking) =>
            booking.bookingId !== data.bookingId
        ),
      ]);

      // =====================================================
      // REFRESH BOOKING ACCESS
      // =====================================================

      try {
        const accessResponse = await fetch(
          `${import.meta.env.VITE_API_URL}/api/bookings/access`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,

              Accept: "application/json",
            },
          }
        );

        const accessData = await accessResponse.json();

        if (accessResponse.ok) {
          setFreeBookingsUsed(
            Number(accessData.freeBookingsUsed ?? 0)
          );

          setFreeBookingsRemaining(
            Number(accessData.freeBookingsRemaining ?? 0)
          );

          setFreeBookingsCompleted(
            Boolean(accessData.freeBookingsCompleted)
          );

          setBookingCredits(
            Number(accessData.bookingCredits ?? 0)
          );

          setCanBook(Boolean(accessData.canBook));
        }
      } catch (accessError) {
        console.error(
          "Unable to refresh booking access:",
          accessError
        );
      }
    } catch (error) {
      console.error("Booking creation error:", error);

      alert(
        error.message ||
          "Unable to send booking request. Please try again."
      );
    } finally {
      setIsCreatingBooking(false);
    }
  };

  // =====================================================
  // TOGGLE MY BOOKINGS
  // =====================================================

  const toggleBookings = () => {
    setShowBookings((prev) => !prev);
  };

  // =====================================================
  // MOBILE NAVIGATION
  // =====================================================

  const handleMobileHome = () => {
    setShowBookings(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleMobileBookings = () => {
    setShowBookings(true);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <div className="customer-dashboard">

      {/* =================================================
          TOPBAR
      ================================================= */}

      <header className="customer-dashboard-topbar">

        <div className="customer-dashboard-brand">

          <div className="customer-dashboard-brand-icon">
            <Wrench size={23} />
          </div>

          <div>
            <h2>
              Worker<span> Spot</span>
            </h2>

            <p>
              Find skilled workers near you
            </p>
          </div>

        </div>

        {/* =================================================
            DESKTOP TOPBAR ACTIONS
        ================================================= */}

        <div className="customer-dashboard-topbar-actions">

          {/* Booking Credits */}

          <button
  type="button"
  className="customer-dashboard-credit-button"
  onClick={() =>
    navigate("/customer/booking-credits")
  }
>
  <IndianRupee size={18} />

  <span>
    Booking Credits
  </span>
</button>

          {/* My Bookings */}

          <button
            type="button"
            className="customer-dashboard-my-bookings"
            onClick={toggleBookings}
          >
            <Calendar size={18} />

            <span>
              My Bookings
            </span>
          </button>

          {/* Payment History */}

          <button
            type="button"
            className="customer-dashboard-payment-history"
            onClick={() =>
              navigate("/payment-history")
            }
          >
            <History size={18} />

            <span>
              Payment History
            </span>
          </button>

          {/* Profile */}

          <button
            type="button"
            className="customer-dashboard-profile"
            onClick={() =>
              navigate("/customer-profile")
            }
          >
            <UserRound size={19} />

            <span>
              Profile
            </span>
          </button>

        </div>

      </header>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="customer-dashboard-content">

        {/* =================================================
            WELCOME
        ================================================= */}

        <section className="customer-dashboard-welcome">

          <div>

            <span className="customer-dashboard-badge">

              <Navigation size={14} />

              Service Finder

            </span>

            <h1>
              What service do you need?
            </h1>

            <p>
              Find skilled workers near your service location.
            </p>

          </div>

        </section>

        {/* =================================================
            LOCATION
        ================================================= */}

        <section className="customer-location-card">

          <div className="customer-location-header">

            <div className="customer-location-title">

              <div className="customer-location-icon">
                <MapPin size={21} />
              </div>

              <div>

                <h2>
                  Service Location
                </h2>

                <p>
                  Where do you need the worker?
                </p>

              </div>

            </div>

            <ChevronDown size={20} />

          </div>

          {/* SELECTED LOCATION */}

          {location.address && (

            <div className="customer-selected-location">

              <div className="customer-selected-location-icon">
                <CheckCircle size={19} />
              </div>

              <div className="customer-selected-location-text">

                <strong>
                  {locationMode === "current"
                    ? "Current location"
                    : "Selected location"}
                </strong>

                <span>
                  {location.address}
                </span>

              </div>

            </div>

          )}

          {/* CURRENT LOCATION */}

          <button
            type="button"
            className="customer-current-location-button"
            onClick={handleCurrentLocation}
            disabled={gettingLocation}
          >

            <LocateFixed size={19} />

            {gettingLocation
              ? "Detecting Location..."
              : "Use Current Location"}

          </button>

          <div className="customer-location-divider">

            <span>
              OR
            </span>

          </div>

          {/* MANUAL LOCATION */}

          <form
            className="customer-manual-location"
            onSubmit={handleManualLocationSubmit}
          >

            <div className="customer-search-box">

              <Search size={19} />

              <input
                type="text"
                placeholder="Search for area, city, landmark..."
                value={manualLocation}
                onChange={handleManualLocation}
              />

            </div>

            <button
              type="submit"
              className="customer-location-search-button"
              disabled={gettingLocation}
            >
              {gettingLocation
                ? "Searching..."
                : "Select"}
            </button>

          </form>

          {locationStatus && (

            <p className="customer-location-status">
              {locationStatus}
            </p>

          )}

        </section>

        {/* =================================================
            CATEGORIES
        ================================================= */}

        <section className="customer-categories-section">

          <div className="customer-section-heading">

            <div>

              <h2>
                Browse Services
              </h2>

              <p>
                Choose the type of worker you need.
              </p>

            </div>

          </div>

          <div className="customer-category-grid">

            {categories.map((category) => {

              const Icon = category.icon;

              const isSelected =
                selectedCategory === category.name;

              return (

                <button
                  type="button"
                  key={category.name}
                  className={`customer-category-card ${
                    isSelected ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleCategoryClick(category.name)
                  }
                  disabled={loadingWorkers}
                >

                  <div className="customer-category-icon">

                    <Icon size={25} />

                  </div>

                  <span>
                    {category.name}
                  </span>

                  <small>
                    {isSelected
                      ? "Selected"
                      : "Find nearby"}
                  </small>

                </button>

              );

            })}

          </div>

        </section>

        {/* =================================================
            NEARBY WORKERS
        ================================================= */}

        <section className="customer-nearby-section">

          <div className="customer-section-heading">

            <div>

              <h2>
                Nearby Workers
              </h2>

              <p>
                {selectedCategory
                  ? `${selectedCategory} workers near your service location.`
                  : "Workers available near your service location."}
              </p>

            </div>

            {selectedCategory &&
              workers.length > 0 && (

                <button
                  type="button"
                  className="customer-refresh-workers"
                  onClick={handleRefreshWorkers}
                  disabled={loadingWorkers}
                >

                  <RefreshCw size={17} />

                  Refresh

                </button>

              )}

          </div>

          {/* LOADING */}

          {loadingWorkers && (

            <div className="customer-nearby-empty">

              <div className="customer-nearby-empty-icon">

                <RefreshCw
                  size={27}
                  className="customer-loading-icon"
                />

              </div>

              <h3>
                Finding nearby workers...
              </h3>

              <p>
                Searching for available{" "}
                {selectedCategory} workers near your location.
              </p>

            </div>

          )}

          {/* ERROR */}

          {!loadingWorkers &&
            workerError && (

              <div className="customer-nearby-empty">

                <div className="customer-nearby-empty-icon">
                  <MapPin size={27} />
                </div>

                <h3>
                  {selectedCategory
                    ? "No workers found"
                    : "Select a service location"}
                </h3>

                <p>
                  {workerError}
                </p>

              </div>

            )}

          {/* NO CATEGORY */}

          {!loadingWorkers &&
            !workerError &&
            !selectedCategory && (

              <div className="customer-nearby-empty">

                <div className="customer-nearby-empty-icon">
                  <MapPin size={27} />
                </div>

                <h3>
                  Select a service
                </h3>

                <p>
                  Select your location and then choose the type
                  of worker you need.
                </p>

              </div>

            )}

          {/* WORKER LIST */}

          {!loadingWorkers &&
            workers.length > 0 && (

              <div className="customer-worker-list">

                {workers.map((worker, index) => (

                  <article
                    className={`customer-worker-card ${
                      !canBook ? "free-tier-locked" : ""
                    }`}
                    key={
                      worker.workerId ??
                      `worker-${index}`
                    }
                    style={{
                      position: "relative",
                    }}
                  >

                    {/* WORKER CARD CONTENT */}

                    <div
                      className="customer-worker-card-content"
                      style={{
                        filter: !canBook
                          ? "blur(4px)"
                          : "none",

                        pointerEvents: !canBook
                          ? "none"
                          : "auto",

                        transition:
                          "filter 0.3s ease",
                      }}
                    >

                      {/* HEADER */}

                      <div className="customer-worker-header">

                        <div className="customer-worker-avatar">
                          <UserRound size={25} />
                        </div>

                        <div className="customer-worker-main">

                          <h3>
                            {worker.fullName ||
                              "Worker"}
                          </h3>

                          <span className="customer-worker-category">

                            <Wrench size={14} />

                            {worker.category ||
                              selectedCategory}

                          </span>

                        </div>

                        <div
                          className={`customer-worker-availability ${
                            String(
                              worker.availability
                            ).toUpperCase() ===
                            "AVAILABLE"
                              ? "available"
                              : "busy"
                          }`}
                        >

                          <span></span>

                          {getAvailabilityText(
                            worker.availability
                          )}

                        </div>

                      </div>

                      {/* DETAILS */}

                      <div className="customer-worker-details">

                        <div className="customer-worker-detail">

                          <BriefcaseBusiness size={17} />

                          <div>

                            <small>
                              Experience
                            </small>

                            <strong>
                              {worker.experienceYears ??
                                0}{" "}
                              years
                            </strong>

                          </div>

                        </div>

                        <div className="customer-worker-detail">

                          <IndianRupee size={17} />

                          <div>

                            <small>
                              Charges
                            </small>

                            <strong>
                              ₹
                              {Number(
                                worker.charges ?? 0
                              ).toFixed(2)}
                              /hour
                            </strong>

                          </div>

                        </div>

                        <div className="customer-worker-detail">

                          <Navigation size={17} />

                          <div>

                            <small>
                              Distance
                            </small>

                            <strong>
                              {formatDistance(
                                worker.distanceKm
                              )}
                            </strong>

                          </div>

                        </div>

                      </div>

                      {/* LOCATION */}

                      <div className="customer-worker-location">

                        <MapPin size={17} />

                        <span>
                          {[
                            worker.area,
                            worker.city,
                            worker.district,
                            worker.state,
                          ]
                            .filter(Boolean)
                            .join(", ") ||
                            "Location unavailable"}
                        </span>

                      </div>

                      {/* ABOUT */}

                      {worker.about && (

                        <div className="customer-worker-about">

                          <p>
                            {worker.about}
                          </p>

                        </div>

                      )}

                      {/* ACTION */}

                      <div className="customer-worker-actions">

                        {(() => {

                          const existingBooking =
                            getWorkerBooking(
                              worker.workerId
                            );

                          const status =
                            existingBooking?.status?.toUpperCase();

                          if (
                            status ===
                            "PENDING"
                          ) {

                            return (

                              <button
                                type="button"
                                className="customer-worker-view-button"
                                disabled
                              >
                                ✓ Request Sent
                              </button>

                            );

                          }

                          if (
                            status ===
                            "ACCEPTED"
                          ) {

                            return (

                              <button
                                type="button"
                                className="customer-worker-view-button"
                                disabled
                              >
                                ✓ Worker Currently Working
                              </button>

                            );

                          }

                          return (

                            <button
                              type="button"
                              className="customer-worker-view-button"
                              onClick={() =>
                                handleViewWorker(
                                  worker
                                )
                              }
                            >
                              View Worker
                            </button>

                          );

                        })()}

                      </div>

                    </div>

                    {/* FREE TIER LOCK OVERLAY */}

                    {!loadingBookingAccess &&
                      !canBook && (

                        <div className="customer-worker-lock-overlay">

                          <div className="customer-worker-lock-content">

                            <div className="customer-worker-lock-icon">

                              <Lock size={28} />

                            </div>

                            <h3>
                              Booking Access Required
                            </h3>

                            <p>
                              Your 3 free bookings have
                              been completed.
                            </p>

                            <span>
                              Purchase Booking Credits to
                              continue booking workers.
                            </span>

                            <button
                              type="button"
                              className="customer-worker-unlock-button"
                              onClick={() =>
                                navigate(
                                  "/customer/booking-credits"
                                )
                              }
                            >

                              <IndianRupee size={17} />

                              Buy Booking Credits

                            </button>

                          </div>

                        </div>

                      )}

                  </article>

                ))}

              </div>

            )}

        </section>

        {/* =================================================
            MY BOOKINGS
        ================================================= */}

        <div
          ref={bookingsRef}
          className="customer-bookings-wrapper"
        >

          {showBookings && (

            <CustomerBookings
              token={localStorage.getItem("token")}
              onBookingsLoaded={
                setCustomerBookings
              }
            />

          )}

        </div>

      </main>

      {/* =================================================
          BOOKING MODAL
      ================================================= */}

      <BookingModal
        isOpen={showBookingModal}
        onClose={handleCloseModal}
        worker={selectedWorker}
        location={location}
        category={selectedCategory}
        onSendBooking={handleSendBooking}
        isCreating={isCreatingBooking}
        bookingResponse={bookingResponse}
        showSuccess={showSuccess}
        problemDescription={problemDescription}
        setProblemDescription={setProblemDescription}
      />

      {/* =================================================
          MOBILE BOTTOM NAVIGATION
      ================================================= */}

      <nav className="customer-mobile-bottom-nav">

        {/* HOME */}

        <button
          type="button"
          className="customer-mobile-nav-item active"
          onClick={handleMobileHome}
        >
          <Home size={20} />
          <span>Home</span>
        </button>

        {/* BOOKING CREDITS */}

        <button
          type="button"
          className="customer-mobile-nav-item"
          onClick={() =>
            navigate("/customer/booking-credits")
          }
        >
          <IndianRupee size={20} />

          <span>Credits</span>

          
        </button>

        {/* MY BOOKINGS */}

        <button
          type="button"
          className={`customer-mobile-nav-item ${
            showBookings ? "active" : ""
          }`}
          onClick={handleMobileBookings}
        >
          <Calendar size={20} />

          <span>Bookings</span>
        </button>

        {/* PAYMENT HISTORY */}

        <button
          type="button"
          className="customer-mobile-nav-item"
          onClick={() =>
            navigate("/payment-history")
          }
        >
          <History size={20} />

          <span>History</span>
        </button>

        {/* PROFILE */}

        <button
          type="button"
          className="customer-mobile-nav-item"
          onClick={() =>
            navigate("/customer-profile")
          }
        >
          <UserRound size={20} />

          <span>Profile</span>
        </button>

      </nav>

    </div>
  );
}

export default CustomerDashboard;