import axios from "axios";

import { auth } from "@/auth";

const backendInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
    "X-Api-Key": process.env.BACKEND_API_KEY,
  },
  withCredentials: true,
});

backendInstance.interceptors.request.use(async (config) => {
  const session = await auth();

  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  return config;
});

export default backendInstance;
