'use client'

import Image from 'next/image'
import { SteamLoginButton } from '@/components/ui'
import styles from './AuthPrompt.module.scss'
import warningIcon from '@/assets/icons/information-warn.svg'

interface IAuthPromptProps {
  onLogin: () => void
}

export const AuthPrompt = ({ onLogin }: IAuthPromptProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Image
          src={warningIcon}
          alt='Предупреждение'
          width={40}
          height={40}
          className={styles.icon}
        />
        <h2 className={styles.title}>Авторизируйтесь через Steam</h2>
        <p className={styles.description}>
          Для того, чтобы обменять вещи на деньги.
        </p>
        <SteamLoginButton onClick={onLogin} className={styles.loginButton} />
      </div>
    </div>
  )
}
