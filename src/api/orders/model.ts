import { IOrderFilters, ICreateOrderRequest, IOrder } from './types'

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

// Форматирование данных заказа перед отправкой
export const formatOrderData = (data: ICreateOrderRequest): ICreateOrderRequest => {
  return {
    ...data,
    // Убираем лишние пробелы из строковых полей
    steamId: data.steamId.trim(),
    userLogin: data.userLogin.trim(),
    botName: data.botName.trim(),
    botSteamId: data.botSteamId.trim(),
    paymentData: data.paymentData.trim(),
    telegramUsername: data.telegramUsername.trim(),
    notes: data.notes.trim(),
    tradeUrl: data.tradeUrl.trim(),
    tradeId: data.tradeId.trim(),
    // Округляем числовые значения до 2 знаков после запятой
    payoutAmount: Math.round(data.payoutAmount * 100) / 100,
    amountBeforeCommission: Math.round(data.amountBeforeCommission * 100) / 100,
    commissionRate: Math.round(data.commissionRate * 100) / 100,
    // Очищаем массивы от пустых элементов
    itemIds: data.itemIds.filter(id => id.trim().length > 0),
    itemNames: data.itemNames.filter(name => name.trim().length > 0)
  }
}

// Валидация данных заказа перед отправкой
export const validateOrderData = (data: ICreateOrderRequest): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []

  // Проверяем обязательные строковые поля
  if (!data.steamId || data.steamId.trim().length === 0) {
    errors.push('Steam ID обязателен')
  }

  if (!data.userLogin || data.userLogin.trim().length === 0) {
    errors.push('Логин пользователя обязателен')
  }

  if (!data.botName || data.botName.trim().length === 0) {
    errors.push('Имя бота обязательно')
  }

  if (!data.botSteamId || data.botSteamId.trim().length === 0) {
    errors.push('Steam ID бота обязателен')
  }

  if (!data.paymentData || data.paymentData.trim().length === 0) {
    errors.push('Данные для оплаты обязательны')
  }

  if (!data.tradeUrl || data.tradeUrl.trim().length === 0) {
    errors.push('Ссылка на обмен обязательна')
  }

  // Проверяем массивы предметов
  if (!data.itemIds || data.itemIds.length === 0) {
    errors.push('Список ID предметов не может быть пустым')
  }

  if (!data.itemNames || data.itemNames.length === 0) {
    errors.push('Список названий предметов не может быть пустым')
  }

  if (data.itemIds && data.itemNames && data.itemIds.length !== data.itemNames.length) {
    errors.push('Количество ID предметов должно совпадать с количеством названий')
  }

  // Проверяем числовые значения
  if (data.payoutAmount <= 0) {
    errors.push('Сумма выплаты должна быть больше 0')
  }

  if (data.amountBeforeCommission <= 0) {
    errors.push('Сумма до комиссии должна быть больше 0')
  }

  if (data.commissionRate < 0 || data.commissionRate > 100) {
    errors.push('Процент комиссии должен быть от 0 до 100')
  }

  if (data.payoutAmount > data.amountBeforeCommission) {
    errors.push('Сумма выплаты не может быть больше суммы до комиссии')
  }

  // Проверяем формат Steam ID (должен быть числом)
  if (!/^\d+$/.test(data.steamId)) {
    errors.push('Steam ID должен содержать только цифры')
  }

  if (!/^\d+$/.test(data.botSteamId)) {
    errors.push('Steam ID бота должен содержать только цифры')
  }

  // Проверяем формат trade URL
  if (!data.tradeUrl.includes('steamcommunity.com/tradeoffer/')) {
    errors.push('Некорректный формат ссылки на обмен Steam')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Вычисление суммы комиссии на основе данных заказа
export const calculateCommissionAmount = (amountBeforeCommission: number, commissionRate: number): number => {
  return Math.round(amountBeforeCommission * (commissionRate / 100) * 100) / 100
}

// Проверка, завершен ли заказ на основе статуса
export const isOrderCompleted = (order: IOrder): boolean => {
  return order.status === 'paid' || order.status === 'declined' || order.status === 'withdrawn'
}

// Получение человекочитаемого описания статуса заказа
export const getOrderStatusDescription = (status: string): string => {
  const statusDescriptions: Record<string, string> = {
    created: 'Создан',
    received: 'Получен',
    declined: 'Отклонен',
    withdrawn: 'Отозван',
    stopped: 'Остановлен',
    paid: 'Оплачен'
  }

  return statusDescriptions[status] || 'Неизвестный статус'
}

// Получение человекочитаемого описания метода оплаты
export const getPaymentMethodDescription = (method: string): string => {
  const methodDescriptions: Record<string, string> = {
    sbp: 'СБП',
    card_ru: 'Карта РФ',
    card_visa: 'Visa',
    card_mastercard: 'Mastercard',
    sepa: 'SEPA',
    paypal: 'PayPal',
    usdt_trc20: 'USDT (TRC20)',
    usdt_erc20: 'USDT (ERC20)',
    usdt_bsc: 'USDT (BSC)',
    btc: 'Bitcoin',
    eth: 'Ethereum',
    ton: 'TON',
    bnb: 'BNB',
    sol: 'Solana',
    qiwi: 'QIWI',
    yandex_money: 'ЮMoney'
  }

  return methodDescriptions[method] || 'Неизвестный метод'
}