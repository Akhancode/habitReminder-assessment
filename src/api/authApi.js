
import axios from 'axios';

const API_URL = 'http://localhost:9000/auth'; // Replace with your API URL

export const register = async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data; // Handle response as needed
};

export const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`, userData);
    localStorage.setItem('accessToken', response.data.accessToken);
    return response.data; // Handle response as needed
};

export const logout = async () => {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
};
