import React, { useState, useEffect } from "react";
import { Wrench, HardHat, IndianRupee, ArrowRight } from "lucide-react";
import "./WorkerWelcome.css";
function WorkerWelcome() {
    // Data for the cycling animation
    const cycleItems = [
        { icon: Wrench, label: "Tools" },
        { icon: HardHat, label: "Work" },
        { icon: IndianRupee, label: "Earnings" },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Change the icon every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % cycleItems.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [cycleItems.length]);

    const CurrentIcon = cycleItems[currentIndex].icon;
    const currentLabel = cycleItems[currentIndex].label;

    return (
        <section className="worker-welcome">
            <div className="worker-welcome-content">
                {/* Badge */}
                <div className="worker-welcome-badge">
                    <Wrench size={15} />
                    Worker Spot
                </div>

                {/* Header: Title + Cycling Icon & Text */}
                <div className="worker-welcome-header">
                    <h2>Welcome back, Worker</h2>

                    <div className="worker-welcome-cycler">
                        {/* The wrapper re-mounts on index change, triggering the animation */}
                        <div className="cycler-item" key={currentIndex}>
                            <CurrentIcon className="cycler-icon" size={30} />
                            <span className="cycler-text">{currentLabel}</span>
                        </div>
                    </div>
                </div>

                <p>
                    Manage your services, respond to customers
                    and discover new opportunities in your area.
                </p>
            </div>

            {/* Action Button */}
            <button type="button" className="worker-welcome-action">
                View Requests
                <ArrowRight size={17} />
            </button>
        </section>
    );
}

export default WorkerWelcome;