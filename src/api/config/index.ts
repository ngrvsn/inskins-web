// Импорт настроенного экземпляра Axios с интерцепторами
import axiosInstance from './axios'
import './interceptors' // Подключение интерцепторов

// Экспорт утилитарных функций для работы с токенами
export {
  getTokensFromStorage,
  saveTokensToStorage,
  clearTokensFromStorage,
  isTokenExpired,
} from './interceptors'

// Экспорт настроенного экземпляра Axios
export default axiosInstance

// Дополнительные утилитарные функции для API
export const createApiUrl = (endpoint: string): string => {
  const baseUrl = axiosInstance.defaults.baseURL
  return `${baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
}

// Функция для проверки успешности ответа API
export const isApiSuccess = (response: any): boolean => {
  return response?.success === true
}

// Функция для извлечения сообщения об ошибке из ответа API
export const getApiErrorMessage = (error: any): string => {
  if (error?.response?.data?.message) {
    return error.response.data.message
  }

  if (error?.message) {
    return error.message
  }

  return 'Произошла неизвестная ошибка'
}

// Функция для проверки авторизации пользователя
export const checkAuthStatus = (): boolean => {
  const tokens = getTokensFromStorage()
  return tokens !== null && !isTokenExpired(tokens.expiration)
}