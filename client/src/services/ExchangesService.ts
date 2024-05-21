import axios, { AxiosResponse } from 'axios';
import { ExchangesResponse } from '../models/response/exchangesService/ExchangesResponse';
import {AuthResponse} from "../models/response/authService/AuthResponse";

// export const API_URL_EXCHANGES = `http://5.35.80.205:4000/exchanges-service`

// export const API_URL_AUTH = `http://5.35.80.205:4001/auth-service`

export const $apiExchanges = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_EXCHANGES_BASE_URL
})


$apiExchanges.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$apiExchanges.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${import.meta.env.VITE_AUTH_BASE_URL}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            return $apiExchanges.request(originalRequest);
        } catch (e) {
            console.log(e)
        }
    }
    throw error;
})


export default class ExchangesService {
  static async getExchanges(
  ): Promise<AxiosResponse<ExchangesResponse>> {
    return $apiExchanges.get<ExchangesResponse>('/exchanges');
  }
}