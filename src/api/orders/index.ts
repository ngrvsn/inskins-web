import axiosInstance from '../config'
import {
  ICreateOrderRequest,
  IOrder,
  IOrdersResponse,
  IOrderFilters,
  IWithdrawOrderRequest
} from './types'
import { buildOrderFilters, formatOrderData, validateOrderData } from './model'

// Создать новый заказ на продажу скинов
export const createOrder = async (data: ICreateOrderRequest): Promise<IOrder> => {
  // Валидируем данные перед отправкой
  const validation = validateOrderData(data)
  if (!validation.isValid) {
    throw new Error(`Ошибка валидации: ${validation.errors.join(', ')}`)
  }

  // Форматируем данные
  const formattedData = formatOrderData(data)

  const response = await axiosInstance.post<IOrder>('/api/orders', formattedData)
  return response.data
}

// Получить список заказов текущего пользователя с возможностью фильтрации
export const getMyOrders = async (filters?: IOrderFilters): Promise<IOrdersResponse> => {
  let url = '/api/orders/my'

  if (filters) {
    const queryParams = buildOrderFilters(filters)
    if (queryParams.toString()) {
      url += `?${queryParams.toString()}`
    }
  }

  const response = await axiosInstance.get<IOrdersResponse>(url)
  return response.data
}

// Получить заказ по человекочитаемому номеру (начиная с 1337)
export const getOrderByNumber = async (orderNumber: number): Promise<IOrder> => {
  if (orderNumber < 1337) {
    throw new Error('Номер заказа должен быть не менее 1337')
  }

  const response = await axiosInstance.get<IOrder>(`/api/orders/number/${orderNumber}`)
  return response.data
}

// Получить заказ по системному ID заказа (ORD-xxx формат)
export const getOrderById = async (orderId: string): Promise<IOrder> => {
  if (!orderId || orderId.trim().length === 0) {
    throw new Error('ID заказа не может быть пустым')
  }

  const response = await axiosInstance.get<IOrder>(`/api/orders/order-id/${orderId}`)
  return response.data
}

// Получить заказ по MongoDB ID
export const getOrderByMongoId = async (id: string): Promise<IOrder> => {
  if (!id || id.trim().length === 0) {
    throw new Error('MongoDB ID не может быть пустым')
  }

  const response = await axiosInstance.get<IOrder>(`/api/orders/${id}`)
  return response.data
}

// Отозвать заказ с указанием причины
export const withdrawOrder = async (id: string, reason: string): Promise<IOrder> => {
  if (!id || id.trim().length === 0) {
    throw new Error('ID заказа не может быть пустым')
  }

  if (!reason || reason.trim().length === 0) {
    throw new Error('Причина отзыва заказа обязательна')
  }

  const requestData: IWithdrawOrderRequest = {
    reason: reason.trim()
  }

  const response = await axiosInstance.post<IOrder>(`/api/orders/${id}/withdraw`, requestData)
  return response.data
}

// Экспорт всех методов для удобства импорта
export const ordersApi = {
  createOrder,
  getMyOrders,
  getOrderByNumber,
  getOrderById,
  getOrderByMongoId,
  withdrawOrder
}

export default ordersApi