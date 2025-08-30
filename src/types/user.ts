// Типы для пользователя

export interface IUser {
  id: string
  username: string
  email: string
  avatar: string
  steamTradeUrl?: string
  balance: number
  currency: string
  language: string
}