import {
    ClipboardList,
    Briefcase,
    CheckCircle,
    Wallet,
} from "lucide-react";

function WorkerStats() {

    const stats = [
        {
            title: "Service Requests",
            value: "0",
            description: "New requests",
            icon: ClipboardList,
        },
        {
            title: "Active Jobs",
            value: "0",
            description: "Currently working",
            icon: Briefcase,
        },
        {
            title: "Completed Jobs",
            value: "0",
            description: "Jobs completed",
            icon: CheckCircle,
        },
        {
            title: "Total Earnings",
            value: "₹0",
            description: "Your earnings",
            icon: Wallet,
        },
    ];

    return (
        <section className="worker-stats">

            {stats.map((stat) => {

                const Icon = stat.icon;

                return (
                    <div
                        className="worker-stat-card"
                        key={stat.title}
                    >

                        <div className="worker-stat-top">

                            <div className="worker-stat-icon">
                                <Icon size={21} />
                            </div>

                        </div>

                        <div className="worker-stat-info">

                            <span className="worker-stat-title">
                                {stat.title}
                            </span>

                            <strong className="worker-stat-value">
                                {stat.value}
                            </strong>

                            <span className="worker-stat-description">
                                {stat.description}
                            </span>

                        </div>

                    </div>
                );
            })}

        </section>
    );
}

export default WorkerStats;