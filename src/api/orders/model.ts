// API методы для работы с заказами

import { privateApi } from '../config'
import {
  ICreateOrderRequest,
  IOrder,
  IOrdersResponse,
  IOrderFilters,
  IWithdrawOrderRequest
} from './types'

// Построение query параметров для фильтрации заказов
export const buildOrderFilters = (filters: IOrderFilters): URLSearchParams => {
  const params = new URLSearchParams()

  // Добавляем параметры только если они определены
  if (filters.orderNumber !== undefined) {
    params.append('orderNumber', filters.orderNumber.toString())
  }

  if (filters.orderId) {
    params.append('orderId', filters.orderId)
  }

  if (filters.steamId) {
    params.append('steamId', filters.steamId)
  }

  if (filters.userLogin) {
    params.append('userLogin', filters.userLogin)
  }

  if (filters.botName) {
    params.append('botName', filters.botName)
  }

  if (filters.botSteamId) {
    params.append('botSteamId', filters.botSteamId)
  }

  if (filters.itemName) {
    params.append('itemName', filters.itemName)
  }

  if (filters.paymentMethod && filters.paymentMethod.length > 0) {
    filters.paymentMethod.forEach(method => {
      params.append('paymentMethod', method)
    })
  }

  if (filters.paymentData) {
    params.append('paymentData', filters.paymentData)
  }

  if (filters.status && filters.status.length > 0) {
    filters.status.forEach(status => {
      params.append('status', status)
    })
  }

  if (filters.minPayoutAmount !== undefined) {
    params.append('minPayoutAmount', filters.minPayoutAmount.toString())
  }

  if (filters.maxPayoutAmount !== undefined) {
    params.append('maxPayoutAmount', filters.maxPayoutAmount.toString())
  }

  if (filters.tradeId) {
    params.append('tradeId', filters.tradeId)
  }

  if (filters.telegramUsername) {
    params.append('telegramUsername', filters.telegramUsername)
  }

  if (filters.dateFrom) {
    params.append('dateFrom', filters.dateFrom)
  }

  if (filters.dateTo) {
    params.append('dateTo', filters.dateTo)
  }

  if (filters.updatedFrom) {
    params.append('updatedFrom', filters.updatedFrom)
  }

  if (filters.updatedTo) {
    params.append('updatedTo', filters.updatedTo)
  }

  if (filters.isCompleted !== undefined) {
    params.append('isCompleted', filters.isCompleted.toString())
  }

  if (filters.page !== undefined) {
    params.append('page', filters.page.toString())
  }

  if (filters.limit !== undefined) {
    params.append('limit', filters.limit.toString())
  }

  if (filters.sortBy) {
    params.append('sortBy', filters.sortBy)
  }

  if (filters.sortOrder) {
    params.append('sortOrder', filters.sortOrder)
  }

  return params
}

// Создать новый заказ на продажу скинов
export const createOrder = async (data: ICreateOrderRequest): Promise<IOrder> => {
  const response = await privateApi.post<IOrder>('/api/orders', data)
  return response.data
}

// Получить список заказов пользователя по steamId с возможностью фильтрации
export const getMyOrders = async (steamId: string, filters?: IOrderFilters): Promise<IOrdersResponse> => {
  // Добавляем steamId в фильтры
  const filtersWithSteamId = {
    ...filters,
    steamId
  }

  let url = '/api/orders/my'
  const queryParams = buildOrderFilters(filtersWithSteamId)

  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`
  }

  const response = await privateApi.get<IOrdersResponse>(url)
  return response.data
}

// Получить заказ по человекочитаемому номеру
export const getOrderByNumber = async (orderNumber: number): Promise<IOrder> => {
  const response = await privateApi.get<IOrder>(`/api/orders/number/${orderNumber}`)
  return response.data
}

// Получить заказ по системному ID заказа
export const getOrderById = async (orderId: string): Promise<IOrder> => {
  const response = await privateApi.get<IOrder>(`/api/orders/order-id/${orderId}`)
  return response.data
}

// Получить заказ по MongoDB ID
export const getOrderByMongoId = async (id: string): Promise<IOrder> => {
  const response = await privateApi.get<IOrder>(`/api/orders/${id}`)
  return response.data
}

// Отозвать заказ с указанием причины
export const withdrawOrder = async (id: string, reason: string): Promise<IOrder> => {
  const requestData: IWithdrawOrderRequest = {
    reason: reason.trim()
  }

  const response = await privateApi.post<IOrder>(`/api/orders/${id}/withdraw`, requestData)
  return response.data
}