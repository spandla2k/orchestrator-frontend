import { useEffect, useState } from "react";
import { createJob, listJobs } from "../api/jobs";

export default function JobsPage() {
  const [jobTitles, setJobTitles] = useState("");
  const [jobs, setJobs] = useState([]);

  const loadJobs = () => {
    listJobs().then((res) => setJobs(res));
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const submit = async () => {
    const arr = jobTitles
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    await createJob(arr);
    setJobTitles("");
    loadJobs();
  };

  return (
    <div>
      <h2>Your Jobs</h2>

      <textarea rows={4} placeholder="Enter job titles, one per line" value={jobTitles} onChange={(e) => setJobTitles(e.target.value)} />
      <br />
      <button onClick={submit}>Create Job</button>

      <h3>Existing Jobs</h3>
      <ul>
        {jobs.map((job) => (
          <li key={job.job_id}>
            <a href={`/jobs/${job.job_id}`}>
              {job.job_id} — {job.status}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
