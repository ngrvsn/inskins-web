'use client'

import { useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Spin, App } from 'antd'

function CallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { message } = App.useApp()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        if (!searchParams) {
          throw new Error('Нет параметров для обработки')
        }

        const openidMode = searchParams.get('openid.mode')
        const openidSigned = searchParams.get('openid.signed')

        if (openidMode === 'id_res' && openidSigned) {
          const response = await fetch(`/api/auth/steam/callback?${searchParams.toString()}`, {
            method: 'GET',
            headers: {
              'Accept': 'application/json'
            }
          })

          if (!response.ok) {
            throw new Error(`Ошибка прокси: ${response.status}`)
          }

          const data = await response.json()

          // Токены в корне ответа
          if (data.access_token) {
            localStorage.setItem('access_token', data.access_token)

            if (data.refresh_token) {
              localStorage.setItem('refresh_token', data.refresh_token)
            }

            message.success('Авторизация успешна!')
            router.push('/users')
          } else {
            throw new Error('Токены не получены от бэкенда')
          }
        } else {
          throw new Error('Неверные параметры авторизации')
        }
      } catch (error) {
        message.error(error instanceof Error ? error.message : 'Ошибка авторизации')
        router.push('/auth')
      }
    }

    handleCallback()
  }, [searchParams, router, message])

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <Spin size='large' />
      <div>Обработка авторизации...</div>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <App>
      <Suspense fallback={
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <Spin size='large' />
        </div>
      }>
        <CallbackContent />
      </Suspense>
    </App>
  )
}