'use client'

import { useState, useEffect, useCallback } from 'react'
import { getMe } from '@/api/users/model'
import type { IUserMeData } from '@/api/users/types'

interface IUseProfile {
  profileData: IUserMeData | null
  isLoading: boolean
  error: string | null
  refreshProfile: () => Promise<void>
  clearError: () => void
}

export const useProfile = (): IUseProfile => {
  const [profileData, setProfileData] = useState<IUserMeData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Загрузка данных профиля
  const loadProfileData = useCallback(async (): Promise<void> => {
    try {
      setError(null)
      setIsLoading(true)

      // Получаем полные данные профиля из /api/users/me
      const response = await getMe()

      // Проверяем структуру ответа
      if (!response.success) {
        throw new Error(response.message || 'Ошибка получения данных профиля')
      }

      if (!response.data) {
        throw new Error('Данные профиля отсутствуют в ответе')
      }

      setProfileData(response.data)
    } catch (error) {
      console.error('Ошибка загрузки данных профиля:', error)

      // Обработка различных типов ошибок
      let errorMessage = 'Ошибка загрузки данных профиля'

      if (error instanceof Error) {
        errorMessage = error.message
      } else if (typeof error === 'string') {
        errorMessage = error
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = String(error.message)
      }

      setError(errorMessage)
      setProfileData(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Обновление данных профиля
  const refreshProfile = useCallback(async (): Promise<void> => {
    await loadProfileData()
  }, [loadProfileData])

  // Очистка ошибки
  const clearError = useCallback((): void => {
    setError(null)
  }, [])

  // Автоматическая загрузка при монтировании
  useEffect(() => {
    loadProfileData()
  }, [loadProfileData])

  return {
    profileData,
    isLoading,
    error,
    refreshProfile,
    clearError
  }
}