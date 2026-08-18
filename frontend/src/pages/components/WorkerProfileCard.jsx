import { useEffect, useState } from "react";
import {
    UserCircle,
    Briefcase,
    MapPin,
    Clock,
    IndianRupee,
    Star,
    AlertCircle,
} from "lucide-react";
import "./WorkerProfileCard.css";
function WorkerProfileCard() {

    const [worker, setWorker] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchWorkerProfile = async () => {

            try {

                const token = localStorage.getItem("token");

                if (!token) {
                    setError("Authentication token not found.");
                    setLoading(false);
                    return;
                }

                const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/workers/me`,
  {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {

                    if (response.status === 401) {
                        throw new Error(
                            "Your session has expired. Please login again."
                        );
                    }

                    if (response.status === 403) {
                        throw new Error(
                            "You are not authorized to view this profile."
                        );
                    }

                    throw new Error(
                        "Failed to load worker profile."
                    );
                }

                const data = await response.json();

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

        fetchWorkerProfile();

    }, []);


    /* =========================
       LOADING
    ========================= */

    if (loading) {

        return (
            <section className="worker-profile-card worker-profile-loading">

                <div className="worker-profile-loading-icon">
                    <UserCircle size={35} />
                </div>

                <div>
                    <strong>Loading your profile...</strong>

                    <p>
                        Please wait while we load your information.
                    </p>
                </div>

            </section>
        );
    }


    /* =========================
       ERROR
    ========================= */

    if (error) {

        return (
            <section className="worker-profile-card worker-profile-error">

                <AlertCircle size={24} />

                <div>
                    <strong>
                        Unable to load profile
                    </strong>

                    <p>
                        {error}
                    </p>
                </div>

            </section>
        );
    }


    /* =========================
       PROFILE
    ========================= */

    return (
        <section className="worker-profile-card">

            {/* Header */}

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


            {/* Category */}

            <div className="worker-profile-category">

                <Briefcase size={18} />

                <div>
                    <span>Service Category</span>

                    <strong>
                        {worker.category}
                    </strong>
                </div>

            </div>


            {/* Details */}

            <div className="worker-profile-details">

                <div className="worker-profile-detail">

                    <Clock size={18} />

                    <div>
                        <span>Experience</span>

                        <strong>
                            {worker.experienceYears}{" "}
                            {worker.experienceYears === 1
                                ? "Year"
                                : "Years"}
                        </strong>
                    </div>

                </div>


                <div className="worker-profile-detail">

                    <MapPin size={18} />

                    <div>
                        <span>Location</span>

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


                <div className="worker-profile-detail">

                    <IndianRupee size={18} />

                    <div>
                        <span>Service Charges</span>

                        <strong>
                            ₹{worker.charges}
                        </strong>
                    </div>

                </div>


                <div className="worker-profile-detail">

                    <Star size={18} />

                    <div>
                        <span>Worker Status</span>

                        <strong>
                            Independent Worker
                        </strong>
                    </div>

                </div>

            </div>


            {/* About */}

            {worker.about && (
                <div className="worker-profile-about">

                    <span>About You</span>

                    <p>
                        {worker.about}
                    </p>

                </div>
            )}

        </section>
    );
}

export default WorkerProfileCard;