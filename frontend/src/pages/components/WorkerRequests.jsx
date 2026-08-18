import { useEffect, useState } from "react";

import {
  ClipboardList,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  User,
  IndianRupee,
  Wrench,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import "./WorkerRequests.css";

function WorkerRequests() {

  // =====================================================
  // STATE
  // =====================================================

  const [requests, setRequests] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [actionLoading, setActionLoading] = useState(null);

  const [error, setError] = useState("");


  // =====================================================
  // API BASE URL
  // =====================================================

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "https://your-worker-spot-backend.onrender.com";


  // =====================================================
  // LOAD WORKER BOOKINGS
  // =====================================================

  const loadRequests = async (
    showRefreshing = false
  ) => {

    try {

      if (showRefreshing) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");


      // -------------------------------------------------
      // JWT
      // -------------------------------------------------

      const token =
        localStorage.getItem("token");


      if (!token) {

        throw new Error(
          "Your session has expired. Please login again."
        );
      }


      // -------------------------------------------------
      // API
      // -------------------------------------------------

      const response = await fetch(
        `${API_BASE_URL}/api/bookings/worker`,
        {
          method: "GET",

          headers: {
            Authorization:
              `Bearer ${token}`,

            Accept:
              "application/json",
          },
        }
      );


      // -------------------------------------------------
      // SAFE RESPONSE PARSING
      // -------------------------------------------------

      const text =
        await response.text();

      let result = null;


      try {

        result =
          text
            ? JSON.parse(text)
            : null;

      } catch (parseError) {

        console.error(
          "Worker bookings JSON parsing error:",
          parseError
        );

        throw new Error(
          "Invalid response received from server."
        );
      }


      // -------------------------------------------------
      // HTTP ERROR
      // -------------------------------------------------

      if (!response.ok) {

        throw new Error(
          result?.message ||
          "Unable to load service requests."
        );
      }


      // -------------------------------------------------
      // VALIDATE ARRAY
      // -------------------------------------------------

      if (!Array.isArray(result)) {

        throw new Error(
          "Server returned an invalid booking list."
        );
      }


      console.log(
        "Worker bookings:",
        result
      );


      // -------------------------------------------------
      // SAVE
      // -------------------------------------------------

      setRequests(result);

    } catch (error) {

      console.error(
        "Worker bookings error:",
        error
      );

      setError(
        error.message ||
        "Unable to load service requests."
      );

    } finally {

      setLoading(false);

      setRefreshing(false);
    }
  };


  // =====================================================
  // LOAD ON COMPONENT MOUNT
  // =====================================================

  useEffect(() => {

    loadRequests();

  }, []);


  // =====================================================
  // ACCEPT BOOKING
  // =====================================================

  const handleAccept = async (
    bookingId
  ) => {

    if (!bookingId) {
      return;
    }


    try {

      setActionLoading(
        bookingId
      );

      setError("");


      // -------------------------------------------------
      // JWT
      // -------------------------------------------------

      const token =
        localStorage.getItem("token");


      if (!token) {

        throw new Error(
          "Your session has expired. Please login again."
        );
      }


      // -------------------------------------------------
      // API
      // -------------------------------------------------

      const response =
        await fetch(
          `${API_BASE_URL}/api/bookings/${bookingId}/accept`,
          {
            method: "PUT",

            headers: {
              Authorization:
                `Bearer ${token}`,

              Accept:
                "application/json",
            },
          }
        );


      // -------------------------------------------------
      // SAFE RESPONSE
      // -------------------------------------------------

      const text =
        await response.text();

      let result = null;


      try {

        result =
          text
            ? JSON.parse(text)
            : null;

      } catch (parseError) {

        console.error(
          "Accept booking JSON parsing error:",
          parseError
        );

        throw new Error(
          "Invalid response received from server."
        );
      }


      // -------------------------------------------------
      // ERROR
      // -------------------------------------------------

      if (!response.ok) {

        throw new Error(
          result?.message ||
          "Unable to accept this booking."
        );
      }


      // -------------------------------------------------
      // UPDATE LOCAL BOOKING
      // -------------------------------------------------

      if (result) {

        setRequests((currentRequests) =>
          currentRequests.map(
            (request) =>
              request.bookingId ===
              bookingId
                ? result
                : request
          )
        );

      } else {

        // Fallback if backend returns empty response

        setRequests((currentRequests) =>
          currentRequests.map(
            (request) =>
              request.bookingId ===
              bookingId
                ? {
                    ...request,
                    status: "ACCEPTED",
                  }
                : request
          )
        );
      }


      console.log(
        "Booking accepted:",
        result
      );

    } catch (error) {

      console.error(
        "Accept booking error:",
        error
      );

      setError(
        error.message ||
        "Unable to accept this booking."
      );

    } finally {

      setActionLoading(null);
    }
  };


  // =====================================================
  // REJECT BOOKING
  // =====================================================

  const handleReject = async (
    bookingId
  ) => {

    if (!bookingId) {
      return;
    }


    try {

      setActionLoading(
        bookingId
      );

      setError("");


      // -------------------------------------------------
      // JWT
      // -------------------------------------------------

      const token =
        localStorage.getItem("token");


      if (!token) {

        throw new Error(
          "Your session has expired. Please login again."
        );
      }


      // -------------------------------------------------
      // API
      // -------------------------------------------------

      const response =
        await fetch(
          `${API_BASE_URL}/api/bookings/${bookingId}/reject`,
          {
            method: "PUT",

            headers: {
              Authorization:
                `Bearer ${token}`,

              Accept:
                "application/json",
            },
          }
        );


      // -------------------------------------------------
      // SAFE RESPONSE
      // -------------------------------------------------

      const text =
        await response.text();

      let result = null;


      try {

        result =
          text
            ? JSON.parse(text)
            : null;

      } catch (parseError) {

        console.error(
          "Reject booking JSON parsing error:",
          parseError
        );

        throw new Error(
          "Invalid response received from server."
        );
      }


      // -------------------------------------------------
      // ERROR
      // -------------------------------------------------

      if (!response.ok) {

        throw new Error(
          result?.message ||
          "Unable to reject this booking."
        );
      }


      // -------------------------------------------------
      // UPDATE LOCAL BOOKING
      // -------------------------------------------------

      if (result) {

        setRequests((currentRequests) =>
          currentRequests.map(
            (request) =>
              request.bookingId ===
              bookingId
                ? result
                : request
          )
        );

      } else {

        setRequests((currentRequests) =>
          currentRequests.map(
            (request) =>
              request.bookingId ===
              bookingId
                ? {
                    ...request,
                    status: "REJECTED",
                  }
                : request
          )
        );
      }


      console.log(
        "Booking rejected:",
        result
      );

    } catch (error) {

      console.error(
        "Reject booking error:",
        error
      );

      setError(
        error.message ||
        "Unable to reject this booking."
      );

    } finally {

      setActionLoading(null);
    }
  };


  // =====================================================
  // REFRESH
  // =====================================================

  const handleRefresh = () => {

    loadRequests(true);

  };


  // =====================================================
  // DATE FORMAT
  // =====================================================

  const formatDateTime = (
    createdAt
  ) => {

    if (!createdAt) {
      return "Time unavailable";
    }

    try {

      return new Date(
        createdAt
      ).toLocaleString(
        "en-IN",
        {
          dateStyle: "medium",
          timeStyle: "short",
        }
      );

    } catch {

      return createdAt;
    }
  };


  // =====================================================
  // STATUS
  // =====================================================

  const getStatusClass = (
    status
  ) => {

    switch (
      String(status)
        .toUpperCase()
    ) {

      case "ACCEPTED":
        return "accepted";

      case "REJECTED":
        return "rejected";

      case "PENDING":
      default:
        return "pending";
    }
  };


  // =====================================================
  // PENDING REQUESTS
  // =====================================================

  const pendingRequests =
    requests.filter(
      (request) =>
        String(
          request.status
        ).toUpperCase() ===
        "PENDING"
    );


  // =====================================================
  // OTHER BOOKINGS
  // =====================================================

  const otherBookings =
    requests.filter(
      (request) =>
        String(
          request.status
        ).toUpperCase() !==
        "PENDING"
    );


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <section className="worker-requests">

        <div className="worker-section-header">

          <div>

            <h2>
              Service Requests
            </h2>

            <p>
              Customer requests for your services
            </p>

          </div>

        </div>


        <div className="worker-requests-empty">

          <div className="worker-empty-icon">

            <RefreshCw
              size={32}
              className="worker-loading-icon"
            />

          </div>

          <h3>
            Loading service requests...
          </h3>

          <p>
            Checking for new customer bookings.
          </p>

        </div>

      </section>
    );
  }


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <section className="worker-requests">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="worker-section-header">

        <div>

          <h2>
            Service Requests
          </h2>

          <p>
            Customer requests for your services
          </p>

        </div>


        <div className="worker-request-header-actions">

          <div className="worker-request-count">

            <ClipboardList
              size={18}
            />

            <span>
              {pendingRequests.length}
            </span>

          </div>


          <button
            type="button"
            className="worker-request-refresh"
            onClick={
              handleRefresh
            }
            disabled={
              refreshing ||
              actionLoading !== null
            }
          >

            <RefreshCw
              size={17}
              className={
                refreshing
                  ? "worker-loading-icon"
                  : ""
              }
            />

            Refresh

          </button>

        </div>

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (

        <div className="worker-request-error">

          <AlertCircle
            size={18}
          />

          <span>
            {error}
          </span>

        </div>

      )}


      {/* =================================================
          PENDING REQUESTS
      ================================================= */}

      {pendingRequests.length > 0 && (

        <div className="worker-request-group">

          <div className="worker-request-group-title">

            <div>

              <h3>
                New Requests
              </h3>

              <p>
                Customers waiting for your response
              </p>

            </div>

            <span>
              {pendingRequests.length}
            </span>

          </div>


          <div className="worker-request-list">

            {pendingRequests.map(
              (request) => {

                const isProcessing =
                  actionLoading ===
                  request.bookingId;


                return (

                  <div
                    className="worker-request-card"
                    key={
                      request.bookingId
                    }
                  >


                    {/* =================================================
                        CUSTOMER
                    ================================================= */}

                    <div className="worker-request-customer">

                      <div className="worker-request-avatar">

                        <User
                          size={20}
                        />

                      </div>


                      <div>

                        <h3>
                          {request.customerName ||
                            "Customer"}
                        </h3>

                        <p>

                          <Wrench
                            size={14}
                          />

                          {request.category ||
                            request.workerCategory ||
                            "Service"}

                        </p>

                      </div>

                    </div>


                    {/* =================================================
                        PROBLEM
                    ================================================= */}

                    {request.problemDescription && (

                      <div className="worker-request-problem">

                        <strong>
                          Problem
                        </strong>

                        <p>
                          {request.problemDescription}
                        </p>

                      </div>

                    )}


                    {/* =================================================
                        LOCATION
                    ================================================= */}

                    <div className="worker-request-location">

                      <MapPin
                        size={17}
                      />

                      <span>

                        {request.serviceLocation ||
                          [
                            request.serviceArea,
                            request.serviceCity,
                            request.serviceDistrict,
                            request.serviceState,
                          ]
                            .filter(Boolean)
                            .join(", ") ||
                          "Location unavailable"}

                      </span>

                    </div>


                    {/* =================================================
                        DETAILS
                    ================================================= */}

                    <div className="worker-request-details">


                      <div className="worker-request-detail">

                        <IndianRupee
                          size={17}
                        />

                        <div>

                          <small>
                            Worker charges
                          </small>

                          <strong>
                            ₹
                            {Number(
                              request.workerCharges ||
                              0
                            ).toFixed(2)}
                          </strong>

                        </div>

                      </div>


                      <div className="worker-request-detail">

                        <IndianRupee
                          size={17}
                        />

                        <div>

                          <small>
                            Total
                          </small>

                          <strong>
                            ₹
                            {Number(
                              request.totalAmount ||
                              0
                            ).toFixed(2)}
                          </strong>

                        </div>

                      </div>


                      <div className="worker-request-detail">

                        <Clock
                          size={17}
                        />

                        <div>

                          <small>
                            Requested
                          </small>

                          <strong>
                            {formatDateTime(
                              request.createdAt
                            )}
                          </strong>

                        </div>

                      </div>

                    </div>


                    {/* =================================================
                        STATUS
                    ================================================= */}

                    <div className="worker-request-status-row">

                      <span
                        className={`worker-request-status ${getStatusClass(
                          request.status
                        )}`}
                      >

                        <span></span>

                        {request.status ||
                          "PENDING"}

                      </span>

                    </div>


                    {/* =================================================
                        ACTIONS
                    ================================================= */}

                    <div className="worker-request-actions">

                      <button
                        type="button"
                        className="worker-request-accept"
                        onClick={() =>
                          handleAccept(
                            request.bookingId
                          )
                        }
                        disabled={
                          isProcessing
                        }
                      >

                        <CheckCircle
                          size={17}
                        />

                        {isProcessing
                          ? "Processing..."
                          : "Accept"}

                      </button>


                      <button
                        type="button"
                        className="worker-request-reject"
                        onClick={() =>
                          handleReject(
                            request.bookingId
                          )
                        }
                        disabled={
                          isProcessing
                        }
                      >

                        <XCircle
                          size={17}
                        />

                        {isProcessing
                          ? "Processing..."
                          : "Reject"}

                      </button>

                    </div>

                  </div>

                );
              }
            )}

          </div>

        </div>

      )}


      {/* =================================================
          NO PENDING REQUESTS
      ================================================= */}

      {pendingRequests.length === 0 && (

        <div className="worker-requests-empty">

          <div className="worker-empty-icon">

            <ClipboardList
              size={32}
            />

          </div>

          <h3>
            No new service requests
          </h3>

          <p>
            When customers request your services,
            their pending requests will appear here.
          </p>

        </div>

      )}


      {/* =================================================
          OTHER BOOKINGS
      ================================================= */}

      {otherBookings.length > 0 && (

        <div className="worker-request-group worker-request-history">

          <div className="worker-request-group-title">

            <div>

              <h3>
                Booking History
              </h3>

              <p>
                Your previous service requests
              </p>

            </div>

            <span>
              {otherBookings.length}
            </span>

          </div>


          <div className="worker-request-list">

            {otherBookings.map(
              (request) => (

                <div
                  className="worker-request-card worker-request-history-card"
                  key={
                    request.bookingId
                  }
                >

                  {/* Customer */}

                  <div className="worker-request-customer">

                    <div className="worker-request-avatar">

                      <User
                        size={20}
                      />

                    </div>

                    <div>

                      <h3>
                        {request.customerName ||
                          "Customer"}
                      </h3>

                      <p>

                        <Wrench
                          size={14}
                        />

                        {request.category ||
                          "Service"}

                      </p>

                    </div>

                  </div>


                  {/* Location */}

                  <div className="worker-request-location">

                    <MapPin
                      size={17}
                    />

                    <span>

                      {request.serviceLocation ||
                        [
                          request.serviceArea,
                          request.serviceCity,
                          request.serviceDistrict,
                          request.serviceState,
                        ]
                          .filter(Boolean)
                          .join(", ") ||
                        "Location unavailable"}

                    </span>

                  </div>


                  {/* Amount */}

                  <div className="worker-request-history-info">

                    <span>

                      ₹
                      {Number(
                        request.totalAmount ||
                        0
                      ).toFixed(2)}

                    </span>

                  </div>


                  {/* Status */}

                  <div className="worker-request-status-row">

                    <span
                      className={`worker-request-status ${getStatusClass(
                        request.status
                      )}`}
                    >

                      <span></span>

                      {request.status}

                    </span>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      )}

    </section>
  );
}

export default WorkerRequests;