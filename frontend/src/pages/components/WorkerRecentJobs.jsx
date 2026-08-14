import {
  BriefcaseBusiness,
  CalendarDays,
  MapPin,
  CheckCircle2,
} from "lucide-react";

function WorkerRecentJobs() {
  const jobs = [];

  return (
    <section className="worker-recent-jobs">

      {/* Header */}
      <div className="worker-section-header">
        <div>
          <h2>Recent Jobs</h2>
          <p>Your latest completed and ongoing jobs</p>
        </div>
      </div>

      {/* Empty State */}
      {jobs.length === 0 ? (
        <div className="worker-recent-jobs-empty">

          <div className="worker-empty-icon">
            <BriefcaseBusiness size={32} />
          </div>

          <h3>No jobs yet</h3>

          <p>
            Your accepted and completed jobs will appear here.
          </p>

        </div>
      ) : (

        /* Job List */
        <div className="worker-recent-jobs-list">

          {jobs.map((job) => (

            <div
              className="worker-recent-job-card"
              key={job.id}
            >

              {/* Job Icon */}
              <div className="worker-recent-job-icon">
                <BriefcaseBusiness size={21} />
              </div>

              {/* Job Information */}
              <div className="worker-recent-job-info">

                <h3>{job.service}</h3>

                <p>
                  Customer: {job.customerName}
                </p>

                <div className="worker-recent-job-details">

                  <span>
                    <MapPin size={15} />
                    {job.location}
                  </span>

                  <span>
                    <CalendarDays size={15} />
                    {job.date}
                  </span>

                </div>

              </div>

              {/* Status */}
              <div className="worker-recent-job-status">

                <CheckCircle2 size={16} />

                <span>{job.status}</span>

              </div>

            </div>

          ))}

        </div>
      )}

    </section>
  );
}

export default WorkerRecentJobs;