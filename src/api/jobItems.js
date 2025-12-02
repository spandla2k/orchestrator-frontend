import { apiRequest } from "./client";

export function getJobItem(itemId) {
  return apiRequest(`/job-items/${itemId}`);
}
