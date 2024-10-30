import axios from "axios";
import { Routes } from "../routes/CONSTANTS";

const api = axios.create({
    baseURL: 'https://proxy.tartesain.com/proxy/v1',
    withCredentials: true,
    timeout: 5000,
})
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log('error', error);
        if (error.response?.status === 401) {
            if (window.location.pathname !== Routes.LOGIN) {
                window.location.href = Routes.LOGIN;
                sessionStorage.clear();
            }
        }
        return Promise.reject(error)
    });

export default api;