'use client'

import { SteamLinkInput } from '@/components/ui/SteamLinkInput/SteamLinkInput'
import styles from './UserInfo.module.scss'

interface IUserInfoProps {
  username: string
  email: string
  steamTradeUrl: string
  onSteamLinkChange: (link: string) => void
}

export const UserInfo = ({
  username,
  email,
  steamTradeUrl,
  onSteamLinkChange
}: IUserInfoProps) => {
  return (
    <div className={styles.userInfo}>
      <div className={styles.username}>{username}</div>
      <div className={styles.email}>{email}</div>
      <div className={styles.steamLinkWrapper}>
        <SteamLinkInput
          initialValue={steamTradeUrl}
          onLinkChange={onSteamLinkChange}
        />
      </div>
    </div>
  )
}
