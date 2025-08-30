// Хук для работы с авторизацией в React компонентах

import { useState, useEffect } from 'react'
import { checkAuth, getAuthTokens, logout } from '../utils/auth'
import { getMe } from '../api/auth'
import type { IUserMeData } from '../api/auth/types'

interface UseAuthReturn {
  isAuthenticated: boolean
  user: IUserMeData | null
  loading: boolean
  login: () => void
  logout: () => void
  refreshUser: () => Promise<void>
}

export const useAuth = (): UseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<IUserMeData | null>(null)
  const [loading, setLoading] = useState(true)

  // Проверка авторизации при монтировании
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authenticated = checkAuth()
        setIsAuthenticated(authenticated)

        if (authenticated) {
          // Получаем данные пользователя
          const response = await getMe()
          if (response.success) {
            setUser(response.data)
          }
        }
      } catch (error) {
        console.error('Ошибка проверки авторизации:', error)
        setIsAuthenticated(false)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkAuthStatus()
  }, [])

  // Функция для входа (перенаправление на Steam)
  const login = () => {
    window.location.href = '/auth'
  }

  // Функция для выхода
  const handleLogout = () => {
    logout()
    setIsAuthenticated(false)
    setUser(null)
  }

  // Функция для обновления данных пользователя
  const refreshUser = async () => {
    try {
      if (checkAuth()) {
        const response = await getMe()
        if (response.success) {
          setUser(response.data)
        }
      }
    } catch (error) {
      console.error('Ошибка обновления данных пользователя:', error)
    }
  }

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout: handleLogout,
    refreshUser,
  }
}