'use client'

import { useState, useEffect, useCallback } from 'react'
import { privateApi } from '@/api/config'
import { getMe as getAuthMe } from '@/api/auth/model'
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
      console.log('useProfile - loadProfileData - начинаем загрузку')

      // Сначала получаем steamId из auth/me
      const authResponse = await getAuthMe()
      console.log('useProfile - loadProfileData - ответ от auth/me:', authResponse)

      // Ответ приходит напрямую в формате { id, steamId, role, status }
      if (!authResponse || typeof authResponse !== 'object' || !authResponse.steamId) {
        throw new Error('Не удалось получить steamId из auth/me')
      }

      const steamId = authResponse.steamId
      console.log('useProfile - loadProfileData - steamId:', steamId)

      // Теперь получаем полные данные профиля по steamId из /api/users/{steamId}
      const response = await privateApi.get(`/api/users/${steamId}`)
      console.log('useProfile - loadProfileData - ответ от /api/users:', response.data)

      if (!response.data) {
        throw new Error('Данные профиля отсутствуют в ответе')
      }

      setProfileData(response.data)
      console.log('useProfile - loadProfileData - данные профиля загружены успешно')
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