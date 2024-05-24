import axios, { AxiosResponse } from 'axios';
import { UsersResponse } from '../models/response/UsersResponse';
import { DeleteUserResponse } from '../models/response/authService/DeleteUserResponse';
import { AUTH_API_URL } from '../http';

const $adminRes = axios.create({
  withCredentials: true,
  baseURL: AUTH_API_URL,
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
