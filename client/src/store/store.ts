import { IUser } from '../models/IUser';
import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import axios, { AxiosError } from 'axios';
import { AuthResponse } from '../models/response/AuthResponse';
import { API_URL } from '../http';

export default class Store {
  user = {} as IUser;
  isAuth = localStorage.getItem('token') !== null;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  }

  async confirmRegister(
    email: string,
    password: string,
    confirmationCode: string | null
  ) {
    try {
      const response = await AuthService.confirmRegister(
        email,
        password,
        confirmationCode
      );
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response;
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      const errorMessage = error?.response?.data.message;
      throw new Error(errorMessage);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      console.log(response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }
}
