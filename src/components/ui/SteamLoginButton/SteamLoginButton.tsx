'use client'

import Image from 'next/image'
import styles from './SteamLoginButton.module.scss'
import steamButton from '@/assets/icons/steam-button.svg'

interface ISteamLoginButtonProps {
  onClick: () => void
  className?: string
}

export const SteamLoginButton = ({
  onClick,
  className
}: ISteamLoginButtonProps) => {
  return (
    <button
      className={`${styles.steamButton} ${className || ''}`}
      onClick={onClick}
    >
      <Image src={steamButton} alt='Steam' width={16} height={16} />
      Войти через Steam
    </button>
  )
}
