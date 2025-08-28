'use client'

import { ReactNode } from 'react'
import styles from './Button.module.scss'

interface IButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'disabled' | 'white' | 'dark'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  icon?: ReactNode
  iconPosition?: 'left' | 'right'
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  className = '',
  type = 'button',
  icon,
  iconPosition = 'left'
}: IButtonProps) => {
  const buttonClass = `${styles.button} ${styles[variant]} ${styles[size]} ${className}`

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled || variant === 'disabled'}
    >
      {icon && iconPosition === 'left' && (
        <span className={styles.iconLeft}>{icon}</span>
      )}
      <span className={styles.content}>{children}</span>
      {icon && iconPosition === 'right' && (
        <span className={styles.iconRight}>{icon}</span>
      )}
    </button>
  )
}
