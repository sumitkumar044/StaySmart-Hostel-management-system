// client/lib/imageUrl.js
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
export const imageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${BASE_URL}${path}`;
};