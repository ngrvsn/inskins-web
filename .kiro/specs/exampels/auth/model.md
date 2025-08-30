import SteamSignIn from 'steam-signin'
import { api, privateApi } from '../config'
import type {
  IUserInfoResponse,
  IRefreshTokenResponse,
  ILogoutResponse
} from './types'

// Функция для генерации Steam redirect URL на фронте
export const getSteamRedirectUrl = (): string => {
  try {
    const realm = 'https://admin-inskins-in.t.letsmake.cc' // обновленный realm
    const returnUrl = `${realm}/auth/callback` // URL куда Steam вернет пользователя

    const steamAuth = new SteamSignIn(realm)
    const redirectUrl = steamAuth.getUrl(returnUrl)

    console.log('Generated Steam redirect URL:', redirectUrl)
    return redirectUrl
  } catch (error) {
    console.error('Failed to generate Steam redirect URL:', error)
    throw new Error('Failed to initiate Steam authentication')
  }
}

export const getCurrentUser = async (): Promise<IUserInfoResponse> => {
  const { data } = await privateApi.get<IUserInfoResponse>('/api/auth/me')
  return data
}

export const refreshAccessToken = async (
  refreshToken: string
): Promise<IRefreshTokenResponse> => {
  const { data } = await api.post<IRefreshTokenResponse>('/api/auth/refresh', {
    refresh_token: refreshToken
  })
  return data
}

export const logout = async (): Promise<ILogoutResponse> => {
  const { data } = await privateApi.post<ILogoutResponse>('/api/auth/logout')
  return data
}