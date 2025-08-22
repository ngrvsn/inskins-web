'use client'

import { useState, useEffect } from 'react'

interface IUser {
  username: string
  balance: string
  currency: string
  currencySecondary: string
  avatar: string
}

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<IUser | null>(null)

  // Мок данные пользователя
  const mockUser: IUser = {
    username: 'username_email@gmail.com',
    balance: '0.00',
    currency: '₽',
    currencySecondary: '$',
    avatar: 'https://via.placeholder.com/32x32/ff69b4/ffffff?text=U'
  }

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