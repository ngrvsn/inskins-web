'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import styles from './Header.module.scss'
import logo from '@/assets/images/logo.png'
import steamButton from '@/assets/icons/steam-button.svg'
import dropdownIcon from '@/assets/icons/icon-dropdown.svg'
import cartIcon from '@/assets/icons/cart.svg'
import { CurrencySelector, SteamLoginButton } from '@/components/ui'
import { BalanceModal } from '@/components/BalanceModal/BalanceModal'
import { useAuth } from '@/hooks/useAuth'

export const Header = () => {
  const router = useRouter()
  const pathname = usePathname()
  const { isAuthenticated, user, login, logout } = useAuth()

  const [activeTab, setActiveTab] = useState('buy') // 'buy' или 'sell'
  const [activeNavItem, setActiveNavItem] = useState('main') // 'main', 'market', 'blog', 'faq'
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false) // состояние выпадающего меню
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false) // модалка пополнения
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false) // модалка вывода

  const profileRef = useRef<HTMLDivElement>(null)

  const handleLogin = () => {
    login()
  }

  const handleLogout = () => {
    logout()
    setIsProfileDropdownOpen(false)
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

  const handleBuyClick = () => {
    setActiveTab('buy')
    router.push('/')
  }

  const handleSellClick = () => {
    setActiveTab('sell')
    router.push('/sell')
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
          {!isAuthenticated ? (
            <CurrencySelector />
          ) : (
            <button className={styles.cartButton}>
              <Image src={cartIcon} alt='Корзина' width={16} height={16} />
              КОРЗИНА
            </button>
          )}

          {/* Кнопка входа через Steam или профиль пользователя */}
          {!isAuthenticated ? (
            <SteamLoginButton onClick={handleLogin} />
          ) : (
            <div className={styles.profileContainer} ref={profileRef}>
              <button
                className={styles.profileButton}
                onClick={toggleProfileDropdown}
              >
                <Image
                  src={user?.avatar || ''}
                  alt='Аватар'
                  width={28}
                  height={28}
                  className={styles.avatar}
                />
                <div className={styles.balanceInfo}>
                  <span className={styles.balance}>
                    {user?.balance} {user?.currency}
                    <span className={styles.balanceSecondary}>
                      ({user?.balance}
                      {user?.currencySecondary})
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
                  <div className={styles.dropdownHeader}>
                    <span className={styles.usernameLabel}>Username</span>
                    <span className={styles.username}>{user?.username}</span>
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
                    <button className={styles.dropdownItem}>
                      Личный кабинет
                    </button>
                    <button className={styles.dropdownItem}>Инвентарь</button>
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
                </div>
              )}
            </div>
          )}
        </div>
      </div>

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
