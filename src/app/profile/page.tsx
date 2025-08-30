'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Breadcrumbs } from '@/components/ui/Breadcrumbs/Breadcrumbs'
import { PageTitle } from '@/components/ui/PageTitle/PageTitle'
import { ProfileInfoBlock } from '@/components/Profile/ProfileInfoBlock/ProfileInfoBlock'
import { ProfileTabs } from '@/components/Profile/ProfileTabs/ProfileTabs'
import { useAuth } from '@/hooks/useAuth'
import { IUser } from '@/types'
import styles from './page.module.scss'

const ProfilePage = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  // Моковые данные пользователя
  const [user, setUser] = useState<IUser>({
    id: '1',
    username: 'PlayerName',
    email: 'player@example.com',
    avatar: 'https://via.placeholder.com/80x80/49AA19/ffffff?text=P',
    steamTradeUrl: '',
    balance: 1250.5,
    currency: 'RUB',
    language: 'ru'
  })

  useEffect(() => {
    // Редирект неавторизованных пользователей на главную
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  // Обработчики изменений настроек
  const handleSteamLinkChange = (link: string) => {
    setUser((prev) => ({ ...prev, steamTradeUrl: link }))
  }

  const handleLanguageChange = (language: string) => {
    setUser((prev) => ({ ...prev, language }))
  }

  const handleCurrencyChange = (currency: string) => {
    setUser((prev) => ({ ...prev, currency }))
  }

  // Если пользователь не авторизован, показываем пустую страницу
  // (редирект произойдет в useEffect)
  if (!isAuthenticated) {
    return null
  }

  const breadcrumbItems = [{ label: 'Личный кабинет' }]

  return (
    <div className={styles.profilePage}>
      <div className={styles.container}>
        <Breadcrumbs items={breadcrumbItems} />
        <PageTitle title='Личный кабинет' />

        <ProfileInfoBlock
          user={user}
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
