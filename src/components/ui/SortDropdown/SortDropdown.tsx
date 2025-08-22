'use client'

import { useState } from 'react'
import Image from 'next/image'
import sortIcon from '@/assets/icons/sort-icon.svg'
import styles from './SortDropdown.module.scss'

interface ISortOption {
  value: 'asc' | 'desc'
  label: string
}

interface ISortDropdownProps {
  value: 'asc' | 'desc'
  onChange: (value: 'asc' | 'desc') => void
  className?: string
}

const sortOptions: ISortOption[] = [
  { value: 'asc', label: 'Дешевле' },
  { value: 'desc', label: 'Дороже' }
]

export const SortDropdown = ({ value, onChange, className }: ISortDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (sortValue: 'asc' | 'desc') => {
    onChange(sortValue)
    setIsOpen(false)
  }

  const selectedOption = sortOptions.find(opt => opt.value === value)

  return (
    <div className={`${styles.dropdown} ${className || ''}`}>
      <button
        className={styles.dropdownButton}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <Image src={sortIcon} alt="Сортировка" className={styles.sortIcon} />
        <span>{selectedOption?.label}</span>
      </button>
      {isOpen && (
        <div className={styles.dropdownMenu}>
          {sortOptions.map(option => (
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