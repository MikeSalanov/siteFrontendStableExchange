
import axios, { AxiosResponse } from 'axios';
import { UsersResponse } from '../models/response/UsersResponse';


const ADMIN_API_URL = 'http://localhost:5000/admin/';


const $adminRes = axios.create({
    withCredentials: true,
    baseURL: ADMIN_API_URL
})

$adminRes.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

export default class AdminService {
  static async getUsers( ): Promise<AxiosResponse<UsersResponse[]>> {
    return $adminRes.get<UsersResponse[]>('/users');
  }
  
 
  
}
