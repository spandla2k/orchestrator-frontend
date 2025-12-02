import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { jobStatus } from "../api/jobs";

export default function JobDetailPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    jobStatus(jobId).then(setJob);
  }, [jobId]);

  if (!job) return "Loading...";

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="title">Resume Job Console</div>
        <div className="header-right">
          <span className="user-email">{job.email || "user"}</span>
          <button className="logout-btn">Logout</button>
        </div>
      </header>

      {/* Main Card */}
      <div className="job-card">
        <h2>Job</h2>
        <div className={`status-badge status-${job.status}`}>{job.status}</div>

        <h3 className="section-title">Items</h3>

        {job.items.map((i) => (
          <div key={i.id} className="item-row">
            <div className="item-info">
              <div className="item-title">{i.job_title}</div>
              <span className="status-badge small status-completed">{i.status}</span>
            </div>

            <div className="item-links">
              {i.png_url && (
                <a href={i.png_url} target="_blank" className="pill-link">
                  PNG
                </a>
              )}
              {i.pdf_url && (
                <a href={i.pdf_url} target="_blank" className="pill-link">
                  PDF
                </a>
              )}
              {i.docx_url && (
                <a href={i.docx_url} target="_blank" className="pill-link">
                  DOCX
                </a>
              )}
            </div>
          </div>
        ))}

        <a href={"/item/" + job.items[0].id} className="debug-link">
          Debug View
        </a>
      </div>
    </div>
  );
}
