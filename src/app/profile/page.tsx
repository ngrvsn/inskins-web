'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs/Breadcrumbs'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import { ProfileInfoBlock } from '@/components/Profile/ProfileInfoBlock/ProfileInfoBlock'
import { ProfileTabs } from '@/components/Profile/ProfileTabs/ProfileTabs'
import { Spinner } from '@/components/ui/Spinner/Spinner'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'
import styles from './page.module.scss'

const ProfilePage = () => {
  const router = useRouter()
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const { profileData, isLoading, error, refreshProfile, clearError } =
    useProfile()

  useEffect(() => {
    // Редирект неавторизованных пользователей на главную
    // Ждем завершения загрузки авторизации перед редиректом
    if (!authLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, authLoading, router])

  // Обработчики изменений настроек
  const handleSteamLinkChange = (link: string) => {
    // TODO: Реализовать сохранение изменений через API
    console.log('Изменение Steam trade URL:', link)
  }

  const handleLanguageChange = (language: string) => {
    // TODO: Реализовать сохранение изменений через API
    console.log('Изменение языка:', language)
  }

  const handleCurrencyChange = (currency: string) => {
    // TODO: Реализовать сохранение изменений через API
    console.log('Изменение валюты:', currency)
  }

  // Если авторизация еще загружается, показываем индикатор загрузки
  if (authLoading) {
    return (
      <div className={styles.profilePage}>
        <div className={styles.container}>
          <div className={styles.loadingContainer}>
            <Spinner />
            <p className={styles.loadingText}>Проверка авторизации...</p>
          </div>
        </div>
      </div>
    )
  }

  // Если пользователь не авторизован, показываем пустую страницу (редирект произойдет в useEffect)
  if (!isAuthenticated) {
    return null
  }

  // Показываем индикатор загрузки
  if (isLoading) {
    return (
      <div className={styles.profilePage}>
        <div className={styles.container}>
          <div className={styles.loadingContainer}>
            <Spinner />
            <p className={styles.loadingText}>Загрузка данных профиля...</p>
          </div>
        </div>
      </div>
    )
  }

  // Показываем ошибку с возможностью повторной загрузки
  if (error) {
    return (
      <div className={styles.profilePage}>
        <div className={styles.container}>
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>Ошибка загрузки данных профиля:</p>
            <p className={styles.errorMessage}>{error}</p>
            <button
              className={styles.retryButton}
              onClick={() => {
                clearError()
                refreshProfile()
              }}
            >
              Попробовать снова
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Если данные профиля не загружены
  if (!profileData) {
    return (
      <div className={styles.profilePage}>
        <div className={styles.container}>
          <div className={styles.errorContainer}>
            <p className={styles.errorText}>Данные профиля недоступны</p>
            <button className={styles.retryButton} onClick={refreshProfile}>
              Обновить
            </button>
          </div>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [{ label: 'Личный кабинет' }]

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <Breadcrumbs items={breadcrumbItems} />
        <PageTitle title='Личный кабинет' />

        <ProfileInfoBlock
          user={profileData}
          onSteamLinkChange={handleSteamLinkChange}
          onLanguageChange={handleLanguageChange}
          onCurrencyChange={handleCurrencyChange}
        />

        <ProfileTabs />
      </div>
    </div>
  )
}

export default ProfilePage
