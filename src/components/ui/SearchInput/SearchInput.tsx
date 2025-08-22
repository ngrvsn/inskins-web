'use client'

import Image from 'next/image'
import searchIcon from '@/assets/icons/search.svg'
import styles from './SearchInput.module.scss'

interface ISearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export const SearchInput = ({
  value,
  onChange,
  placeholder = 'Поиск по скинам',
  className
}: ISearchInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  return (
    <div className={`${styles.searchContainer} ${className || ''}`}>
      <Image src={searchIcon} alt="Поиск" className={styles.searchIcon} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={styles.searchInput}
      />
    </div>
  )
}