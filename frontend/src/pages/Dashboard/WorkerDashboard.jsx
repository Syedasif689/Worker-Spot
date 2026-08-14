import { useState } from "react";

import WorkerSidebar from "../components/WorkerSidebar";
import WorkerTopbar from "../components/WorkerTopbar";
import WorkerWelcome from "../components/WorkerWelcome";
import WorkerStats from "../components/WorkerStats";
import WorkerProfileCard from "../components/WorkerProfileCard";
import WorkerAvailability from "../components/WorkerAvailability";
import WorkerRequests from "../components/WorkerRequests";
import WorkerRecentJobs from "../components/WorkerRecentJobs";
import WorkerQuickActions from "../components/WorkerQuickActions";

import "./WorkerDashboard.css";

function WorkerDashboard() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="worker-dashboard">

            {/* =========================
                SIDEBAR
            ========================= */}

            <WorkerSidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />


            {/* =========================
                MAIN CONTENT
            ========================= */}

            <main className="worker-main">

                <WorkerTopbar
                    onMenuClick={() => setSidebarOpen(true)}
                />


                <div className="worker-dashboard-content">

                    <WorkerWelcome />

                    <WorkerStats />


                    <div className="worker-dashboard-grid">

                        <WorkerProfileCard />

                        <WorkerAvailability />

                    </div>


                    <WorkerRequests />

                    <WorkerRecentJobs />

                    <WorkerQuickActions />

                </div>

            </main>

        </div>
    );
}

export default WorkerDashboard;