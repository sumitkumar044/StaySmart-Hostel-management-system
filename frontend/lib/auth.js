// frontend/lib/auth.js

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
};

export const getUser = () => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const login = async (email, password) => {
  const res = await api("/auth/login", "POST", { email, password });
  if (res.token) {
    localStorage.setItem("token", res.token);
    localStorage.setItem("user", JSON.stringify(res.user));
    return res;
  }
  throw new Error(res.message || "Login failed");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

// lib/auth.js mein ye add karein
export const setAuth = (token, user) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  }
};