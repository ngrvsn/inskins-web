// Интерфейсы для API заказов

// Статусы заказов
export type TOrderStatus =
  | 'created'
  | 'received'
  | 'declined'
  | 'withdrawn'
  | 'stopped'
  | 'paid'

// Методы оплаты для заказов
export type TOrderPaymentMethod =
  | 'sbp'
  | 'card_ru'
  | 'card_visa'
  | 'card_mastercard'
  | 'sepa'
  | 'paypal'
  | 'usdt_trc20'
  | 'usdt_erc20'
  | 'usdt_bsc'
  | 'btc'
  | 'eth'
  | 'ton'
  | 'bnb'
  | 'sol'
  | 'qiwi'
  | 'yandex_money'

// Запрос создания заказа
export interface ICreateOrderRequest {
  steamId: string
  userLogin: string
  itemIds: string[]
  itemNames: string[]
  botName: string
  botSteamId: string
  paymentMethod: TOrderPaymentMethod
  paymentData: string
  payoutAmount: number
  amountBeforeCommission: number
  commissionRate: number
  status: TOrderStatus
  tradeId: string
  telegramUsername: string
  notes: string
  tradeUrl: string
}

// Полная модель заказа
export interface IOrder {
  id: string
  orderNumber: number
  orderId: string
  steamId: string
  userLogin: string
  itemIds: string[]
  itemNames: string[]
  botName: string
  botSteamId: string
  paymentMethod: TOrderPaymentMethod
  paymentData: string
  payoutAmount: number
  amountBeforeCommission: number
  commissionAmount: number
  commissionRate: number
  status: TOrderStatus
  statusChangeReason: string
  tradeId: number
  tradeUrl: string
  steamTradeUrl: string
  telegramUsername: string
  telegramUrl: string
  createdAt: string
  updatedAt: string
  receivedAt?: string
  paidAt?: string
  declinedAt?: string
  withdrawnAt?: string
  stoppedAt?: string
  notes: string
  isCompleted: boolean
}

// Фильтры для поиска заказов
export interface IOrderFilters {
  orderNumber?: number
  orderId?: string
  steamId?: string
  userLogin?: string
  botName?: string
  botSteamId?: string
  itemName?: string
  paymentMethod?: TOrderPaymentMethod[]
  paymentData?: string
  status?: TOrderStatus[]
  minPayoutAmount?: number
  maxPayoutAmount?: number
  tradeId?: string
  telegramUsername?: string
  dateFrom?: string
  dateTo?: string
  updatedFrom?: string
  updatedTo?: string
  isCompleted?: boolean
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// Ответ списка заказов
export interface IOrdersResponse {
  data: IOrder[]
  total: number
}

// Запрос отзыва заказа
export interface IWithdrawOrderRequest {
  reason: string
}