import axios from 'axios';
import { useAuthStore } from '@/app/features/auth/stores/authStore';

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const { token, tokenType } = useAuthStore.getState();

    if (token) {
        config.headers.Authorization = `${tokenType ?? 'Bearer'} ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);