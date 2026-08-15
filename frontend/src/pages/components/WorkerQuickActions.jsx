import {
  UserRoundPen,
  ClipboardList,
  BriefcaseBusiness,
  Power,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./WorkerQuickActions.css";
function WorkerQuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Edit Profile",
      description: "Update your skills and details",
      icon: UserRoundPen,
      action: () => navigate("/worker-profile"),
    },
    {
      title: "View Requests",
      description: "Check customer service requests",
      icon: ClipboardList,
      action: () => navigate("/worker-dashboard/requests"),
    },
    {
      title: "Recent Jobs",
      description: "View your completed jobs",
      icon: BriefcaseBusiness,
      action: () => navigate("/worker-dashboard/jobs"),
    },
    {
      title: "Availability",
      description: "Manage your availability",
      icon: Power,
      action: () => {
        // We will connect this to the availability API later.
        console.log("Availability clicked");
      },
    },
  ];

  return (
    <section className="worker-quick-actions">

      <div className="worker-section-header">
        <div>
          <h2>Quick Actions</h2>
          <p>Manage your Worker Spot activities</p>
        </div>
      </div>

      <div className="worker-quick-actions-grid">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              type="button"
              className="worker-quick-action-card"
              onClick={action.action}
            >
              <div className="worker-quick-action-icon">
                <Icon size={21} />
              </div>

              <div className="worker-quick-action-content">
                <h3>{action.title}</h3>
                <p>{action.description}</p>
              </div>
            </button>
          );
        })}

      </div>

    </section>
  );
}

export default WorkerQuickActions;