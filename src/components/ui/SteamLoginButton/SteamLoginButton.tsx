'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './SteamLoginButton.module.scss'
import steamButton from '@/assets/icons/steam-button.svg'
import { useAuth } from '@/hooks/useAuth'

interface ISteamLoginButtonProps {
  className?: string
  onError?: (error: string) => void
  disabled?: boolean
}

export const SteamLoginButton = ({
  className,
  onError,
  disabled = false
}: ISteamLoginButtonProps) => {
  const { login, isLoading } = useAuth()
  const [isLocalLoading, setIsLocalLoading] = useState(false)

  const handleLogin = async () => {
    try {
      setIsLocalLoading(true)
      await login()

      setIsLocalLoading(false)
    } catch (err) {
      const errorMessage = 'Ошибка авторизации через Steam. Попробуйте еще раз.'
      console.error('Ошибка авторизации в кнопке:', err)

      // Вызываем callback для обработки ошибки, если он передан
      if (onError) {
        onError(errorMessage)
      }
      setIsLocalLoading(false)
    }
  }

  const isButtonLoading = isLoading || isLocalLoading
  const isButtonDisabled = disabled || isButtonLoading

  return (
    <button
      className={`${styles.steamButton} ${className || ''} ${
        isButtonLoading ? styles.loading : ''
      }`}
      onClick={handleLogin}
      disabled={isButtonDisabled}
    >
      {isButtonLoading ? (
        <>
          <div className={styles.spinner} />
          Авторизация...
        </>
      ) : (
        <>
          <Image src={steamButton} alt='Steam' width={26} height={16} />
          Войти через Steam
        </>
      )}
    </button>
  )
}
