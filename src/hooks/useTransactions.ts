import { useState, useEffect, useCallback } from 'react'
import { getTransactions } from '../api/users/model'
import type {
  IUserTransaction,
  ITransactionFilters,
  ITransactionsResponse
} from '../api/users/types'

// Интерфейс для хука useTransactions
interface IUseTransactions {
  transactions: IUserTransaction[]
  isLoading: boolean
  error: string | null
  filters: ITransactionFilters
  total: number
  hasMore: boolean
  setFilters: (filters: ITransactionFilters) => void
  refreshTransactions: () => Promise<void>
  loadMore: () => Promise<void>
  clearError: () => void
}

// Настройки по умолчанию
const DEFAULT_FILTERS: ITransactionFilters = {
  sortBy: 'createdAt',
  sortOrder: 'desc'
}

// Хук для управления транзакциями пользователя
export const useTransactions = (steamId?: string): IUseTransactions => {
  const [transactions, setTransactions] = useState<IUserTransaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFiltersState] = useState<ITransactionFilters>(DEFAULT_FILTERS)
  const [total, setTotal] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  // Вычисляем есть ли еще данные для загрузки
  const hasMore = transactions.length < total

  // Функция для обработки ошибок API
  const handleApiError = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message
    }
    return 'Произошла ошибка при загрузке транзакций'
  }

  // Загрузка транзакций с учетом фильтров и пагинации
  const loadTransactions = useCallback(
    async (page: number = 1, append: boolean = false) => {
      if (!steamId) {
        setError('Steam ID не указан')
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        // Подготавливаем фильтры с пагинацией
        const filtersWithPagination: ITransactionFilters = {
          ...filters,
          // Добавляем параметры пагинации через query параметры
          // API должен поддерживать page и limit параметры
        }

        const response: ITransactionsResponse = await getTransactions(
          steamId,
          filtersWithPagination
        )

        if (append) {
          // Добавляем к существующим транзакциям (для пагинации)
          setTransactions(prev => [...prev, ...response.data])
        } else {
          // Заменяем транзакции (для обновления или новых фильтров)
          setTransactions(response.data)
        }

        setTotal(response.total)
        setCurrentPage(page)
      } catch (err) {
        const errorMessage = handleApiError(err)
        setError(errorMessage)
        console.error('Ошибка загрузки транзакций:', err)
      } finally {
        setIsLoading(false)
      }
    },
    [steamId, filters]
  )

  // Обновление фильтров
  const setFilters = useCallback((newFilters: ITransactionFilters) => {
    setFiltersState(newFilters)
    setCurrentPage(1)
    setTransactions([]) // Очищаем текущие транзакции при смене фильтров
  }, [])

  // Обновление транзакций (перезагрузка с первой страницы)
  const refreshTransactions = useCallback(async () => {
    setCurrentPage(1)
    setTransactions([])
    await loadTransactions(1, false)
  }, [loadTransactions])

  // Загрузка следующей страницы транзакций
  const loadMore = useCallback(async () => {
    if (hasMore && !isLoading) {
      const nextPage = currentPage + 1
      await loadTransactions(nextPage, true)
    }
  }, [hasMore, isLoading, currentPage, loadTransactions])

  // Очистка ошибки
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  // Загружаем транзакции при изменении steamId или фильтров
  useEffect(() => {
    if (steamId) {
      loadTransactions(1, false)
    }
  }, [steamId, loadTransactions])

  return {
    transactions,
    isLoading,
    error,
    filters,
    total,
    hasMore,
    setFilters,
    refreshTransactions,
    loadMore,
    clearError
  }
}