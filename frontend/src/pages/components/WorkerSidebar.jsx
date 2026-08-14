import {
    LayoutDashboard,
    ClipboardList,
    Briefcase,
    UserCircle,
    CircleDot,
    Wallet,
    Settings,
    LogOut,
    X,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function WorkerSidebar({ isOpen, onClose }) {

    const menuItems = [
        {
            name: "Dashboard",
            path: "/worker-dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Service Requests",
            path: "/worker-requests",
            icon: ClipboardList,
        },
        {
            name: "My Jobs",
            path: "/worker-jobs",
            icon: Briefcase,
        },
        {
            name: "My Profile",
            path: "/worker-profile",
            icon: UserCircle,
        },
        {
            name: "Availability",
            path: "/worker-availability",
            icon: CircleDot,
        },
        {
            name: "Earnings",
            path: "/worker-earnings",
            icon: Wallet,
        },
        {
            name: "Settings",
            path: "/worker-settings",
            icon: Settings,
        },
    ];


    return (
        <>

            {/* =========================
                MOBILE OVERLAY
            ========================= */}

            {isOpen && (
                <div
                    className="worker-sidebar-overlay"
                    onClick={onClose}
                />
            )}


            {/* =========================
                SIDEBAR
            ========================= */}

            <aside
                className={`worker-sidebar ${
                    isOpen ? "worker-sidebar-open" : ""
                }`}
            >

                {/* =========================
                    BRAND
                ========================= */}

                <div className="worker-sidebar-brand">

                    <div className="worker-sidebar-brand-icon">
                        <Briefcase size={23} />
                    </div>


                    <div className="worker-sidebar-brand-text">

                        <h2>
                            Worker<span> Spot</span>
                        </h2>

                        <p>
                            Worker Dashboard
                        </p>

                    </div>


                    {/* Mobile X */}

                    <button
                        type="button"
                        className="worker-sidebar-close"
                        onClick={onClose}
                        aria-label="Close sidebar"
                    >
                        <X size={21} />
                    </button>

                </div>


                {/* =========================
                    NAVIGATION
                ========================= */}

                <nav className="worker-sidebar-nav">

                    <p className="worker-sidebar-section-title">
                        MENU
                    </p>


                    {menuItems.map((item) => {

                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={onClose}
                                className={({ isActive }) =>
                                    `worker-sidebar-link ${
                                        isActive
                                            ? "worker-sidebar-link-active"
                                            : ""
                                    }`
                                }
                            >

                                <Icon size={19} />

                                <span>
                                    {item.name}
                                </span>

                            </NavLink>
                        );

                    })}

                </nav>


                {/* =========================
                    BOTTOM
                ========================= */}

                <div className="worker-sidebar-bottom">

                    <div className="worker-sidebar-independent">

                        <CircleDot size={17} />

                        <div>

                            <strong>
                                Independent Worker
                            </strong>

                            <span>
                                You control your work
                            </span>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="worker-sidebar-logout"
                        onClick={() => {

                            localStorage.removeItem("token");

                            window.location.href =
                                "/worker-login";

                        }}
                    >

                        <LogOut size={18} />

                        <span>
                            Logout
                        </span>

                    </button>

                </div>

            </aside>

        </>
    );
}

export default WorkerSidebar;