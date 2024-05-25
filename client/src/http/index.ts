import axios from 'axios';
import { AuthResponse } from '../models/response/authService/AuthResponse';

export const BASE_URL: string = import.meta.env.VITE_BASE_URL ?
  `${import.meta.env.VITE_BASE_URL}` :
  `http://localhost`;

export const AUTH_API_URL: string = `${
  BASE_URL.includes('localhost') ?
  `${BASE_URL}:4001` :
  `${BASE_URL}`
}/auth-service`;

export const BANK_CARDS_API_URL: string = `${
  BASE_URL.includes('localhost') ?
    `${BASE_URL}:4003` :
    `${BASE_URL}`
}/bank-cards`;

export const EXCHANGES_API_URL: string = `${
  BASE_URL.includes('localhost') ?
    `${BASE_URL}:4004` :
    `${BASE_URL}`
}/exchanges`;

const $api = axios.create({
  withCredentials: true,
  baseURL: AUTH_API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(originalRequest);

    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(
          `${AUTH_API_URL}/refresh`,
          { withCredentials: true }
        );
        localStorage.setItem('token', response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН');
      }
    }
    throw error;
  }
);

export default $api;
