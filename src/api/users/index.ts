import axiosInstance from '../config'
import type {
  IInventoryResponse,
  IInventoryWithPricesResponse,
  IInventoryByTradeUrlRequest,
  ITransactionFilters,
  ITransactionsResponse
} from './types'
import { buildTransactionFilters } from './model'

// Получить инвентарь пользователя без цен по Steam ID
export const getInventory = async (
  steamId: string,
  gameId: number
): Promise<IInventoryResponse> => {
  const response = await axiosInstance.get(`/api/users/${steamId}/inventory`, {
    params: { gameId }
  })
  return response.data
}

// Получить инвентарь по trade URL без цен
export const getInventoryByTradeUrl = async (
  data: IInventoryByTradeUrlRequest
): Promise<IInventoryResponse> => {
  const response = await axiosInstance.post('/api/users/inventory/by-trade-url', data)
  return response.data
}

// Получить инвентарь с ценами по Steam ID
export const getInventoryWithPrices = async (
  steamId: string,
  gameId: number
): Promise<IInventoryWithPricesResponse> => {
  const response = await axiosInstance.get(`/api/users/${steamId}/inventory/with-prices`, {
    params: { gameId }
  })
  return response.data
}

// Получить инвентарь по trade URL с ценами
export const getInventoryByTradeUrlWithPrices = async (
  data: IInventoryByTradeUrlRequest
): Promise<IInventoryWithPricesResponse> => {
  const response = await axiosInstance.post('/api/users/inventory/by-trade-url/with-prices', data)
  return response.data
}

// Получить транзакции пользователя с фильтрацией
export const getTransactions = async (
  steamId: string,
  filters?: ITransactionFilters
): Promise<ITransactionsResponse> => {
  const params = buildTransactionFilters(filters)
  const response = await axiosInstance.get(`/api/users/${steamId}/transactions`, {
    params
  })
  return response.data
}

// Экспорт всех методов для удобства импорта
export const usersApi = {
  getInventory,
  getInventoryByTradeUrl,
  getInventoryWithPrices,
  getInventoryByTradeUrlWithPrices,
  getTransactions,
}

export default usersApi