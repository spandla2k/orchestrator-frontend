import { apiRequest } from "./client";

export function getJobItem(itemId) {
  return apiRequest(`/api/job-items/${itemId}`);
}
