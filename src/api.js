import axios from 'axios';

// This is the base URL of our server
const API_URL = 'https://ai-snippet-backend.vercel.app/api';

// Create a new instance of axios
const api = axios.create({
  baseURL: API_URL,
});

// --- Axios Request Interceptor ---
// This function will run *before* every single API request
api.interceptors.request.use(
  (config) => {
    // 1. Get the token from localStorage
    const token = localStorage.getItem('token');
    
    // 2. If the token exists, add it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // 3. Return the modified config
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

export default api;
