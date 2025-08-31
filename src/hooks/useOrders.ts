import { useState, useEffect, useCallback } from 'react'
import { getMyOrders, getOrderById, getOrderByNumber, withdrawOrder } from '../api/orders/model'
import { IOrder, IOrderFilters } from '../api/orders/types'
import { useAuth } from './useAuth'

// Интерфейс для хука useOrders
interface IUseOrders {
  orders: IOrder[]
  isLoading: boolean
  error: string | null
  filters: IOrderFilters
  setFilters: (filters: IOrderFilters) => void
  refreshOrders: () => Promise<void>
  searchByItemName: (itemName: string) => void
  searchByOrderNumber: (orderNumber: number) => void
  getOrderDetails: (id: string) => Promise<IOrder | null>
  withdrawOrderById: (id: string, reason: string) => Promise<boolean>
  total: number
  hasMore: boolean
}

// Хук для управления заказами пользователя
export const useOrders = (): IUseOrders => {
  const { user } = useAuth()
  const [orders, setOrders] = useState<IOrder[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [total, setTotal] = useState(0)
  const [filters, setFilters] = useState<IOrderFilters>({
    page: 1,
    limit: 20,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  })

  // Вычисляем есть ли еще данные для загрузки
  const hasMore = orders.length < total

  // Загрузка заказов с применением фильтров
  const loadOrders = useCallback(async (currentFilters: IOrderFilters) => {
    if (!user?.steamId) {
      setError('Не удалось получить steamId пользователя')
      return
    }

    try {
      setIsLoading(true)
      setError(null)

      const response = await getMyOrders(user.steamId, currentFilters)

      // Если это первая страница, заменяем данные
      // Если это загрузка следующих страниц, добавляем к существующим
      if (currentFilters.page === 1) {
        setOrders(response.data)
      } else {
        setOrders(prev => [...prev, ...response.data])
      }

      setTotal(response.total)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка загрузки заказов'
      setError(errorMessage)
      console.error('Ошибка загрузки заказов:', err)
    } finally {
      setIsLoading(false)
    }
  }, [user?.steamId])

  // Обновление фильтров и загрузка данных
  const updateFilters = useCallback((newFilters: IOrderFilters) => {
    const updatedFilters = {
      ...filters,
      ...newFilters,
      // При изменении фильтров сбрасываем на первую страницу
      page: newFilters.page || 1
    }

    setFilters(updatedFilters)
  }, [filters])

  // Обновление списка заказов
  const refreshOrders = useCallback(async () => {
    await loadOrders({ ...filters, page: 1 })
  }, [filters, loadOrders])

  // Получение деталей заказа по ID
  const getOrderDetails = useCallback(async (id: string): Promise<IOrder | null> => {
    try {
      setError(null)
      const order = await getOrderById(id)
      return order
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка получения деталей заказа'
      setError(errorMessage)
      console.error('Ошибка получения деталей заказа:', err)
      return null
    }
  }, [])

  // Поиск по названию предмета
  const searchByItemName = useCallback((itemName: string) => {
    updateFilters({ itemName, page: 1 })
  }, [])

  // Поиск по номеру заказа
  const searchByOrderNumber = useCallback((orderNumber: number) => {
    updateFilters({ orderNumber, page: 1 })
  }, [])

  // Отзыв заказа
  const withdrawOrderById = useCallback(async (id: string, reason: string): Promise<boolean> => {
    try {
      setError(null)
      const updatedOrder = await withdrawOrder(id, reason)

      // Обновляем заказ в локальном состоянии
      setOrders(prev =>
        prev.map(order =>
          order.id === id ? updatedOrder : order
        )
      )

      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка отзыва заказа'
      setError(errorMessage)
      console.error('Ошибка отзыва заказа:', err)
      return false
    }
  }, [])

  // Загрузка данных при изменении фильтров или получении steamId
  useEffect(() => {
    if (user?.steamId) {
      loadOrders(filters)
    }
  }, [filters, loadOrders, user?.steamId])

  return {
    orders,
    isLoading,
    error,
    filters,
    setFilters: updateFilters,
    refreshOrders,
    searchByItemName,
    searchByOrderNumber,
    getOrderDetails,
    withdrawOrderById,
    total,
    hasMore
  }
}