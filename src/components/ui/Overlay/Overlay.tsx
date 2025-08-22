'use client'

import { ReactNode } from 'react'
import styles from './Overlay.module.scss'

interface IOverlayProps {
  children: ReactNode
  isOpen: boolean
  onClose: () => void
}

export const Overlay = ({ children, isOpen, onClose }: IOverlayProps) => {
  if (!isOpen) return null

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      {children}
    </div>
  )
}