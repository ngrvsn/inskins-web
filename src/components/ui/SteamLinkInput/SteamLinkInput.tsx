'use client'

import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useDebounce } from '@/hooks/useDebounce'
import { getInventoryByTradeUrlWithPrices } from '@/api/users'
import type { IUserInventoryWithPricesResponseDto } from '@/api/users/types'
import styles from './SteamLinkInput.module.scss'

interface ISteamLinkInputProps {
  onLinkChange: (
    link: string,
    inventoryData?: IUserInventoryWithPricesResponseDto,
    error?: string
  ) => void
  initialValue?: string
  withTitle?: boolean
  gameId?: number // ID игры для API запроса
}

interface IFormData {
  steamLink: string
}

export const SteamLinkInput = ({
  onLinkChange,
  initialValue = '',
  withTitle,
  gameId = 730 // По умолчанию CS2
}: ISteamLinkInputProps) => {
  const [inputValue, setInputValue] = useState(initialValue)
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const debouncedValue = useDebounce(inputValue, 500)

  const {
    register,
    formState: { errors },
    setValue
  } = useForm<IFormData>({
    defaultValues: {
      steamLink: initialValue
    }
  })

  // Вызываем API и onLinkChange только после дебаунса
  useEffect(() => {
    const fetchInventory = async () => {
      // Сбрасываем предыдущие ошибки API
      setApiError(null)

      // Если ссылка пустая, просто передаем пустую ссылку
      if (!debouncedValue.trim()) {
        onLinkChange(debouncedValue)
        return
      }

      // Проверяем валидность ссылки перед API запросом
      const steamCommunityRegex = /^https?:\/\/steamcommunity\.com\//
      if (!steamCommunityRegex.test(debouncedValue)) {
        onLinkChange(debouncedValue)
        return
      }

      try {
        setIsLoading(true)
        // Делаем API запрос для получения инвентаря с ценами
        const inventoryData = await getInventoryByTradeUrlWithPrices(
          debouncedValue,
          gameId
        )
        onLinkChange(debouncedValue, inventoryData)
      } catch (error) {
        console.error('Ошибка при получении инвентаря:', error)
        const errorMessage = 'Не удалось загрузить инвентарь. Проверьте ссылку.'
        setApiError(errorMessage)
        onLinkChange(debouncedValue, undefined, errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInventory()
  }, [debouncedValue, gameId]) // Убираем onLinkChange из зависимостей

  // Обработка изменения ввода с дебаунсом
  const handleInputChange = (value: string) => {
    setInputValue(value)
    setValue('steamLink', value)
  }

  // Валидация формата Steam Community
  const validateSteamLink = (value: string) => {
    if (!value) return true // Пустое поле допустимо

    const steamCommunityRegex = /^https?:\/\/steamcommunity\.com\//
    return (
      steamCommunityRegex.test(value) ||
      'Ссылка должна быть с сайта steamcommunity.com'
    )
  }

  return (
    <div className={styles.container}>
      {withTitle && (
        <label className={styles.label}>
          Вставьте свою <span className={styles.highlight}>ссылку</span> на
          обмен:
        </label>
      )}

      <div className={styles.inputWrapper}>
        <input
          {...register('steamLink', {
            validate: validateSteamLink,
            onChange: (e) => handleInputChange(e.target.value)
          })}
          type='text'
          value={inputValue}
          className={`${styles.input} ${errors.steamLink ? styles.error : ''}`}
          placeholder='https://steamcommunity.com/tradeoffer/new/?partner=...'
          disabled={isLoading}
        />
        {isLoading && (
          <div className={styles.loadingIndicator}>Загрузка инвентаря...</div>
        )}
      </div>

      {errors.steamLink && (
        <span className={styles.errorMessage}>{errors.steamLink.message}</span>
      )}

      {apiError && <span className={styles.errorMessage}>{apiError}</span>}
    </div>
  )
}
