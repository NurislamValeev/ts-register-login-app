import $api from "../http"
import {AxiosResponse} from "axios"

export interface IUser {
  id: number
  username: string
  avatar: string
  about: null
  message?: string
}

export default class UserService {
  static fetchUser(): Promise<AxiosResponse<IUser>> {
    return $api.get<AxiosResponse<IUser>>('/about')
      .then(res => res.data)
  }
}