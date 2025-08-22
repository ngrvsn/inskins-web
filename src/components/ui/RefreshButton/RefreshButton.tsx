'use client'

import Image from 'next/image'
import refreshIcon from '@/assets/icons/refresh.svg'
import styles from './RefreshButton.module.scss'

interface IRefreshButtonProps {
  onClick: () => void
  className?: string
}

export const RefreshButton = ({ onClick, className }: IRefreshButtonProps) => {
  return (
    <button
      className={`${styles.refreshButton} ${className || ''}`}
      onClick={onClick}
      type="button"
    >
      <Image src={refreshIcon} alt="Обновить" width={28} height={28} />
    </button>
  )
}