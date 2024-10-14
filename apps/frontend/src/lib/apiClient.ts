import axios from "axios";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://websocket-chat-monorepo.onrender.com";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
