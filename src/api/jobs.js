import { apiRequest } from "./client";

export function createJob(jobTitles) {
  return apiRequest("/resume-jobs", {
    method: "POST",
    body: JSON.stringify({ job_titles: jobTitles }),
  });
}

export function listJobs(page = 1, limit = 20) {
  return apiRequest(`/resume-jobs?page=${page}&limit=${limit}`);
}

export function jobStatus(jobId) {
  return apiRequest(`/resume-jobs/${jobId}`);
}
