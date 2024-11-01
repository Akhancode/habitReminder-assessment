// api.js
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const api = axios.create({
    baseURL: 'http://localhost:9000/api', // Replace with your API URL
});

// Add a response interceptor
api.interceptors.response.use(
    response => response,
    error => {
        const { status } = error.response;

        // Check if the error is due to an invalid token
        if (status === 401) {
            localStorage.removeItem('accessToken');

            const navigate = useNavigate(); 
            navigate('/login', { replace: true });
        }

        return Promise.reject(error); 
    }
);

export default api;
