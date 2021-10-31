import $api from "../http"
import {AxiosResponse} from "axios"

interface AuthResponse {
  token: string
  error: string | null
  message?: string
}

export default class AuthService {
  static async login(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/login', {username, password})
  }

  static async register(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post<AuthResponse>('/register', {username, password})
  }
}