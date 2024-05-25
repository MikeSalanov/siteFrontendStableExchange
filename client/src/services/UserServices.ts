import axios, { AxiosResponse } from 'axios';
import { DeleteUserResponse } from '../models/response/authService/DeleteUserResponse';
import { AuthResponse } from '../models/response/authService/AuthResponse';
import { AUTH_API_URL, BANK_CARDS_API_URL } from '../http';
import { ChangePasswordUserResponse } from '../models/response/authService/ChangePasswordUserResponse';

const USER_API_URL: string = `${AUTH_API_URL}/user`;

const $user_Res = axios.create({
  withCredentials: true,
  baseURL: USER_API_URL,
});

const $user_BankCards = axios.create({
  withCredentials: true,
  baseURL: BANK_CARDS_API_URL
})

$user_Res.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$user_BankCards.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$user_Res.interceptors.response.use(
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
        return $user_Res.request(originalRequest);
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН');
      }
    }
    throw error;
  }
);

$user_BankCards.interceptors.response.use(
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
        return $user_Res.request(originalRequest);
      } catch (e) {
        console.log('НЕ АВТОРИЗОВАН');
      }
    }
    throw error;
  }
);

export default class UserService {
  static async delUser(): Promise<AxiosResponse<DeleteUserResponse>> {
    return $user_Res.delete<DeleteUserResponse>('/');
  }
  
  static async toGetUserCards(): Promise<AxiosResponse<Array<{
    card_number: string,
    expiry_date: string
  }>>> {
    return $user_BankCards.get<Array<{
      card_number: string,
      expiry_date: string
    }>>('/');
  }

  static async changePassword({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }): Promise<AxiosResponse<ChangePasswordUserResponse>> {
    return $user_Res.patch<ChangePasswordUserResponse>('/', {
      newPassword,
      oldPassword,
    });
  }
}
