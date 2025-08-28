'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import whiteDropdownIcon from '@/assets/icons/white-dropdown.svg'
import styles from './WeaponSelector.module.scss'

interface IWeaponOption {
  value: string
  label: string
}

interface IWeaponSelectorProps {
  value: string
  onChange: (weapon: string) => void
  options: IWeaponOption[]
}

export const WeaponSelector = ({
  value,
  onChange,
  options
}: IWeaponSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((option) => option.value === value)

  const handleSelect = (weaponValue: string) => {
    onChange(weaponValue)
    setIsOpen(false)
  }

  // Закрытие дропдауна при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className={styles.weaponSelector} ref={containerRef}>
      <button
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        type='button'
      >
        <span>{selectedOption?.label || 'Выберите оружие'}</span>
        <Image
          src={whiteDropdownIcon}
          alt='Dropdown'
          width={12}
          height={12}
          className={`${styles.icon} ${isOpen ? styles.open : ''}`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {options.map((option) => (
            <button
              key={option.value}
              className={`${styles.option} ${
                option.value === value ? styles.selected : ''
              }`}
              onClick={() => handleSelect(option.value)}
              type='button'
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
