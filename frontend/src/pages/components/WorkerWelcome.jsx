import {
    Sparkles,
    ArrowRight,
} from "lucide-react";

function WorkerWelcome() {

    return (
        <section className="worker-welcome">

            <div className="worker-welcome-content">

                <div className="worker-welcome-badge">
                    <Sparkles size={15} />
                    Worker Spot
                </div>

                <h2>
                    Welcome back, Worker 👋
                </h2>

                <p>
                    Manage your services, respond to customers
                    and discover new opportunities in your area.
                </p>

            </div>


            <button
                type="button"
                className="worker-welcome-action"
            >
                View Requests
                <ArrowRight size={17} />
            </button>

        </section>
    );
}

export default WorkerWelcome;