'use client'

import { useState } from 'react'
import Image from 'next/image'
import dropdownIcon from '@/assets/icons/white-dropdown.svg'
import cs2Icon from '@/assets/icons/cs2.svg'
import dota2Icon from '@/assets/icons/dota2.svg'
import rustIcon from '@/assets/icons/rust.svg'
import styles from './GameSelector.module.scss'

interface IGameOption {
  value: string
  label: string
  icon?: string
}

interface IGameSelectorProps {
  value: string
  onChange: (value: string) => void
  options: IGameOption[]
  className?: string
}

export const GameSelector = ({
  value,
  onChange,
  options,
  className
}: IGameSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  const selectedOption = options.find((opt) => opt.value === value)

  // Функция для получения иконки по значению игры
  const getGameIcon = (gameValue: string) => {
    switch (gameValue.toLowerCase()) {
      case '730': // CS2 game ID
      case 'cs2':
      case 'csgo':
      case 'counter-strike':
        return cs2Icon
      case '570': // Dota 2 game ID
      case 'dota2':
      case 'dota':
        return dota2Icon
      case '252490': // Rust game ID
      case 'rust':
        return rustIcon
      default:
        return null
    }
  }

  return (
    <div className={`${styles.dropdown} ${className || ''}`}>
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
        type='button'
      >
        {getGameIcon(selectedOption?.value || options[0]?.value) && (
          <Image
            src={getGameIcon(selectedOption?.value || options[0]?.value)!}
            alt={selectedOption?.label || options[0]?.label}
            width={32}
            height={32}
            className={styles.gameIcon}
          />
        )}
        <Image
          src={dropdownIcon}
          alt='dropdown'
          width={14}
          height={14}
          className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ''}`}
        />
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {options
            .filter(
              (option) =>
                option.value !== (selectedOption?.value || options[0]?.value)
            )
            .map((option) => (
              <button
                key={option.value}
                className={styles.dropdownItem}
                onClick={() => handleSelect(option.value)}
                type='button'
              >
                {getGameIcon(option.value) && (
                  <Image
                    src={getGameIcon(option.value)!}
                    alt={option.label}
                    width={32}
                    height={32}
                    className={styles.gameIcon}
                  />
                )}
              </button>
            ))}
        </div>
      )}
    </div>
  )
}
