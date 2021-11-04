import $api from "../http"
import {AxiosResponse} from "axios"

interface LoginResponse {
  token: string
  error: string | null
}

interface RegisterResponse {
  message: string
}

export default class AuthService {
  static async login(username: string, password: string): Promise<AxiosResponse<LoginResponse>> {
    return $api.post<LoginResponse>('/login', {username, password})
  }

  static async register(username: string, password: string): Promise<AxiosResponse<RegisterResponse>> {
    return $api.post<RegisterResponse>('/register', {username, password})
  }
}