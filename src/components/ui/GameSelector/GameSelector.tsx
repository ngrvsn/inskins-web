'use client'

import { useState } from 'react'
import Image from 'next/image'
import dropdownIcon from '@/assets/icons/white-dropdown.svg'
import styles from './GameSelector.module.scss'

interface IGameOption {
  value: string
  label: string
}

interface IGameSelectorProps {
  value: string
  onChange: (value: string) => void
  options: IGameOption[]
  className?: string
}

export const GameSelector = ({ value, onChange, options, className }: IGameSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  const selectedOption = options.find(opt => opt.value === value)

  return (
    <div className={`${styles.dropdown} ${className || ''}`}>
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span>{selectedOption?.label || options[0]?.label}</span>
             <Image
              src={dropdownIcon}
              alt="dropdown"
              width={14}
              height={14}
              className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
            />
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options.map(option => (
            <button
              key={option.value}
              className={styles.dropdownItem}
              onClick={() => handleSelect(option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}