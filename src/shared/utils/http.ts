import axios from "axios";
import { useUserStore } from "../../user";

export const http = axios.create({
    baseURL: import.meta.env.VITE_API_BACK,
})

http.interceptors.request.use(config => {
    const { token } = useUserStore.getState(); // Получаем текущий токен из Zustand
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});
