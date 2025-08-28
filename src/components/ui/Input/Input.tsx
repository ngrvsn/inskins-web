'use client'

import { forwardRef, InputHTMLAttributes } from 'react'
import styles from './Input.module.scss'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  isValid?: boolean
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  ({ label, error, isValid, className = '', ...props }, ref) => {
    const inputClass = `${styles.input} ${error ? styles.error : ''} ${
      isValid ? styles.valid : ''
    } ${className}`

    return (
      <div className={styles.container}>
        {label && <label className={styles.label}>{label}</label>}
        <input ref={ref} className={inputClass} {...props} />
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
