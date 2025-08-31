// Интерфейсы для API пользователей
// ВНИМАНИЕ: Эти типы используются для получения ПОЛНЫХ данных профиля пользователя
// Для базовой авторизации используйте типы из src/api/auth/types.ts

// Enum для игр
export enum EGameId {
  CS2 = 730,
  DOTA2 = 570,
  STEAM = 753,
  RUST = 252490
}

// Старый enum для обратной совместимости (deprecated)
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
  gameId?: number // Опциональный, по умолчанию CS2
}

// Запрос инвентаря по Steam ID
export interface IInventoryBySteamIdRequest {
  steamId: string
  gameId: number
}

// Базовый предмет инвентаря согласно дизайну
export interface IUserInventoryItemDto {
  assetId: string
  classId: string
  instanceId: string
  market_name: string
  market_hash_name: string
  name: string
  type: string
  rarity: string
  exterior?: string
  image: string
  tradable: boolean
  marketable: boolean
  amount: number
}

// Предмет инвентаря с ценами согласно дизайну
export interface IUserInventoryItemWithPricesDto extends IUserInventoryItemDto {
  prices?: IPriceInfo
}

// Информация о ценах
export interface IPriceInfo {
  steam?: number
  buff?: number
  market?: number
  suggested?: number
}

// Статистика цен
export interface IPriceStats {
  minPrice: number
  maxPrice: number
  avgPrice: number
  totalItems: number
}

// Ответ с инвентарем без цен согласно дизайну
export interface IUserInventoryResponseDto {
  steamId: string
  tradeUrl?: string
  gameId: number
  contextId: number
  items: IUserInventoryItemDto[]
  count: number
  lastUpdated: string
}

// Ответ с инвентарем с ценами согласно дизайну
export interface IUserInventoryWithPricesResponseDto extends IUserInventoryResponseDto {
  items: IUserInventoryItemWithPricesDto[]
  totalValue: number
  priceStats?: IPriceStats
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
export enum EPaymentMethod {
  CARD = 'card',
  SBP = 'sbp',
  USDT_TRC20 = 'usdt_trc20',
  BNB = 'bnb',
  USDC_TRC20 = 'usdc_trc20',
  BTC = 'btc',
  ETH = 'eth',
  SOLANA = 'solana',
  TON = 'ton',
  USDT_ERC20 = 'usdt_erc20',
  INSKINS = 'inskins'
}

// Старый тип для обратной совместимости (deprecated)
export type TPaymentMethod = EPaymentMethod

// Транзакция пользователя
export interface IUserTransaction {
  id: string
  userId: string
  steamId: string
  type: TTransactionType
  status: TTransactionStatus
  method?: EPaymentMethod
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
  method?: EPaymentMethod
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

// Полные данные пользователя из /api/users/{steamId}
export interface IUserMeData {
  steamId: string
  steamLogin: string
  steamNickname: string
  steamAvatar: string
  steamProfileUrl: string
  steamTradeUrl: string
  email: string
  isEmailVerified: boolean
  telegram: string
  language: string
  lastLoginAt: string
  registeredAt: string
  status: string
  role: string
  countryCode: string
  timezone: string
  preferences: {
    theme: string
    notifications: boolean
  }
  displayName: string
  createdAt: string
  updatedAt: string
  balance: number
  holdBalance: number
  currency: string
  withdrawMethods: string[]
  totalWithdrawn: number
  totalDeposited: number
  promoCodesUsed: string[]
  referralCode: string
  referralRewardPercent: number
  totalEarned: number
  referralBalance: number
  refereesCount: number
  isBanned: boolean
  isWithdrawBlocked: boolean
  orderHistory: Array<{
    orderId: string
    items: Array<{
      marketName: string
      price: number
      iconUrl: string
      quantity: number
    }>
    totalAmount: number
    status: string
    createdAt: string
    lastUpdatedAt: string
  }>
}

export interface IUserMeResponse {
  success: boolean
  data: IUserMeData
  message: string
  timestamp: string
  requestId: string
}