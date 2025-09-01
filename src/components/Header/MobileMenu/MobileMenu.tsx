import { FC } from 'react'
import { useRouter } from 'next/navigation'
import styles from './MobileMenu.module.scss'
import {
  CurrencySelector,
  LanguageSelector,
  SteamLoginButton,
  Spinner
} from '../../ui'
import { UserAvatar } from '../../Profile/UserAvatar/UserAvatar'

interface IProfileData {
  steamAvatar?: string
  displayName?: string
  steamNickname?: string
  balance?: number
  currency?: string
}

interface IMobileMenuProps {
  isOpen: boolean
  onClose: () => void
  isAuthenticated: boolean
  profileData?: IProfileData
  profileError?: string
  isProfileLoading: boolean
  onLogout: () => void
  onDepositClick: () => void
  onWithdrawClick: () => void
  onProfileClick: () => void
  onInventoryClick: () => void
  onReferralClick: () => void
  onRetryProfile: () => void
  activeTab: 'buy' | 'sell'
  activeNavItem: string
  onTabChange: (tab: 'buy' | 'sell') => void
  onNavItemChange: (item: string) => void
  selectedCurrency?: string
  selectedLanguage?: string
  onCurrencyChange?: (currency: string) => void
  onLanguageChange?: (language: string) => void
}

const MobileMenu: FC<IMobileMenuProps> = ({
  isOpen,
  onClose,
  isAuthenticated,
  profileData,
  profileError,
  isProfileLoading,
  onLogout,
  onDepositClick,
  onWithdrawClick,
  onProfileClick,
  onInventoryClick,
  onReferralClick,
  onRetryProfile
}) => {
  const router = useRouter()

  const handleNavClick = (path: string) => {
    router.push(path)
    onClose()
  }

  const handleActionClick = (action: () => void) => {
    action()
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}>
      <div className={styles.menuContent}>
        {/* Блок профиля для авторизованных пользователей */}
        {isAuthenticated ? (
          <div className={styles.profileSection}>
            {isProfileLoading ? (
              <div className={styles.loadingState}>
                <Spinner size='small' />
              </div>
            ) : profileError ? (
              <div className={styles.errorState}>
                <span>Ошибка загрузки профиля</span>
                <button onClick={onRetryProfile} className={styles.retryButton}>
                  Повторить
                </button>
              </div>
            ) : (
              <>
                <div className={styles.profileInfo}>
                  <UserAvatar
                    src={
                      profileData?.steamAvatar ||
                      'https://via.placeholder.com/48x48/49AA19/ffffff?text=U'
                    }
                    alt='Аватар пользователя'
                    size={48}
                  />
                  <div className={styles.userDetails}>
                    <div className={styles.username}>
                      {profileData?.displayName ||
                        profileData?.steamNickname ||
                        'Username'}
                    </div>
                    <div className={styles.balance}>
                      {profileData?.balance?.toFixed(2) || '0.00'}{' '}
                      {profileData?.currency || 'RUB'}{' '}
                      <span className={styles.balanceUsd}>
                        ({profileData?.balance?.toFixed(2) || '0.00'} USD)
                      </span>
                    </div>
                  </div>
                </div>

                <div className={styles.profileActions}>
                  <button
                    onClick={() => handleActionClick(onDepositClick)}
                    className={styles.profileActionButton}
                  >
                    Пополнить баланс
                  </button>
                  <button
                    onClick={() => handleActionClick(onWithdrawClick)}
                    className={styles.profileActionButton}
                  >
                    Вывести с баланса
                  </button>
                  <button
                    onClick={() => handleActionClick(onProfileClick)}
                    className={styles.profileActionButton}
                  >
                    Личный кабинет
                  </button>
                  <button
                    onClick={() => handleActionClick(onInventoryClick)}
                    className={styles.profileActionButton}
                  >
                    Инвентарь
                  </button>
                  <button
                    onClick={() => handleActionClick(onReferralClick)}
                    className={styles.profileActionButton}
                  >
                    Реферальный кабинет
                  </button>
                  <button
                    onClick={() => handleActionClick(onLogout)}
                    className={styles.logoutButton}
                  >
                    Выйти
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className={styles.authSection}>
            <SteamLoginButton onError={() => {}} />
          </div>
        )}

        {/* Навигационные кнопки */}
        <div className={styles.navigationSection}>
          <button
            onClick={() => handleNavClick('/')}
            className={styles.navButton}
          >
            Главная
          </button>
          <button
            onClick={() => handleNavClick('/buy')}
            className={styles.navButton}
          >
            Купить скины
          </button>
          <button
            onClick={() => handleNavClick('/sell')}
            className={styles.navButton}
          >
            Продать скины
          </button>
          <button
            onClick={() => handleNavClick('/market')}
            className={styles.navButton}
          >
            Маркет
          </button>
          <button
            onClick={() => handleNavClick('/blog')}
            className={styles.navButton}
          >
            Блог
          </button>
          <button
            onClick={() => handleNavClick('/faq')}
            className={styles.navButton}
          >
            FAQ
          </button>
        </div>

        {/* Селекторы валют и языка */}
        <div className={styles.selectorsSection}>
          <CurrencySelector />
          <LanguageSelector />
        </div>
      </div>
    </div>
  )
}

export default MobileMenu
