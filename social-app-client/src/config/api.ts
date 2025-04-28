import axios from 'axios';
export const BASE_URL="http://localhost:8080"

export const api = axios.create({
	baseURL: BASE_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwt");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});