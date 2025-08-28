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