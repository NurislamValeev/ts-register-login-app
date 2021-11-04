import UserService, {IUser} from "../services/UserService"
import {makeAutoObservable} from "mobx"
import AuthService from "../services/AuthService"
import {AxiosError} from "axios"
import {History} from "history"

export default class Store {
  user: Partial<IUser> = {}
  isAuth: boolean = false
  isLoading: boolean = false
  error: null | string = null

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean) {
    this.isAuth = bool
  }

  setUser(user: IUser) {
    this.user = user
  }

  setLoading(bool: boolean) {
    this.isLoading = bool
  }

  setError(value: null | string) {
    this.error = value
  }

  isAxiosError(something: any): something is AxiosError {
    return something.isAxiosError === true
  }

  fetchUserData() {
    this.setLoading(true)
    return UserService.fetchUser()
      .then(({data}) => this.setUser(data))
      .catch(err => {
        if (this.isAxiosError(err)) {
          this.setError(err.response?.data?.error)
        }
      })
      .finally(() => this.setLoading(false))
  }

  login(username: string, password: string, history: History) {
   return AuthService.login(username, password)
      .then(res => {
        localStorage.setItem('token', res.data.token)
        this.setAuth(true)
        history.push("/")
      })
      .catch(err => {
        if (this.isAxiosError(err)) {
          this.setError(err.response?.data?.error)
        }
      })
  }

  register(username: string, password: string, history: History) {
   return AuthService.register(username, password)
      .then(() => {
        this.setAuth(true)
        history.push("/login")
      })
      .catch(err => {
        if (this.isAxiosError(err)) {
          this.setError(err.response?.data?.error)
        }
      })
  }

  logout() {
    try {
      localStorage.removeItem('token')
      this.setAuth(false)
    } catch (err) {
      if (this.isAxiosError(err)) {
        this.setError(err.response?.data?.error)
      }
    }
  }
}