import $api from "../http";
import { AxiosResponse } from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";
import { RegResponse } from "../models/response/RegResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>('/signIn', {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<RegResponse>> {
        return $api.post<RegResponse>('/auth-service/signUp', {email, password})
    }

    static async logout(): Promise<void> {
        return $api.post('/signOut')
    }

}

