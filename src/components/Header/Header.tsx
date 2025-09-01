'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import styles from './Header.module.scss'
import logo from '@/assets/images/logo.png'
import dropdownIcon from '@/assets/icons/icon-dropdown.svg'
import cartIcon from '@/assets/icons/cart.svg'
import { CurrencySelector, SteamLoginButton, Spinner } from '@/components/ui'
import { BalanceModal } from '@/components/BalanceModal/BalanceModal'
import MobileMenu from './MobileMenu/MobileMenu'
import MobileMenuOverlay from './MobileMenuOverlay/MobileMenuOverlay'
import mobileMenuIcon from '@/assets/icons/mobile-menu.svg'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'

export const Header = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, logout, isLoading: authLoading } = useAuth()
  const {
    profileData,
    isLoading: profileLoading,
    error: profileError,
    refreshProfile
  } = useProfile()

  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy') // 'buy' или 'sell'
  const [activeNavItem, setActiveNavItem] = useState('main') // 'main', 'market', 'blog', 'faq'
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false) // состояние выпадающего меню
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false) // модалка пополнения
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false) // модалка вывода
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // состояние мобильного меню

  const profileRef = useRef<HTMLDivElement>(null)

  const handleLoginError = (error: string) => {
    // Можно добавить toast уведомление или другую обработку ошибок
    console.error('Ошибка авторизации в Header:', error)
  }

  // Определяем состояние загрузки - показываем спиннер если загружается авторизация или профиль
  const isLoading = authLoading || (isAuthenticated && profileLoading)

  // Обработка ошибок профиля
  useEffect(() => {
    if (profileError) {
      console.error('Ошибка загрузки профиля в Header:', profileError)
      // Можно добавить toast уведомление
    }
  }, [profileError])

  const handleLogout = async () => {
    try {
      await logout()
      setIsProfileDropdownOpen(false)
    } catch (error) {
      console.error('Ошибка выхода из системы:', error)
      // Закрываем меню даже при ошибке
      setIsProfileDropdownOpen(false)
    }
  }

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen)
  }

  const handleDepositClick = () => {
    setIsDepositModalOpen(true)
    setIsProfileDropdownOpen(false)
  }

  const handleWithdrawClick = () => {
    setIsWithdrawModalOpen(true)
    setIsProfileDropdownOpen(false)
  }

  const handleProfileClick = () => {
    router.push('/profile')
    setIsProfileDropdownOpen(false)
  }

  const handleRetryProfile = async () => {
    try {
      await refreshProfile()
    } catch (error) {
      console.error('Ошибка повторной загрузки профиля:', error)
    }
  }

  const handleBuyClick = () => {
    setActiveTab('buy')
    router.push('/')
  }

  const handleSellClick = () => {
    setActiveTab('sell')
    router.push('/sell')
  }

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false)
  }

  const handleMobileDepositClick = () => {
    setIsDepositModalOpen(true)
    setIsMobileMenuOpen(false)
  }

  const handleMobileWithdrawClick = () => {
    setIsWithdrawModalOpen(true)
    setIsMobileMenuOpen(false)
  }

  const handleMobileProfileClick = () => {
    router.push('/profile')
    setIsMobileMenuOpen(false)
  }

  const handleMobileLogout = async () => {
    try {
      await logout()
      setIsMobileMenuOpen(false)
    } catch (error) {
      console.error('Ошибка выхода из системы:', error)
      setIsMobileMenuOpen(false)
    }
  }

  const handleMobileLogin = () => {
    // Логика входа через Steam будет обработана в SteamLoginButton
    setIsMobileMenuOpen(false)
  }

  // Определяем активную вкладку на основе текущего пути
  useEffect(() => {
    if (pathname === '/sell') {
      setActiveTab('sell')
      setActiveNavItem('')
    } else if (pathname === '/market') {
      setActiveNavItem('market')
    } else if (pathname === '/') {
      setActiveTab('buy')
      setActiveNavItem('main')
    }
  }, [pathname])

  // Закрытие выпадающего меню при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false)
      }
    }

    if (isProfileDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isProfileDropdownOpen])

  return (
    <header className={styles.header}>
      <div className={`${styles.container} container`}>
        <div className={styles.logoContainer}>
          <Link href='/' className={styles.logo}>
            <Image src={logo} alt='Inskins' width={128} height={53} priority />
          </Link>

          {/* Центральные кнопки - Купить/Продать скины */}
          <div className={styles.actionButtons}>
            <button
              className={`${styles.actionButton} ${
                activeTab === 'buy' ? styles.active : ''
              }`}
              onClick={handleBuyClick}
            >
              Купить скины
            </button>
            <button
              className={`${styles.actionButton} ${
                activeTab === 'sell' ? styles.active : ''
              }`}
              onClick={handleSellClick}
            >
              Продать скины
            </button>
          </div>
        </div>
        {/* Навигация */}
        <nav className={styles.navigation}>
          <Link
            href='/'
            className={`${styles.navItem} ${
              activeNavItem === 'main' ? styles.activeNav : ''
            }`}
            onClick={() => setActiveNavItem('main')}
          >
            Главная
          </Link>
          <Link
            href='/market'
            className={`${styles.navItem} ${
              activeNavItem === 'market' ? styles.activeNav : ''
            }`}
            onClick={() => setActiveNavItem('market')}
          >
            Маркет
          </Link>
          <Link
            href='/blog'
            className={`${styles.navItem} ${
              activeNavItem === 'blog' ? styles.activeNav : ''
            }`}
            onClick={() => setActiveNavItem('blog')}
          >
            Блог
          </Link>
          <Link
            href='/faq'
            className={`${styles.navItem} ${
              activeNavItem === 'faq' ? styles.activeNav : ''
            }`}
            onClick={() => setActiveNavItem('faq')}
          >
            FAQ
          </Link>
        </nav>

        {/* Правая часть - валюта и вход */}
        <div className={styles.rightSection}>
          {/* Селектор валюты или корзина */}
          {!isAuthenticated && !isLoading ? (
            <CurrencySelector />
          ) : isAuthenticated ? (
            <button className={styles.cartButton}>
              <Image src={cartIcon} alt='Корзина' width={16} height={16} />
              <span className={styles.cartText}>КОРЗИНА</span>
            </button>
          ) : null}

          {/* Мобильные элементы управления */}
          <div className={styles.mobileControls}>
            {/* Кнопка мобильного меню */}
            <button
              className={styles.mobileMenuButton}
              onClick={handleMobileMenuToggle}
              aria-label='Открыть мобильное меню'
            >
              <Image src={mobileMenuIcon} alt='Меню' width={25} height={25} />
            </button>
          </div>

          {/* Кнопка входа через Steam, состояние загрузки или профиль пользователя */}
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <Spinner size='small' />
            </div>
          ) : !isAuthenticated ? (
            <SteamLoginButton onError={handleLoginError} />
          ) : (
            <div className={styles.profileContainer} ref={profileRef}>
              <button
                className={styles.profileButton}
                onClick={toggleProfileDropdown}
              >
                <Image
                  src={
                    profileData?.steamAvatar ||
                    'https://via.placeholder.com/28x28/49AA19/ffffff?text=U'
                  }
                  alt='Аватар'
                  width={28}
                  height={28}
                  className={styles.avatar}
                />
                <div className={styles.balanceInfo}>
                  <span className={styles.balance}>
                    {profileData?.balance?.toFixed(2) || '0.00'}{' '}
                    {profileData?.currency || '₽'}
                    <span className={styles.balanceSecondary}>
                      ({profileData?.balance?.toFixed(2) || '0.00'} USD)
                    </span>
                  </span>
                </div>
                <Image
                  src={dropdownIcon}
                  alt='Dropdown'
                  width={12}
                  height={12}
                  className={`${styles.dropdownIcon} ${
                    isProfileDropdownOpen ? styles.rotated : ''
                  }`}
                />
              </button>

              {isProfileDropdownOpen && (
                <div className={styles.profileDropdown}>
                  {profileError ? (
                    <div className={styles.dropdownError}>
                      <span className={styles.errorText}>
                        Ошибка загрузки профиля
                      </span>
                      <button
                        className={styles.retryButton}
                        onClick={handleRetryProfile}
                      >
                        Повторить
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className={styles.dropdownHeader}>
                        <span className={styles.usernameLabel}>Username</span>
                        <span className={styles.username}>
                          {profileData?.displayName ||
                            profileData?.steamNickname ||
                            'Пользователь'}
                        </span>
                      </div>

                      <div className={styles.dropdownSeparator}></div>

                      <div className={styles.dropdownMenu}>
                        <button
                          className={styles.dropdownItem}
                          onClick={handleDepositClick}
                        >
                          Пополнить баланс
                        </button>
                        <button
                          className={styles.dropdownItem}
                          onClick={handleWithdrawClick}
                        >
                          Вывести с баланса
                        </button>
                        <button
                          className={styles.dropdownItem}
                          onClick={handleProfileClick}
                        >
                          Личный кабинет
                        </button>
                        <button className={styles.dropdownItem}>
                          Инвентарь
                        </button>
                        <button className={styles.dropdownItem}>
                          Реферальный кабинет
                        </button>
                      </div>

                      <div className={styles.dropdownSeparator}></div>

                      <button
                        className={styles.logoutButton}
                        onClick={handleLogout}
                      >
                        Выйти
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Мобильное меню и оверлей */}
      <MobileMenuOverlay
        isVisible={isMobileMenuOpen}
        onClick={handleMobileMenuClose}
      />
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        isAuthenticated={isAuthenticated}
        profileData={profileData || undefined}
        profileError={profileError || undefined}
        isProfileLoading={profileLoading}
        onLogout={handleMobileLogout}
        onDepositClick={handleMobileDepositClick}
        onWithdrawClick={handleMobileWithdrawClick}
        onProfileClick={handleMobileProfileClick}
        onInventoryClick={() => {}} // Заглушка для инвентаря
        onReferralClick={() => {}} // Заглушка для реферальной программы
        onRetryProfile={handleRetryProfile}
        activeTab={activeTab}
        activeNavItem={activeNavItem}
        onTabChange={setActiveTab}
        onNavItemChange={setActiveNavItem}
      />

      {/* Модалки баланса */}
      <BalanceModal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        type='deposit'
      />
      <BalanceModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        type='withdraw'
      />
    </header>
  )
}
