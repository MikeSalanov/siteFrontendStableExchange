import { IUser } from '../models/IUser';
import { makeAutoObservable } from 'mobx';
import AuthService from '../services/AuthService';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { AuthResponse } from '../models/response/authService/AuthResponse.ts';
import { AUTH_API_URL } from '../http';
import { RegResponse } from '../models/response/authService/RegResponse.ts';
import AdminService from '../services/AdminService.ts';
import UserService from '../services/UserServices.ts';
import CardFormType from "../../classes/CardFormType.ts";
import UserCardsService from '../services/UserCardsService.ts';
import { UserCardsResponse } from '../models/response/userCardsService/UserCardsResponse.ts';

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;
  email = this.user.email;
  priceFrom = 0;
  priceTo = 0;
  currAmount = 0;
  activeTabOfCardForm = CardFormType.WORLD;
  userCards : UserCardsResponse = [];
  

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
  setEmail(email: string) {
    this.email = email;
  }

  setPriceFrom(price: number) {
    this.priceFrom = price;
  }
  
  setPriceTo(price: number) {
    this.priceTo = price;
  }

  setCurrAmount(amount: number) {
    this.currAmount = amount;
  }
  
  setActiveTab(cardFormType: CardFormType) {
    this.activeTabOfCardForm = cardFormType ;
  }
  
  async setUserCards() {
    try {
      const response = await UserCardsService.getUserCards()
      console.log(response.data);
      this.userCards = response.data
      console.log(this.userCards.slice());
      return response
    
    } catch (error) {
      console.log(error);
    }
  }

  async createRuCard(card_number: string, expiry_date: string, cvc_cvv: string) {
    try {
      const response = await UserCardsService.createRuCard(card_number, expiry_date, cvc_cvv)
      console.log(response.data); 
    } catch (error) {
      console.log(error);
    }
  }

  async createWorldCard(payment_method_id: string) {
    try {
      const response = await UserCardsService.createWorldCard(payment_method_id)
      console.log(response.data); 
    } catch (error) {
      console.log(error);
    }
  }


  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setEmail(response.data.user.email);
    } catch (e) {
      console.log(e);
    }
  }

  async registration(
    email: string,
    password: string
  ): Promise<AxiosResponse<RegResponse>> {
    try {
      const response = await AuthService.registration(email, password);
      return response;
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      const errorMessage = error?.response?.data.message;
      throw new Error(errorMessage);
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
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setEmail(response.data.user.email);
      return response;
    } catch (e) {
      const error = e as AxiosError<{ message: string }>;
      const errorMessage = error?.response?.data.message;
      throw new Error(errorMessage);
    }
  }

  async logout() {
    try {
      localStorage.removeItem('token');
      await AuthService.logout();
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(
        `${AUTH_API_URL}/refresh`,
        { withCredentials: true }
      );

      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setEmail(response.data.user.email);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

  async getUsers() {
    try {
      const response = await AdminService.getUsers();
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  async adminDeleteUser(id: string) {
    try {
      const response = await AdminService.delUser(id);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteUser() {
    try {
      const response = await UserService.delUser();
      console.log(response);
      if (response.status === 200) {
        await this.logout();
        return true;
      } else {
        console.log('Не удалось выполнить удаление пользователя');
      }
    } catch (e) {
      console.log(e);
    }
  }

  async changePasswordUser({
    oldPassword,
    newPassword,
  }: {
    oldPassword: string;
    newPassword: string;
  }) {
    try {
      const response = await UserService.changePassword({
        oldPassword,
        newPassword,
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }
}
