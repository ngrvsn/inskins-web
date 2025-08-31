'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  getSteamAuthUrl,
  getMe as getAuthMe,
  logout as apiLogout,
  getAccessToken,
  clearTokensFromStorage
} from '@/api/auth'

interface IAuthUser {
  id: string
  steamId: string
  role: string
  status: string
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<IAuthUser | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Загрузка данных пользователя
  const loadUserData = useCallback(async (): Promise<void> => {
    try {
      setError(null)
      console.log('useAuth - loadUserData - начинаем загрузку')

      // Получаем базовую информацию из auth/me
      const authResponse = await getAuthMe()
      console.log('useAuth - loadUserData - ответ от auth/me:', authResponse)

      // Ответ приходит напрямую в формате { id, steamId, role, status }
      if (!authResponse || typeof authResponse !== 'object' || !authResponse.id) {
        throw new Error('Неожиданная структура ответа от auth/me')
      }

      const userData: IAuthUser = {
        id: authResponse.id,
        steamId: authResponse.steamId,
        role: authResponse.role,
        status: authResponse.status
      }

      console.log('useAuth - loadUserData - userData:', userData)
      setUser(userData)
      setIsAuthenticated(true)
      console.log('useAuth - loadUserData - успешно авторизован')
    } catch (error) {
      console.error('Ошибка загрузки данных пользователя:', error)
      setError('Ошибка загрузки данных пользователя')
      setIsAuthenticated(false)
      setUser(null)
      // Очищаем токены при ошибке загрузки данных
      clearTokensFromStorage()
    }
  }, [])

  // Проверка токенов при инициализации
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true)
        const accessToken = getAccessToken()

        console.log('useAuth - initializeAuth - accessToken:', accessToken ? 'есть' : 'нет')

        if (accessToken) {
          // Если есть токен, пытаемся загрузить данные пользователя
          console.log('useAuth - пытаемся загрузить данные пользователя')
          await loadUserData()
        } else {
          // Если токена нет, пользователь не авторизован
          console.log('useAuth - токена нет, пользователь не авторизован')
          setIsAuthenticated(false)
          setUser(null)
        }
      } catch (error) {
        console.error('Ошибка инициализации авторизации:', error)
        setIsAuthenticated(false)
        setUser(null)
        clearTokensFromStorage()
      } finally {
        setIsLoading(false)
      }
    }

    initializeAuth()
  }, [loadUserData])

  // Авторизация через Steam
  const login = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)


      // Получаем URL для авторизации Steam
      const response = await getSteamAuthUrl()

      // Проверяем, является ли ответ объектом с success и data или просто строкой
      let authUrl: string
      if (typeof response === 'string') {
        authUrl = response
      } else if (response.success && response.data) {
        authUrl = response.data
      } else {
        throw new Error('Не удалось получить URL авторизации Steam')
      }

      // Перенаправляем пользователя на Steam
      if (typeof window !== 'undefined') {
        try {
          // Пробуем обычное перенаправление
          window.location.href = authUrl
        } catch (redirectError) {
          console.error('Ошибка перенаправления, пробуем открыть в новом окне:', redirectError)
          // Если не получается перенаправить, открываем в новом окне
          window.open(authUrl, '_self')
        }
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error)
      setError('Ошибка авторизации через Steam')
      setIsLoading(false)
    }
  }, [])

  // Выход из системы
  const logout = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true)
      setError(null)

      // Вызываем API выхода
      await apiLogout()
    } catch (error) {
      console.error('Ошибка выхода:', error)
      setError('Ошибка выхода из системы')
    } finally {
      // Очищаем состояние независимо от результата API
      setIsAuthenticated(false)
      setUser(null)
      setIsLoading(false)

      // Перенаправляем на главную страницу
      if (typeof window !== 'undefined') {
        window.location.href = '/'
      }
    }
  }, [])

  // Обновление данных пользователя
  const refreshUserData = useCallback(async (): Promise<void> => {
    if (!isAuthenticated) return

    try {
      setError(null)
      await loadUserData()
    } catch (error) {
      console.error('Ошибка обновления данных пользователя:', error)
      setError('Ошибка обновления данных пользователя')
    }
  }, [isAuthenticated, loadUserData])

  // Очистка ошибки
  const clearError = useCallback((): void => {
    setError(null)
  }, [])

  return {
    isAuthenticated,
    isLoading,
    user,
    error,
    login,
    logout,
    refreshUserData,
    clearError
  }
}