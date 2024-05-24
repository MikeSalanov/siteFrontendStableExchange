import $api, { BASE_URL } from '../http';
import { AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/authService/AuthResponse';
import { RegResponse } from '../models/response/authService/RegResponse';

export default class AuthService {
  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    console.log(BASE_URL);
    return $api.post<AuthResponse>('/signIn', { email, password });
  }
  
  static async confirmRegister(email: string, password: string, confirmationCode: string | null): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/confirm-registration', { email, password, confirmationCode })
  }
  
  static async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<RegResponse>> {
    return $api.post<RegResponse>('/signUp', {
      email,
      password,
    });
  }

  static async logout(): Promise<void> {
    return $api.post('/signOut');
  }
}
