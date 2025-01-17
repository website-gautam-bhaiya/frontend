import axios from 'axios';

// Create an instance of axios with default settings
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1',
    withCredentials: true, // Allow cookies to be sent
});

// Request interceptor (optional, e.g., add Authorization headers)
api.interceptors.request.use(
    (config) => {
        // Add any custom headers if needed
        const token = localStorage.getItem('authToken'); // Example: Fetch token from localStorage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor (optional, handle errors globally)
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data?.message || 'An error occurred.';
        return Promise.reject(new Error(message));
    }
);

export default api;
