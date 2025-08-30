'use client'

import { useState, useEffect } from 'react'
import { IUser } from '@/types'

interface IAuthUser extends IUser {
  currencySecondary: string
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<IAuthUser | null>(null)

  // Мок данные пользователя
  const mockUser: IAuthUser = {
    id: '1',
    username: 'username_email@gmail.com',
    email: 'username_email@gmail.com',
    avatar: 'https://via.placeholder.com/32x32/ff69b4/ffffff?text=U',
    steamTradeUrl: '',
    balance: 1250.75,
    currency: '₽',
    currencySecondary: '$',
    language: 'ru'
  }

  // Автоматическая авторизация для тестирования
  useEffect(() => {
    // Автоматически логинимся при загрузке для тестирования
    setIsAuthenticated(true)
    setUser(mockUser)
  }, [])

  const login = () => {
    setIsAuthenticated(true)
    setUser(mockUser)
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
  }

  return {
    isAuthenticated,
    user,
    login,
    logout
  }
}