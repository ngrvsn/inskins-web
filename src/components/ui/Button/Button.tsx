'use client'

import { ReactNode } from 'react'
import styles from './Button.module.scss'

interface IButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'disabled'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  className = '',
  type = 'button'
}: IButtonProps) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || variant === 'disabled'}
    >
      {children}
    </button>
  )
}
