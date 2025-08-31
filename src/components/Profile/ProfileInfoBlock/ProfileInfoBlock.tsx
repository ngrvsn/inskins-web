'use client'

import { UserAvatar } from '../UserAvatar/UserAvatar'
import { UserInfo } from '../UserInfo/UserInfo'
import { LanguageSelector } from '@/components/ui/LanguageSelector/LanguageSelector'
import { CurrencySelector } from '@/components/ui/CurrencySelector/CurrencySelector'
import { IUserMeData } from '@/api/users/types'
import styles from './ProfileInfoBlock.module.scss'

interface IProfileInfoBlockProps {
  user: IUserMeData
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
          src={user.steamAvatar}
          alt={`Аватар пользователя ${user.displayName || user.steamNickname}`}
          size={130}
        />
      </div>

      <div className={styles.centerSection}>
        <UserInfo
          username={user.displayName || user.steamNickname}
          email={user.email}
          steamTradeUrl={user.steamTradeUrl || ''}
          onSteamLinkChange={onSteamLinkChange}
        />
      </div>

      <div className={styles.rightSection}>
        <div className={styles.settingsGroup}>
          <div className={styles.settingItem}>
            <CurrencySelector
              selectedCurrency={user.currency}
              onCurrencyChange={onCurrencyChange}
            />
          </div>
          <div className={styles.settingItem}>
            <LanguageSelector
              selectedLanguage={user.language}
              onLanguageChange={onLanguageChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
