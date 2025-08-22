'use client'

import { useState, useRef, useEffect } from 'react'
import styles from './CurrencySelector.module.scss'

interface ICurrency {
  code: string
  name: string
  symbol: string
}

const currencies: ICurrency[] = [
  { code: 'RUB', name: 'Российский рубль', symbol: '₽' },
  { code: 'USD', name: 'Доллар США', symbol: '$' },
  { code: 'EUR', name: 'Евро', symbol: '€' },
  { code: 'CNY', name: 'Китайский юань', symbol: '¥' }
]

interface ICurrencySelectorProps {
  selectedCurrency?: string
  onCurrencyChange?: (currency: string) => void
}

export const CurrencySelector = ({
  selectedCurrency = 'RUB',
  onCurrencyChange
}: ICurrencySelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(selectedCurrency)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedCurrencyData = currencies.find(c => c.code === selected)

  const handleSelect = (currencyCode: string) => {
    setSelected(currencyCode)
    setIsOpen(false)
    onCurrencyChange?.(currencyCode)
  }

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  // Закрытие при клике вне компонента
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={styles.currencySelector} ref={dropdownRef}>
      <button
        className={`${styles.trigger} ${isOpen ? styles.open : ''}`}
        onClick={handleToggle}
      >
        <span className={styles.symbol}>{selectedCurrencyData?.symbol}</span>
        <span className={styles.code}>{selectedCurrencyData?.code}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.up : styles.down}`}>
          {isOpen ? '▲' : '▼'}
        </span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {currencies.map((currency) => (
            <button
              key={currency.code}
              className={`${styles.option} ${currency.code === selected ? styles.selected : ''}`}
              onClick={() => handleSelect(currency.code)}
            >
              <span className={styles.symbol}>{currency.symbol}</span>
              <span className={styles.code}>{currency.code}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}