export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://workout-generator-server.onrender.com"
    : "http://localhost:4000";
