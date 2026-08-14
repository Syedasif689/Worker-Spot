import {
    Menu,
    Bell,
    UserCircle,
} from "lucide-react";

function WorkerTopbar({ onMenuClick }) {

    return (
        <header className="worker-topbar">

            <div className="worker-topbar-left">

                {/* Mobile menu button */}

                <button
                    type="button"
                    className="worker-mobile-menu-button"
                    onClick={onMenuClick}
                    aria-label="Open sidebar"
                >
                    <Menu size={24} />
                </button>


                <div>

                    <h1>
                        Dashboard
                    </h1>

                    <p>
                        Manage your work and opportunities
                    </p>

                </div>

            </div>


            <div className="worker-topbar-right">

                <button className="worker-topbar-icon">
                    <Bell size={20} />
                </button>

                <div className="worker-account">

                    <UserCircle size={27} />

                    <span>
                        Worker Account
                    </span>

                </div>

            </div>

        </header>
    );
}

export default WorkerTopbar;