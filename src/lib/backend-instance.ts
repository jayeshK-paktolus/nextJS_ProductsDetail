import axios from "axios";

const backendInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": process.env.BACKEND_API_KEY,
  },
  withCredentials: true,
});

export default backendInstance;
