import { ReactNode } from 'react'
import Image from 'next/image'
import styles from './InfoBanner.module.scss'
import greenSmallInfo from '@/assets/icons/green-small-info.svg'
import informationWarn from '@/assets/icons/information-warn-green.svg'

interface IInfoBannerProps {
  children: ReactNode
  variant?: 'info' | 'warning'
  greenBorder?: boolean
  grayBackground?: boolean
  className?: string
}

export const InfoBanner = ({
  children,
  variant = 'warning',
  greenBorder = false,
  grayBackground = false,
  className
}: IInfoBannerProps) => {
  return (
    <div
      className={`${styles.banner} ${styles[variant]} ${
        greenBorder ? styles.greenBorder : ''
      } ${grayBackground ? styles.grayBackground : ''} ${className || ''}`}
    >
      <div className={styles.icon}>
        <Image
          src={variant === 'info' ? greenSmallInfo : informationWarn}
          alt={variant === 'info' ? 'Информация' : 'Предупреждение'}
          width={24}
          height={24}
        />
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}
