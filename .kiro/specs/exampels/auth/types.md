export interface ISteamAuthResponse {
  success: boolean
  data: string
  message: string
  timestamp: string
  requestId: string
}

export interface ICallbackResponse {
  success: boolean
  data: {
    tokens: {
      accessToken: string
      refreshToken: string
      expiration: number
      tokenType: string
    }
  }
  message: string
  timestamp: string
  requestId: string
}

// Данные пользователя из /api/auth/me
export interface IUserMeData {
  id: string
  steamId: string
  role: string
  status: string
}

export interface IUserInfoResponse {
  success: boolean
  data: IUserMeData
  message: string
  timestamp: string
  requestId: string
}

export interface IRefreshTokenResponse {
  success: boolean
  data: {
    accessToken: string
    refreshToken: string
    expiration: number
    tokenType: string
  }
  message: string
  timestamp: string
  requestId: string
}

export interface ILogoutResponse {
  success: boolean
  message: string
}