import { useState } from "react";
import {
  ClipboardList,
  Clock,
  CheckCircle,
  XCircle,
  MapPin,
  User,
} from "lucide-react";
import "./WorkerRequests.css";

function WorkerRequests() {
  const [requests] = useState([]);

  return (
    <section className="worker-requests">

      {/* Header */}
      <div className="worker-section-header">
        <div>
          <h2>Service Requests</h2>
          <p>Customer requests for your services</p>
        </div>

        <div className="worker-request-count">
          <ClipboardList size={18} />
          <span>{requests.length}</span>
        </div>
      </div>

      {/* Requests */}
      {requests.length === 0 ? (

        <div className="worker-requests-empty">

          <div className="worker-empty-icon">
            <ClipboardList size={32} />
          </div>

          <h3>No service requests yet</h3>

          <p>
            When customers request your services,
            their requests will appear here.
          </p>

        </div>

      ) : (

        <div className="worker-request-list">

          {requests.map((request) => (

            <div
              className="worker-request-card"
              key={request.id}
            >

              {/* Customer */}
              <div className="worker-request-customer">

                <div className="worker-request-avatar">
                  <User size={20} />
                </div>

                <div>
                  <h3>{request.customerName}</h3>

                  <p>
                    {request.service}
                  </p>
                </div>

              </div>

              {/* Location */}
              <div className="worker-request-location">

                <MapPin size={17} />

                <span>
                  {request.location}
                </span>

              </div>

              {/* Time */}
              <div className="worker-request-time">

                <Clock size={17} />

                <span>
                  {request.time}
                </span>

              </div>

              {/* Actions */}
              <div className="worker-request-actions">

                <button
                  className="worker-request-accept"
                  type="button"
                >
                  <CheckCircle size={17} />
                  Accept
                </button>

                <button
                  className="worker-request-reject"
                  type="button"
                >
                  <XCircle size={17} />
                  Reject
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

export default WorkerRequests;