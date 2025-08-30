// Утилитарные функции для работы с авторизацией

import { isAuthenticated, forceLogout } from '../api/auth'
import { getTokensFromStorage, clearTokensFromStorage } from '../api/config'

// Проверить авторизован ли пользователь
export const checkAuth = (): boolean => {
  return isAuthenticated()
}

// Получить данные токенов
export const getAuthTokens = () => {
  return getTokensFromStorage()
}

// Принудительно выйти из системы
export const logout = (): void => {
  forceLogout()
}

// Очистить токены без перенаправления
export const clearAuth = (): void => {
  clearTokensFromStorage()
}

// Проверить нужно ли обновить токен
export const shouldRefreshToken = (): boolean => {
  const tokens = getTokensFromStorage()
  if (!tokens) return false

  // Проверяем, истечет ли токен в ближайшие 5 минут
  const fiveMinutesFromNow = Math.floor(Date.now() / 1000) + 300
  return tokens.expiration <= fiveMinutesFromNow
}

// Получить заголовок авторизации
export const getAuthHeader = (): string | null => {
  const tokens = getTokensFromStorage()
  if (!tokens) return null

  return `${tokens.tokenType} ${tokens.accessToken}`
}