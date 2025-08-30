// API методы для авторизации

import { api, privateApi } from '../config'
import type {
  ISteamAuthResponse,
  ICallbackResponse,
  IRefreshTokenResponse,
  ILogoutResponse,
  IUserInfoResponse
} from './types'

// Сохранить токены в localStorage
export const saveTokensToStorage = (accessToken: string, refreshToken?: string): void => {
  try {
    localStorage.setItem('access_token', accessToken)
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken)
    }
  } catch (error) {
    console.error('Ошибка сохранения токенов:', error)
  }
}

// Получить access токен из localStorage
export const getAccessToken = (): string | null => {
  try {
    return localStorage.getItem('access_token')
  } catch {
    return null
  }
}

// Получить refresh токен из localStorage
export const getRefreshToken = (): string | null => {
  try {
    return localStorage.getItem('refresh_token')
  } catch {
    return null
  }
}

// Очистить токены из localStorage
export const clearTokensFromStorage = (): void => {
  try {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  } catch (error) {
    console.error('Ошибка очистки токенов:', error)
  }
}

// Получить URL для авторизации через Steam
export const getSteamAuthUrl = async (): Promise<ISteamAuthResponse> => {
  const response = await api.get<ISteamAuthResponse>('/api/auth/steam')
  return response.data
}

// Обработать callback от Steam и получить токены
export const handleSteamCallback = async (params: URLSearchParams): Promise<ICallbackResponse> => {
  const response = await api.get<ICallbackResponse>(
    `/api/auth/steam/callback?${params.toString()}`
  )

  // Сохраняем токены в localStorage при успешном ответе
  if (response.data.success && response.data.data.tokens) {
    saveTokensToStorage(
      response.data.data.tokens.accessToken,
      response.data.data.tokens.refreshToken
    )
  }

  return response.data
}

// Обновить access token используя refresh token
export const refreshToken = async (): Promise<IRefreshTokenResponse> => {
  const refreshTokenValue = getRefreshToken()

  if (!refreshTokenValue) {
    throw new Error('Refresh token не найден')
  }

  const response = await api.post<IRefreshTokenResponse>('/api/auth/refresh', {
    refresh_token: refreshTokenValue
  })

  // Сохраняем новые токены при успешном обновлении
  if (response.data.success && response.data.data) {
    saveTokensToStorage(
      response.data.data.accessToken,
      response.data.data.refreshToken
    )
  }

  return response.data
}

// Выйти из системы
export const logout = async (): Promise<ILogoutResponse> => {
  try {
    const response = await privateApi.post<ILogoutResponse>('/api/auth/logout')

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
  const response = await privateApi.get<IUserInfoResponse>('/api/auth/me')
  return response.data
}

// Проверить авторизован ли пользователь
export const isAuthenticated = (): boolean => {
  const accessToken = getAccessToken()
  return accessToken !== null
}

// Принудительно выйти из системы (очистить токены и перенаправить)
export const forceLogout = (): void => {
  clearTokensFromStorage()

  if (typeof window !== 'undefined') {
    window.location.href = '/auth'
  }
}