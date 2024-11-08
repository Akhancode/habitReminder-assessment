// api.js
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASEURLAZURE } from "../utils/helper";


const api = axios.create({
  // baseURL: "http://localhost:9000/api", // Replace with your API URL
  baseURL: `${BASEURLAZURE}/api`, // Replace with your API URL
});

api.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;

    // Check if the error is due to an invalid token
    if (status === 401 || status == 400) {
      localStorage.removeItem("accessToken");

      const navigate = useNavigate();
      navigate("/login", { replace: true });
    }

    return Promise.reject(error);
  }
);
export const createHabit = async (data) => {
  const response = await api.post(`/habit`, data);
  return response.data; // Handle response as needed
};
export const updateHabit = async (data) => {
  const response = await api.put(`/habit/${data._id}`, data);
  return response.data; // Handle response as needed
};
export const getHabitById = async (habitId) => {
  const response = await api.get(`/habit/${habitId}`);
  return response.data; // Handle response as needed
};
export const completeById = async (habitId) => {
  const response = await api.post(`/streak/complete`, {
    habitId,
  });
  return response.data; // Handle response as needed
};
export const completeByIdWIthCustomDate = async (habitId,createdAt) => {
  const response = await api.post(`/streak/complete`, {
    habitId,createdAt
  });
  return response.data; // Handle response as needed
};
export const getHabits = async () => {
  const response = await api.get('/habit');
  return response.data; // Handle response as needed
};
export const getProgress = async () => {
  const response = await api.get('/progress');
  return response.data; // Handle response as needed
};
export const getProgressByHabit = async (habitId) => {
  const response = await api.get(`/progress/${habitId}`);
  return response.data; // Handle response as needed
};
export const getHistories = async () => {
  const response = await api.get('/history/withHabit');
  return response.data; // Handle response as needed
};

export default api;
