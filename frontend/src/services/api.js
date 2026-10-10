import axios from "axios";

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api"
).replace(/\/$/, "");

export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

export function getMediaUrl(value) {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `${API_ORIGIN}${value.startsWith("/") ? "" : "/"}${value}`;
}

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12000,
  headers: { Accept: "application/json" },
});

export const api = {
  getProfile: () => client.get("/profile/"),
  getTechnologies: () => client.get("/technologies/"),
  getExperiences: () => client.get("/experiences/"),
  getProjects: () => client.get("/projects/"),
  sendContactMessage: (formData) => client.post("/contact/", formData),
};