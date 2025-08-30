// API методы для авторизации

import axiosInstance from '../config'
import { saveTokensToStorage, clearTokensFromStorage, getTokensFromStorage, isTokenExpired } from './model'
import type {
  ISteamAuthResponse,
  ICallbackResponse,
  IRefreshTokenResponse,
  ILogoutResponse,
  IUserInfoResponse
} from './types'

// Получить URL для авторизации через Steam
export const getSteamAuthUrl = async (): Promise<ISteamAuthResponse> => {
  const response = await axiosInstance.get<ISteamAuthResponse>('/api/auth/steam')
  return response.data
}

// Обработать callback от Steam и получить токены
export const handleSteamCallback = async (params: URLSearchParams): Promise<ICallbackResponse> => {
  const response = await axiosInstance.get<ICallbackResponse>(
    `/api/auth/steam/callback?${params.toString()}`
  )

  // Сохраняем токены в localStorage при успешном ответе
  if (response.data.success && response.data.data.tokens) {
    saveTokensToStorage(response.data.data.tokens)
  }

  return response.data
}

// Обновить access token используя refresh token
export const refreshToken = async (): Promise<IRefreshTokenResponse> => {
  const tokens = getTokensFromStorage()

  if (!tokens?.refreshToken) {
    throw new Error('Refresh token не найден')
  }

  const response = await axiosInstance.post<IRefreshTokenResponse>('/api/auth/refresh', {
    refreshToken: tokens.refreshToken
  })

  // Сохраняем новые токены при успешном обновлении
  if (response.data.success && response.data.data) {
    saveTokensToStorage(response.data.data)
  }

  return response.data
}

// Выйти из системы
export const logout = async (): Promise<ILogoutResponse> => {
  try {
    const response = await axiosInstance.post<ILogoutResponse>('/api/auth/logout')

    // Очищаем токены независимо от ответа сервера
    clearTokensFromStorage()

    return response.data
  } catch (error) {
    // Очищаем токены даже при ошибке запроса
    clearTokensFromStorage()
    throw error
  }
}

// Получить информацию о текущем пользователе
export const getMe = async (): Promise<IUserInfoResponse> => {
  const response = await axiosInstance.get<IUserInfoResponse>('/api/auth/me')
  return response.data
}

// Проверить авторизован ли пользователь
export const isAuthenticated = (): boolean => {
  const tokens = getTokensFromStorage()
  return tokens !== null && !isTokenExpired(tokens.expiration)
}

// Принудительно выйти из системы (очистить токены и перенаправить)
export const forceLogout = (): void => {
  clearTokensFromStorage()

  if (typeof window !== 'undefined') {
    window.location.href = '/auth'
  }
}

// Экспорт всех методов для удобства импорта
export const authApi = {
  getSteamAuthUrl,
  handleSteamCallback,
  refreshToken,
  logout,
  getMe,
  isAuthenticated,
  forceLogout,
}

export default authApi