import axios, { AxiosResponse } from 'axios';
import { WalletResponse } from '../models/response/walletService/WalletResponse';
import { AuthResponse } from '../models/response/authService/AuthResponse';
import { BASE_URL, AUTH_API_URL } from '../http';

export const $apiWallet = axios.create({
  withCredentials: true,
  baseURL: BASE_URL.includes('localhost') ? `${BASE_URL}:4000/wallet` : `${BASE_URL}:4000/wallet`
});


$apiWallet.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
});

$apiWallet.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${AUTH_API_URL}/refresh`,
              { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            return $apiWallet.request(originalRequest);
        } catch (e) {
            console.log(e)
        }
    }
    throw error;
});


export default class WalletService {
  static async getInfo(
  ): Promise<AxiosResponse<WalletResponse>> {
    return $apiWallet.get<WalletResponse>('/wallet-info');
  }
}
