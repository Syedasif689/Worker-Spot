import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    UserCircle,
    Briefcase,
    MapPin,
    Clock,
    IndianRupee,
    Star,
    AlertCircle,
    Loader2,
    LogOut,
} from "lucide-react";

import { getToken, logout } from "../utils/auth";

import "./WorkerProfileCard.css";

function WorkerProfileCard() {

    const navigate = useNavigate();

    // =====================================================
    // STATE
    // =====================================================

    const [worker, setWorker] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [loggingOut, setLoggingOut] = useState(false);


    // =====================================================
    // SAFE RESPONSE JSON
    // =====================================================

    const getResponseData = async (response) => {

        try {

            const text = await response.text();

            // Empty response
            if (!text || !text.trim()) {
                return {};
            }

            try {

                return JSON.parse(text);

            } catch (jsonError) {

                console.error(
                    "Invalid JSON response:",
                    text
                );

                return {};
            }

        } catch (error) {

            console.error(
                "Unable to read server response:",
                error
            );

            return {};
        }
    };


    // =====================================================
    // HANDLE SESSION EXPIRATION
    // =====================================================

    const handleSessionExpired = () => {

        console.warn(
            "Worker session expired. Logging out..."
        );

        // Prevent multiple logout attempts
        if (loggingOut) {
            return;
        }

        // Clear token from localStorage
        // and sessionStorage
        logout();

        // Clear worker profile
        setWorker(null);

        // Stop loading
        setLoading(false);

        // Show login page
        navigate("/worker-login", {
            replace: true,

            state: {
                sessionExpired: true,
            },
        });
    };


    // =====================================================
    // MANUAL LOGOUT
    // =====================================================

    const handleLogout = () => {

        try {

            setLoggingOut(true);

            console.log(
                "Worker logout started."
            );

            // Clear authentication
            logout();

            console.log(
                "Worker authentication cleared."
            );

            // Redirect to worker login
            navigate("/worker-login", {
                replace: true,
            });

        } catch (err) {

            console.error(
                "Worker logout error:",
                err
            );

            setLoggingOut(false);

            setError(
                "Unable to logout. Please try again."
            );
        }
    };


    // =====================================================
    // LOAD WORKER PROFILE
    // =====================================================

    const fetchWorkerProfile = async () => {

        try {

            setLoading(true);

            setError("");


            // =================================================
            // GET TOKEN
            // =================================================

            const token = getToken();


            // =================================================
            // NO TOKEN
            // =================================================

            if (!token) {

                handleSessionExpired();

                return;
            }


            // =================================================
            // API REQUEST
            // =================================================

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/workers/me`,
                {
                    method: "GET",

                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                }
            );


            // =================================================
            // SAFE RESPONSE
            // =================================================

            const data =
                await getResponseData(response);


            console.log(
                "Worker profile response:",
                response.status,
                data
            );


            // =================================================
            // TOKEN EXPIRED / INVALID
            // =================================================

            if (
                response.status === 401 ||
                response.status === 403
            ) {

                handleSessionExpired();

                return;
            }


            // =================================================
            // OTHER SERVER ERROR
            // =================================================

            if (!response.ok) {

                throw new Error(
                    data?.message ||
                    "Failed to load worker profile."
                );
            }


            // =================================================
            // SUCCESS
            // =================================================

            setWorker(data);

        } catch (err) {

            console.error(
                "Worker profile error:",
                err
            );

            setError(
                err.message ||
                "Unable to load worker profile."
            );

        } finally {

            setLoading(false);
        }
    };


    // =====================================================
    // LOAD PROFILE WHEN COMPONENT OPENS
    // =====================================================

    useEffect(() => {

        fetchWorkerProfile();

    }, []);


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (
            <section className="worker-profile-card worker-profile-loading">

                <div className="worker-profile-loading-icon">

                    <Loader2
                        size={35}
                        className="worker-profile-spinner"
                    />

                </div>

                <div>

                    <strong>
                        Loading your profile...
                    </strong>

                    <p>
                        Please wait while we load your information.
                    </p>

                </div>

            </section>
        );
    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error || !worker) {

        return (
            <section className="worker-profile-card worker-profile-error">

                <div className="worker-profile-error-icon">

                    <AlertCircle size={24} />

                </div>


                <div className="worker-profile-error-content">

                    <strong>
                        Unable to load profile
                    </strong>

                    <p>
                        {error ||
                            "Something went wrong while loading your profile."}
                    </p>


                    <div className="worker-profile-error-actions">

                        {/* TRY AGAIN */}

                        <button
                            type="button"
                            className="worker-profile-retry-btn"
                            onClick={fetchWorkerProfile}
                            disabled={loggingOut}
                        >

                            <Loader2 size={17} />

                            Try Again

                        </button>


                        {/* LOGOUT */}

                        <button
                            type="button"
                            className="worker-profile-logout-btn"
                            onClick={handleLogout}
                            disabled={loggingOut}
                        >

                            {loggingOut ? (

                                <>

                                    <Loader2
                                        size={17}
                                        className="worker-profile-spinner"
                                    />

                                    Logging out...

                                </>

                            ) : (

                                <>

                                    <LogOut size={17} />

                                    Logout & Login Again

                                </>
                            )}

                        </button>

                    </div>

                </div>

            </section>
        );
    }


    // =====================================================
    // PROFILE
    // =====================================================

    return (

        <section className="worker-profile-card">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="worker-profile-header">


                <div className="worker-profile-title">


                    <div className="worker-profile-avatar">

                        <UserCircle size={32} />

                    </div>


                    <div>

                        <span>
                            My Profile
                        </span>

                        <h2>
                            {worker.fullName}
                        </h2>

                    </div>

                </div>


                {/* AVAILABILITY */}

                <div
                    className={`worker-profile-status ${
                        worker.availability === "AVAILABLE"
                            ? "worker-status-available"
                            : "worker-status-busy"
                    }`}
                >

                    <span className="worker-status-dot" />

                    {worker.availability === "AVAILABLE"
                        ? "Available"
                        : "Busy"}

                </div>

            </div>


            {/* =================================================
                CATEGORY
            ================================================= */}

            <div className="worker-profile-category">

                <Briefcase size={18} />

                <div>

                    <span>
                        Service Category
                    </span>

                    <strong>
                        {worker.category}
                    </strong>

                </div>

            </div>


            {/* =================================================
                DETAILS
            ================================================= */}

            <div className="worker-profile-details">


                {/* EXPERIENCE */}

                <div className="worker-profile-detail">

                    <Clock size={18} />

                    <div>

                        <span>
                            Experience
                        </span>

                        <strong>

                            {worker.experienceYears}{" "}

                            {worker.experienceYears === 1
                                ? "Year"
                                : "Years"}

                        </strong>

                    </div>

                </div>


                {/* LOCATION */}

                <div className="worker-profile-detail">

                    <MapPin size={18} />

                    <div>

                        <span>
                            Location
                        </span>

                        <strong>
                            {worker.city}
                        </strong>

                        {worker.area && (

                            <small>
                                {worker.area}
                            </small>

                        )}

                    </div>

                </div>


                {/* CHARGES */}

                <div className="worker-profile-detail">

                    <IndianRupee size={18} />

                    <div>

                        <span>
                            Service Charges
                        </span>

                        <strong>
                            ₹{worker.charges}
                        </strong>

                    </div>

                </div>


                {/* WORKER STATUS */}

                <div className="worker-profile-detail">

                    <Star size={18} />

                    <div>

                        <span>
                            Worker Status
                        </span>

                        <strong>
                            Independent Worker
                        </strong>

                    </div>

                </div>

            </div>


            {/* =================================================
                ABOUT
            ================================================= */}

            {worker.about && (

                <div className="worker-profile-about">

                    <span>
                        About You
                    </span>

                    <p>
                        {worker.about}
                    </p>

                </div>

            )}

        </section>
    );
}

export default WorkerProfileCard;