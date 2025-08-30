// Интерфейсы для API пользователей

// Enum для игр
export enum GameId {
  CS2 = 730,
  DOTA2 = 570,
  STEAM = 753,
  RUST = 252490
}

// Базовый предмет инвентаря без цены
export interface IInventoryItem {
  assetid: string
  classid: string
  instanceid: string
  market_name: string
  name: string
  type: string
  rarity: string
  exterior: string
  image: string
  tradable: boolean
  marketable: boolean
}

// Предмет инвентаря с ценами
export interface IInventoryItemWithPrice extends IInventoryItem {
  market_hash_name: string
  prices: {
    avgPrice: number
    steamPrice: number
    providers: {
      steam: {
        price: number
      }
      buff: {
        price: number
      }
      csgofloat: {
        price: number
      }
    }
    lastUpdated: string
    available: boolean
  }
  amount: number
}

// Ответ инвентаря без цен
export interface IInventoryResponse {
  steamId: string
  tradeUrl: string
  gameId: number
  contextId: number
  items: IInventoryItem[]
  count: number
  lastUpdated: string
}

// Ответ инвентаря с ценами
export interface IInventoryWithPricesResponse {
  steamId: string
  tradeUrl: string
  gameId: number
  contextId: number
  items: IInventoryItemWithPrice[]
  count: number
  lastUpdated: string
  totalValue: number
  priceStats: {
    itemsWithPrices: number
    itemsWithoutPrices: number
    priceAccuracy: number
  }
}

// Запрос инвентаря по trade URL
export interface IInventoryByTradeUrlRequest {
  tradeUrl: string
  gameId: number
}

// Типы транзакций
export type TTransactionType =
  | 'deposit'
  | 'withdrawal'
  | 'referral_reward'
  | 'promo_bonus'
  | 'order_payout'
  | 'purchase'
  | 'rollback'

// Статусы транзакций
export type TTransactionStatus =
  | 'pending'
  | 'completed'
  | 'failed'
  | 'cancelled'

// Методы оплаты
export type TPaymentMethod =
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

// Транзакция пользователя
export interface IUserTransaction {
  id: string
  userId: string
  steamId: string
  type: TTransactionType
  status: TTransactionStatus
  method?: TPaymentMethod
  currency: string
  amount: number
  relatedOrderId?: string
  createdAt: string
  updatedAt: string
  description?: string
}

// Фильтры для транзакций
export interface ITransactionFilters {
  userId?: string
  type?: TTransactionType
  status?: TTransactionStatus
  method?: TPaymentMethod
  currency?: string
  relatedOrderId?: string
  fromDate?: string
  toDate?: string
  sortBy?: 'createdAt' | 'updatedAt' | 'amount'
  sortOrder?: 'asc' | 'desc'
}

// Ответ списка транзакций
export interface ITransactionsResponse {
  data: IUserTransaction[]
  total: number
  page?: number
  limit?: number
}