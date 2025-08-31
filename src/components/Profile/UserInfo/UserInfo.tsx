'use client'

import { SteamLinkInput } from '@/components/ui/SteamLinkInput/SteamLinkInput'
import Image from 'next/image'
import shareIcon from '@/assets/icons/share-url.svg'
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
        <span className={styles.steamLinkLabel}>Steam trade URL:</span>
        <Image src={shareIcon} alt='Share URL' width={22} height={22} />
        <SteamLinkInput
          initialValue={steamTradeUrl}
          onLinkChange={(link) => onSteamLinkChange(link)}
        />
      </div>
    </div>
  )
}
