'use client'

import { useState, useEffect } from 'react'
import { Button, message } from 'antd'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { getSteamRedirectUrl } from '@/api'
import { Title } from '@/components/ui'
import styles from './auth.module.scss'

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Если пользователь уже залогинен, редиректим на главную
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      router.push('/users')
    }
  }, [router])

  const handleSteamLogin = async () => {
    try {
      setIsLoading(true)

      // Генерируем Steam URL прямо на фронте
      const steamUrl = getSteamRedirectUrl()

      // Прямой редирект на Steam
      window.location.href = steamUrl
    } catch (error) {
      console.error('Steam login error:', error)
      message.error('Произошла ошибка при подключении к Steam')
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Image
          src='/icons/logo.svg'
          alt='logo'
          width={163.499}
          height={68.429}
          style={{ marginBottom: 64 }}
        />
        <Title level={2} style={{ marginBottom: 22 }}>
          Вход в админ-панель
        </Title>
        <Button
          type='primary'
          size='large'
          loading={isLoading}
          onClick={handleSteamLogin}
          icon={
            !isLoading && (
              <Image
                src='/icons/steam.svg'
                alt='steam icon'
                width={22.099}
                height={12}
              />
            )
          }
        >
          {isLoading ? 'Подключение к Steam...' : 'Войти через Steam'}
        </Button>
      </div>
    </div>
  )
}
