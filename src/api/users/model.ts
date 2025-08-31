// API методы для работы с пользователями

import { IUserMeData } from '../auth'
import { privateApi } from '../config'
import type {
  IInventoryResponse,
  IInventoryWithPricesResponse,
  IUserInventoryResponseDto,
  IUserInventoryWithPricesResponseDto,
  ITransactionFilters,
  ITransactionsResponse
} from './types'

// Построение query параметров для фильтрации транзакций
export const buildTransactionFilters = (filters?: ITransactionFilters): URLSearchParams => {
  const params = new URLSearchParams()

  if (!filters) return params

  // Добавляем параметры только если они определены
  if (filters.userId) params.append('userId', filters.userId)
  if (filters.type) params.append('type', filters.type)
  if (filters.status) params.append('status', filters.status)
  if (filters.method) params.append('method', filters.method)
  if (filters.currency) params.append('currency', filters.currency)
  if (filters.relatedOrderId) params.append('relatedOrderId', filters.relatedOrderId)
  if (filters.fromDate) params.append('fromDate', filters.fromDate)
  if (filters.toDate) params.append('toDate', filters.toDate)
  if (filters.sortBy) params.append('sortBy', filters.sortBy)
  if (filters.sortOrder) params.append('sortOrder', filters.sortOrder)

  return params
}

// Получить инвентарь пользователя без цен по Steam ID (старый метод для обратной совместимости)
export const getInventory = async (
  steamId: string,
  gameId: number
): Promise<IInventoryResponse> => {
  const response = await privateApi.get(`/api/users/${steamId}/inventory`, {
    params: { gameId }
  })
  return response.data
}

// Получить инвентарь по trade URL без цен
export const getInventoryByTradeUrl = async (
  tradeUrl: string,
  gameId: number = 730
): Promise<IUserInventoryResponseDto> => {
  const response = await privateApi.post('/api/users/inventory/by-trade-url', {
    tradeUrl,
    gameId
  })
  return response.data
}

// Получить инвентарь с ценами по Steam ID (старый метод для обратной совместимости)
export const getInventoryWithPrices = async (
  steamId: string,
  gameId: number
): Promise<IInventoryWithPricesResponse> => {
  const response = await privateApi.get(`/api/users/${steamId}/inventory/with-prices`, {
    params: { gameId }
  })
  return response.data
}

// Получить инвентарь по trade URL с ценами
export const getInventoryByTradeUrlWithPrices = async (
  tradeUrl: string,
  gameId: number = 730
): Promise<IUserInventoryWithPricesResponseDto> => {
  const response = await privateApi.post('/api/users/inventory/by-trade-url/with-prices', {
    tradeUrl,
    gameId
  })
  return response.data
}

// НОВЫЕ МЕТОДЫ СОГЛАСНО ДИЗАЙНУ

// Получить инвентарь по Steam ID без цен
export const getInventoryBySteamId = async (
  steamId: string,
  gameId: number
): Promise<IUserInventoryResponseDto> => {
  const response = await privateApi.get(`/api/users/${steamId}/inventory`, {
    params: { gameId }
  })
  return response.data
}

// Получить инвентарь по Steam ID с ценами
export const getInventoryBySteamIdWithPrices = async (
  steamId: string,
  gameId: number
): Promise<IUserInventoryWithPricesResponseDto> => {
  const response = await privateApi.get(`/api/users/${steamId}/inventory/with-prices`, {
    params: { gameId }
  })
  return response.data
}

// Получить транзакции пользователя с фильтрацией
export const getTransactions = async (
  steamId: string,
  filters?: ITransactionFilters
): Promise<ITransactionsResponse> => {
  const params = buildTransactionFilters(filters)
  const response = await privateApi.get(`/api/users/${steamId}/transactions`, {
    params
  })
  return response.data
}

// Получить полную информацию о пользователе по steamId
export const getUserBySteamId = async (steamId: string): Promise<IUserMeData> => {
  const response = await privateApi.get<IUserMeData>(`/api/users/${steamId}`)
  return response.data
}