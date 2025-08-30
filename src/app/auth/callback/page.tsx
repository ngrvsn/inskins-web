'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { handleSteamCallback } from '../../../api/auth/model'
import styles from './page.module.scss'

function CallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
    'loading'
  )
  const [message, setMessage] = useState('Обработка авторизации...')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        if (!searchParams) {
          throw new Error('Нет параметров для обработки')
        }

        const openidMode = searchParams.get('openid.mode')
        const openidSigned = searchParams.get('openid.signed')

        // Валидация параметров OpenID
        if (openidMode === 'id_res' && openidSigned) {
          // Используем API метод для обработки callback
          const response = await handleSteamCallback(searchParams)

          if (response.success && response.data && response.data.tokens) {
            // Токены автоматически сохраняются в handleSteamCallback

            // Показываем сообщение об успехе
            setStatus('success')
            setMessage('Авторизация успешна! Перенаправление...')

            // Принудительно обновляем страницу для инициализации хука useAuth
            setTimeout(() => {
              window.location.href = '/'
            }, 2000)
          } else {
            throw new Error(response.message || 'Токены не получены от сервера')
          }
        } else {
          console.error('Неверные параметры OpenID:', {
            openidMode,
            openidSigned
          })
          throw new Error('Неверные параметры авторизации Steam')
        }
      } catch (error) {
        console.error('Ошибка авторизации в callback:', error)
        setStatus('error')
        setMessage(
          error instanceof Error
            ? error.message
            : 'Произошла ошибка авторизации'
        )

        // Перенаправляем на страницу авторизации через 3 секунды
        setTimeout(() => {
          router.push('/auth')
        }, 3000)
      }
    }

    handleCallback()
  }, [searchParams, router])

  return (
    <div className={styles.container}>
      {status === 'loading' && <div className={styles.spinner}></div>}
      <div
        className={`${styles.message} ${
          status === 'success'
            ? styles.success
            : status === 'error'
            ? styles.error
            : ''
        }`}
      >
        {message}
      </div>
    </div>
  )
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.container}>
          <div className={styles.spinner}></div>
          <div className={styles.message}>Загрузка...</div>
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  )
}
