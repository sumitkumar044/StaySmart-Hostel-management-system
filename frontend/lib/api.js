// client/lib/api.js
"use client";

export const api = async (url, method = "GET", data = null, multipart = false) => {
  const token = localStorage.getItem("token");

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

  const res = await fetch(`https://staysmart-hostel-management-system.onrender.com/api${url}`, config);

  // yahan pe hi error ko handle karenge
  let json;
  try {
    json = await res.json();
  } catch {
    json = null;
  }

  if (!res.ok) {
    const msg = json?.message || `HTTP ${res.status}`;
    // throw Error with message
    throw new Error(msg);
  }

  return json;
};
