import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, // for cookies (auth tokens)
});

// AUTH
export const loginAdmin = (data: { email: string; password: string }) =>
  api.post("/auth/login", data);

export const signupAdmin = (data: { email: string; password: string; name?: string }) =>
  api.post("/auth/signup", data);

// EVENTS
export const createEvent = (data: any) => api.post("/events", data);
export const getEvents = () => api.get("/events");
export const getEventRegistrations = (eventId: string) =>
  api.get(`/events/${eventId}/registrations`);
export const getEventQr = (eventId: string) =>
  api.get(`/events/${eventId}/qrcode`, { responseType: "blob" });

// STUDENT REGISTRATION
export const registerStudent = (data: any) => api.post("/register", data);

// LEADS + NOTIFICATIONS
export const exportLeadsCSV = () => api.get("/leads.csv");
export const sendNotification = (data: { eventId: string; message: string }) =>
  api.post("/notify", data);

// DASHBOARD ANALYTICS
export const getDashboardAnalytics = () => api.get("/analytics");

export default api;
