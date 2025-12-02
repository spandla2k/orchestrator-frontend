// const API_BASE = "http://localhost:8000"; // CHANGE TO PRODUCTION URL

// const API_BASE = "https://mrs-api.politedune-9da4c3d6.westus3.azurecontainerapps.io";
const API_BASE = "/api";

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("accessToken");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(API_BASE + path, { ...options, headers });

  if (res.status === 401) {
    localStorage.clear();
    window.location.href = "/login";
    return;
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || "Request failed");
  }

  return res.json();
}
