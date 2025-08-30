'use client'

import { UserAvatar } from '../UserAvatar/UserAvatar'
import { UserInfo } from '../UserInfo/UserInfo'
import { LanguageSelector } from '@/components/ui/LanguageSelector/LanguageSelector'
import { CurrencySelector } from '@/components/ui/CurrencySelector/CurrencySelector'
import { IUser } from '@/types'
import styles from './ProfileInfoBlock.module.scss'

interface IProfileInfoBlockProps {
  user: IUser
  onSteamLinkChange: (link: string) => void
  onLanguageChange: (language: string) => void
  onCurrencyChange: (currency: string) => void
}

export const ProfileInfoBlock = ({
  user,
  onSteamLinkChange,
  onLanguageChange,
  onCurrencyChange
}: IProfileInfoBlockProps) => {
  return (
    <div className={styles.profileInfoBlock}>
      <div className={styles.leftSection}>
        <UserAvatar
          src={user.avatar}
          alt={`Аватар пользователя ${user.username}`}
          size={80}
        />
      </div>

      <div className={styles.centerSection}>
        <UserInfo
          username={user.username}
          email={user.email}
          steamTradeUrl={user.steamTradeUrl || ''}
          onSteamLinkChange={onSteamLinkChange}
        />
      </div>

      <div className={styles.rightSection}>
        <div className={styles.settingsGroup}>
          <div className={styles.settingItem}>
            <span className={styles.settingLabel}>Язык:</span>
            <LanguageSelector
              selectedLanguage={user.language}
              onLanguageChange={onLanguageChange}
            />
          </div>
          <div className={styles.settingItem}>
            <span className={styles.settingLabel}>Валюта:</span>
            <CurrencySelector
              selectedCurrency={user.currency}
              onCurrencyChange={onCurrencyChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
