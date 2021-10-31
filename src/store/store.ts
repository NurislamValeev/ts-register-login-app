import UserService, {IUser} from "../services/UserService"
import {makeAutoObservable} from "mobx"
import AuthService from "../services/AuthService"
import {AxiosError} from "axios"
import {History} from "history"

export default class Store {
  user = {} as IUser
  isAuth = false
  isLoading = false
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

  async fetchUserData() {
    this.setLoading(true)
    try {
      const response = await UserService.fetchUser()
      this.setUser(response.data)
    } catch (err) {
      if (this.isAxiosError(err)) {
        this.setError(err.response?.data?.error)
      }
    } finally {
      this.setLoading(false)
    }
  }

  async login(username: string, password: string, history: History) {
    try {
      const response = await AuthService.login(username, password)
      localStorage.setItem('token', response.data.token)
      this.setAuth(true)
      this.setError(null)
      history.push("/")
    } catch (err) {
      if (this.isAxiosError(err)) {
        this.setError(err.response?.data?.error)
      }
    }
  }

  async register(username: string, password: string, history: History) {
    try {
      await AuthService.register(username, password)
      this.setAuth(true)
      this.setError(null)
      history.push("/login")
    } catch (err) {
      if (this.isAxiosError(err)) {
        this.setError(err.response?.data?.error)
      }
    }
  }

  async logout() {
    try {
      localStorage.removeItem('token')
      this.setAuth(false)
      this.setError(null)
    } catch (err) {
      if (this.isAxiosError(err)) {
        this.setError(err.response?.data?.error)
      }
    }
  }
}