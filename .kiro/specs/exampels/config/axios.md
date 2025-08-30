import axios, { AxiosInstance } from 'axios'
import { API_BASE_URL } from '@/constants/api'

// Базовый API для публичных запросов (refresh токена, логин)
export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// API для авторизованных запросов (автоматически добавляет токен через интерцептор)
export const privateApi: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})