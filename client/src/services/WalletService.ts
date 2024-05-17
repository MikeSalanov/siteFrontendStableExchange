import axios, { AxiosResponse } from 'axios';
import { WalletResponse } from '../models/response/walletService/WalletResponse';
import {AuthResponse} from "../models/response/authService/AuthResponse";

export const API_URL_WALLET = `http://5.35.80.205:4000/wallet`

export const API_URL_AUTH = `http://5.35.80.205:4001/auth-service`

export const $apiWallet = axios.create({
    withCredentials: true,
    baseURL: API_URL_WALLET
})


$apiWallet.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$apiWallet.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL_AUTH}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            return $apiWallet.request(originalRequest);
        } catch (e) {
            console.log(e)
        }
    }
    throw error;
})


export default class WalletService {
  static async getInfo(
  ): Promise<AxiosResponse<WalletResponse>> {
    return $apiWallet.get<WalletResponse>('/wallet-info');
  }
}