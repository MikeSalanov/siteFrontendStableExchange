import axios, { AxiosResponse } from 'axios';
import { DeleteUserResponse } from '../models/response/authService/DeleteUserResponse';
import { AuthResponse } from '../models/response/authService/AuthResponse';
import { AUTH_API_URL } from '../http';

const USER_API_URL = `${AUTH_API_URL}/user`;

const $user_Res = axios.create({
  withCredentials: true,
  baseURL: USER_API_URL,
});

$user_Res.interceptors.request.use((config) => {
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

export default class UserService {

  static async delUser(): Promise<AxiosResponse<DeleteUserResponse>> {
    return $user_Res.delete<DeleteUserResponse>('/user');
  }
}
