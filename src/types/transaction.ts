// Типы для системы отслеживания транзакций

export type TTransactionStatus = 'pending-confirmation' | 'pending-payout' | 'cancelled' | 'completed'

export interface IBotInfo {
  level: number
  name: string
  avatar: string
}

export interface ITransaction {
  id: string
  status: TTransactionStatus
  createdAt: string
  timeLeft?: number // для состояния pending-confirmation в секундах
  botInfo?: IBotInfo
  cancelReason?: string
  completedAt?: string
}

export interface ITransactionResponse {
  transaction: ITransaction
  success: boolean
  error?: string
}

// Типы для профиля пользователя

export type TTransactionType = 'sale' | 'purchase' | 'deposit' | 'withdrawal'
export type TTransactionStatusProfile = 'completed' | 'cancelled' | 'pending'

export interface ISkinTransaction {
  id: string
  name: string
  game: string
  price: number
  image: string
}

export interface IProfileTransaction {
  id: string
  type: TTransactionType
  date: Date
  status: TTransactionStatusProfile
  amount: number
  currency: string
  paymentSystem: string
  destination: string
  balanceChange: number
  skins?: ISkinTransaction[]
}

export interface ITransactionFilters {
  transactionId: string
  skinName: string
}