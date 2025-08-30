import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import { IRefreshTokenResponse } from '../auth/types'
import { api, privateApi } from './axios'

interface CustomInternalAxiosRequestConfig<D = unknown> extends InternalAxiosRequestConfig<D> {
  _isRetry?: boolean
}

interface FailedRequest {
  resolve: (token: string) => void
  reject: (error: unknown) => void
}

let isRefreshing = false
let failedQueue: FailedRequest[] = []

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token!)
    }
  })
  failedQueue = []
}

// Request interceptor для добавления токена
const requestInterceptor = (config: InternalAxiosRequestConfig<unknown>): InternalAxiosRequestConfig<unknown> => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
}

// Response interceptor для обработки ошибок и refresh токена
const responseInterceptor = (apiInstance: AxiosInstance) => async (error: AxiosError) => {
  const originalRequest = error.config as CustomInternalAxiosRequestConfig

  if (!originalRequest) {
    return Promise.reject(error)
  }

  // При 403 - разлогиниваем пользователя
  if (error.response?.status === 403) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    window.location.href = '/auth'
    return Promise.reject(error)
  }

  // При 401 - пытаемся обновить токен
  if (error.response?.status === 401 && !originalRequest._isRetry) {

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })
        .then((token) => {
          originalRequest.headers.set('Authorization', `Bearer ${token}`)
          return apiInstance.request(originalRequest)
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    }

    originalRequest._isRetry = true
    isRefreshing = true

    try {
      const refreshToken = localStorage.getItem('refresh_token')

      if (!refreshToken) {
        throw new Error('No refresh token')
      }

      const response = await api.post<IRefreshTokenResponse>('/api/auth/refresh', {
        refresh_token: refreshToken
      })

      if (response.data.success && response.data.data?.accessToken) {
        const newToken = response.data.data.accessToken
        localStorage.setItem('access_token', newToken)

        if (response.data.data.refreshToken) {
          localStorage.setItem('refresh_token', response.data.data.refreshToken)
        }

        processQueue(null, newToken)
        originalRequest.headers.set('Authorization', `Bearer ${newToken}`)
        return apiInstance.request(originalRequest)
      } else {
        throw new Error('Failed to refresh token')
      }
    } catch (err: unknown) {
      processQueue(err as AxiosError, null)
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      window.location.href = '/auth'
      return Promise.reject(err)
    } finally {
      isRefreshing = false
    }
  }

  return Promise.reject(error)
}

// Применяем интерцепторы
privateApi.interceptors.request.use(requestInterceptor)
privateApi.interceptors.response.use(
  (response) => response,
  responseInterceptor(privateApi)
)