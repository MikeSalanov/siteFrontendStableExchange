import axios, { AxiosResponse } from 'axios';
// import { WalletResponse } from '../models/response/walletService/WalletResponse';
import { AuthResponse } from '../models/response/authService/AuthResponse';
import { BASE_URL, AUTH_API_URL } from '../http';
import { UserCardsResponse } from '../models/response/userCardsService/UserCardsResponse';

export const $apiUserCards = axios.create({
  withCredentials: true,
  baseURL: BASE_URL.includes('localhost') ? `${BASE_URL}:4003/bank-cards` : `${BASE_URL}/bank-cards`
});


$apiUserCards.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
});

$apiUserCards.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${AUTH_API_URL}/refresh`,
              { withCredentials: true });
            localStorage.setItem('token', response.data.accessToken);
            return $apiUserCards.request(originalRequest);
        } catch (e) {
            console.log(e)
        }
    }
    throw error;
});


export default class UserCardsService {
  static async getUserCards(
  ): Promise<AxiosResponse<UserCardsResponse>> {
    return $apiUserCards.get<UserCardsResponse>('/');
  }


  static async createRuCard(card_number: string, expiry_date: string, cvc_cvv: string):  Promise<AxiosResponse> {
    return $apiUserCards.post('/ru', {
      card_number,
      expiry_date,
      cvc_cvv
    });
  }

  static async createWorldCard(payment_method_id: string):  Promise<AxiosResponse> {
    return $apiUserCards.post('/world', {
      payment_method_id
    });
  }
  
}
