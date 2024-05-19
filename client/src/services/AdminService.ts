import axios, { AxiosResponse } from 'axios';
import { UsersResponse } from '../models/response/UsersResponse';
import { DeleteUserResponse } from '../models/response/authService/DeleteUserResponse';

const ADMIN_API_URL = 'http://localhost:4001/auth-service';

const $adminRes = axios.create({
  withCredentials: true,
  baseURL: ADMIN_API_URL,
});

$adminRes.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default class AdminService {
  static async getUsers(): Promise<AxiosResponse<UsersResponse[]>> {
    return $adminRes.get<UsersResponse[]>('/users');
  }

  static async delUser(id: string): Promise<AxiosResponse<DeleteUserResponse>> {
    return $adminRes.delete<DeleteUserResponse>('/users', { data: { id } });
  }
}
