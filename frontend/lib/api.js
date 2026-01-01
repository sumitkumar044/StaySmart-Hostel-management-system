// client/lib/api.js
"use client";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000"; // local backend URL

export const api = async (url, method = "GET", data = null, multipart = false) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const config = {
    method,
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  if (data) {
    if (multipart) {
      config.body = data; // FormData
    } else {
      config.headers["Content-Type"] = "application/json";
      config.body = JSON.stringify(data);
    }
  }

  const res = await fetch(`${BASE_URL}/api${url}`, config);

  let json;
  try {
    json = await res.json();
  } catch {
    json = null;
  }

  if (!res.ok) {
    const msg = json?.message || `HTTP ${res.status}`;
    throw new Error(msg);
  }

  return json;
};
