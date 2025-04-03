import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  // You can add other default configurations here
});

export default axiosInstance;