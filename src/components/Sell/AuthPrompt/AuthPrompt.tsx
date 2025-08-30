'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { SteamLoginButton, Spinner } from '@/components/ui'
import { useAuth } from '@/hooks/useAuth'
import styles from './AuthPrompt.module.scss'
import warningIcon from '@/assets/icons/information-warn.svg'

interface IAuthPromptProps {
  // Убираем onLogin, так как теперь SteamLoginButton сам управляет авторизацией
}

export const AuthPrompt = ({}: IAuthPromptProps) => {
  const { error: authError, isLoading: authLoading, clearError } = useAuth()
  const [localError, setLocalError] = useState<string | null>(null)

  // Обработка ошибок из хука useAuth
  useEffect(() => {
    if (authError) {
      setLocalError(authError)
      // Автоматически скрываем ошибку через 5 секунд
      const timer = setTimeout(() => {
        setLocalError(null)
        clearError()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [authError, clearError])

  const handleLoginError = (errorMessage: string) => {
    setLocalError(errorMessage)
    // Автоматически скрываем ошибку через 5 секунд
    setTimeout(() => setLocalError(null), 5000)
  }

  const displayError = localError || authError

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image
          src={warningIcon}
          alt='Предупреждение'
          width={40}
          height={40}
          className={styles.icon}
        />
        <h2 className={styles.title}>Авторизируйтесь через Steam</h2>
        <p className={styles.description}>
          Для того, чтобы обменять вещи на деньги.
        </p>

        {/* Отображение ошибок авторизации */}
        {displayError && (
          <div className={styles.errorMessage}>{displayError}</div>
        )}

        {/* Отображение состояния загрузки при авторизации */}
        {authLoading && (
          <div className={styles.loadingContainer}>
            <Spinner size='small' color='green' />
            <span className={styles.loadingText}>Проверка авторизации...</span>
          </div>
        )}

        <SteamLoginButton
          onError={handleLoginError}
          className={styles.loginButton}
          disabled={authLoading}
        />
      </div>
    </div>
  )
}
