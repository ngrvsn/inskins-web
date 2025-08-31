'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useDebounce } from '@/hooks/useDebounce'
import searchIcon from '@/assets/icons/search.svg'
import styles from './SearchInput.module.scss'

interface ISearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  debounceDelay?: number // Возможность настройки задержки дебаунса
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Поиск по скинам',
  className,
  debounceDelay = 300
}: ISearchInputProps) => {
  const [inputValue, setInputValue] = useState(value)
  const debouncedValue = useDebounce(inputValue, debounceDelay)

  // Синхронизируем внутреннее состояние с внешним значением
  useEffect(() => {
    setInputValue(value)
  }, [value])

  // Вызываем onChange только после дебаунса
  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue)
    }
  }, [debouncedValue, onChange, value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  return (
    <div className={`${styles.searchContainer} ${className || ''}`}>
      <Image src={searchIcon} alt='Поиск' className={styles.searchIcon} />
      <input
        type='text'
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        className={styles.searchInput}
      />
    </div>
  )
}
