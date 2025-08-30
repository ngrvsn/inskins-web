import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'
import axiosInstance from './axios'

// Интерфейсы для токенов
interface ITokens {
  accessToken: string
  refreshToken: string
  expiration: number
  tokenType: string
}

interface IRefreshTokenResponse {
  success: boolean
  data: {
    accessToken: string
    refreshToken: string
    expiration: number
    tokenType: string
  }
  message: string
  timestamp: string
  requestId: string
}

// Утилитарные функции для работы с токенами
const getTokensFromStorage = (): ITokens | null => {
  try {
    const tokens = localStorage.getItem('auth_tokens')
    return tokens ? JSON.parse(tokens) : null
  } catch {
    return null
  }
}

const saveTokensToStorage = (tokens: ITokens): void => {
  try {
    localStorage.setItem('auth_tokens', JSON.stringify(tokens))
  } catch (error) {
    console.error('Ошибка сохранения токенов:', error)
  }
}

const clearTokensFromStorage = (): void => {
  try {
    localStorage.removeItem('auth_tokens')
  } catch (error) {
    console.error('Ошибка очистки токенов:', error)
  }
}

const isTokenExpired = (expiration: number): boolean => {
  return Date.now() >= expiration * 1000
}

// Request interceptor - автоматическое добавление Authorization header
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const tokens = getTokensFromStorage()

    if (tokens && !isTokenExpired(tokens.expiration)) {
      config.headers = config.headers || {}
      config.headers.Authorization = `${tokens.tokenType} ${tokens.accessToken}`
    } else if (tokens) {
      // Если токен истек, очищаем его из storage
      clearTokensFromStorage()
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor - обработка 401 ошибок и автообновление токенов
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

    // Обработка 401 ошибки - попытка обновить токен
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const tokens = getTokensFromStorage()

      if (tokens?.refreshToken) {
        try {
          // Попытка обновить токен
          const refreshResponse = await axios.post<IRefreshTokenResponse>(
            `${axiosInstance.defaults.baseURL}/api/auth/refresh`,
            { refreshToken: tokens.refreshToken },
            { headers: { 'Content-Type': 'application/json' } }
          )

          if (refreshResponse.data.success) {
            const newTokens: ITokens = {
              accessToken: refreshResponse.data.data.accessToken,
              refreshToken: refreshResponse.data.data.refreshToken,
              expiration: refreshResponse.data.data.expiration,
              tokenType: refreshResponse.data.data.tokenType,
            }

            // Сохранить новые токены
            saveTokensToStorage(newTokens)

            // Обновить заголовок Authorization для повторного запроса
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `${newTokens.tokenType} ${newTokens.accessToken}`
            }

            // Повторить оригинальный запрос с новым токеном
            return axiosInstance(originalRequest)
          }
        } catch (refreshError) {
          console.error('Ошибка обновления токена:', refreshError)

          // Очистить некорректные токены
          clearTokensFromStorage()

          // Перенаправить на страницу авторизации только если не находимся уже на ней
          if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/auth')) {
            window.location.href = '/auth'
          }

          return Promise.reject(refreshError)
        }
      }

      // Если нет refresh токена, очистить storage и перенаправить
      clearTokensFromStorage()

      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/auth')) {
        window.location.href = '/auth'
      }
    }

    // Обработка 403 ошибки - перенаправление на авторизацию
    if (error.response?.status === 403) {
      clearTokensFromStorage()

      if (typeof window !== 'undefined' && !window.location.pathname.startsWith('/auth')) {
        window.location.href = '/auth'
      }
    }

    // Логирование ошибок для отладки
    console.error('API Error:', {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
      method: error.config?.method,
    })

    return Promise.reject(error)
  }
)

export { getTokensFromStorage, saveTokensToStorage, clearTokensFromStorage, isTokenExpired }