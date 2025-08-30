'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './LanguageSelector.module.scss'
import Image from 'next/image'
import dropdownIcon from '@/assets/icons/white-dropdown.svg'
import russianFlag from '@/assets/icons/russian-flag.svg'

interface ILanguage {
  code: string
  name: string
  flag: string
}

const languages: ILanguage[] = [
  { code: 'ru', name: 'Русский', flag: russianFlag },
  { code: 'en', name: 'English', flag: russianFlag }, // Пока используем русский флаг для всех
  { code: 'zh', name: '中文', flag: russianFlag }
]

interface ILanguageSelectorProps {
  selectedLanguage?: string
  onLanguageChange?: (language: string) => void
}

export const LanguageSelector = ({
  selectedLanguage = 'ru',
  onLanguageChange
}: ILanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(selectedLanguage)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedLanguageData = languages.find((l) => l.code === selected)

  const handleSelect = (languageCode: string) => {
    setSelected(languageCode)
    setIsOpen(false)
    onLanguageChange?.(languageCode)
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={styles.languageSelector} ref={dropdownRef}>
      <button
        className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
        onClick={handleToggle}
      >
        <Image
          src={selectedLanguageData?.flag || russianFlag}
          alt={selectedLanguageData?.name || 'Русский'}
          width={16}
          height={16}
          className={styles.flag}
        />
        <span className={styles.name}>{selectedLanguageData?.name}</span>
        <Image
          src={dropdownIcon}
          alt='dropdown'
          width={12}
          height={12}
          className={`${styles.dropdownIcon} ${isOpen ? styles.rotated : ''}`}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {languages.map((language) => (
            <button
              key={language.code}
              className={`${styles.option} ${
                language.code === selected ? styles.selected : ''
              }`}
              onClick={() => handleSelect(language.code)}
            >
              <Image
                src={language.flag}
                alt={language.name}
                width={16}
                height={16}
                className={styles.flag}
              />
              <span className={styles.name}>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
