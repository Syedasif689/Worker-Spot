import { useEffect, useState } from "react";
import {
    CircleDot,
    Clock,
    ShieldCheck,
    AlertCircle,
} from "lucide-react";

function WorkerAvailability() {

    const [availability, setAvailability] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchAvailability = async () => {

            try {

                const token = localStorage.getItem("token");

                if (!token) {
                    throw new Error(
                        "Authentication token not found."
                    );
                }

                const response = await fetch(
                    "http://localhost:8080/api/workers/me",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        "Unable to load availability."
                    );
                }

                const data = await response.json();

                setAvailability(data.availability);

            } catch (err) {

                console.error(
                    "Availability error:",
                    err
                );

                setError(
                    err.message ||
                    "Unable to load availability."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchAvailability();

    }, []);


    if (loading) {

        return (
            <section className="worker-availability-card">

                <div className="worker-availability-loading">
                    <CircleDot size={28} />

                    <span>
                        Loading availability...
                    </span>
                </div>

            </section>
        );
    }


    if (error) {

        return (
            <section className="worker-availability-card worker-availability-error">

                <AlertCircle size={22} />

                <span>
                    {error}
                </span>

            </section>
        );
    }


    const isAvailable = availability === "AVAILABLE";


    return (
        <section className="worker-availability-card">

            {/* Header */}

            <div className="worker-availability-header">

                <div>

                    <span className="worker-section-label">
                        Availability
                    </span>

                    <h2>
                        Your Work Status
                    </h2>

                </div>

                <CircleDot size={24} />

            </div>


            {/* Current status */}

            <div
                className={`worker-availability-status ${
                    isAvailable
                        ? "worker-availability-active"
                        : "worker-availability-busy"
                }`}
            >

                <div className="worker-availability-status-icon">

                    <CircleDot size={24} />

                </div>

                <div>

                    <strong>
                        {isAvailable
                            ? "You are Available"
                            : "You are Busy"}
                    </strong>

                    <p>
                        {isAvailable
                            ? "Customers can find you for new service requests."
                            : "Customers will not see you as available for new requests."}
                    </p>

                </div>

            </div>


            {/* Information */}

            <div className="worker-availability-info">

                <Clock size={18} />

                <span>
                    You can change your availability whenever
                    you are ready to accept or stop accepting
                    new work.
                </span>

            </div>


            {/* Future control */}

            <button
                type="button"
                className="worker-availability-button"
                disabled
            >
                {isAvailable
                    ? "Change to Busy"
                    : "Change to Available"}
            </button>


            {/* Independence */}

            <div className="worker-availability-independent">

                <ShieldCheck size={16} />

                <span>
                    You decide when you are available for work.
                </span>

            </div>

        </section>
    );
}

export default WorkerAvailability;