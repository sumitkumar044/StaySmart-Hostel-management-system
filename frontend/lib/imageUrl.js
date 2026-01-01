// client/lib/imageUrl.js
export const imageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `http://localhost:5000${path}`;
};