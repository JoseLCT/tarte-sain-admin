import axios from "axios";

const api = axios.create({
    baseURL: 'https://tartesain.com/api/v1',
    timeout: 5000,
});
api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;