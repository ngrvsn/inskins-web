'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './CountryBankSelector.module.scss'
import dropdownIcon from '@/assets/icons/white-dropdown.svg'

interface ICountryOption {
  code: string
  name: string
  flag: string
}

interface IBankOption {
  id: string
  name: string
  country: string
}

interface ICountryBankSelectorProps {
  selectedCountry: string
  selectedBank: string
  onCountryChange: (country: string) => void
  onBankChange: (bank: string) => void
}

// Мок данные стран
const countries: ICountryOption[] = [
  { code: 'RU', name: 'Россия', flag: '🇷🇺' },
  { code: 'US', name: 'США', flag: '🇺🇸' },
  { code: 'EU', name: 'Европа', flag: '🇪🇺' }
]

// Мок данные банков
const banks: IBankOption[] = [
  { id: 'sber', name: 'Сбербанк', country: 'RU' },
  { id: 'vtb', name: 'ВТБ', country: 'RU' },
  { id: 'alpha', name: 'Альфа-Банк', country: 'RU' },
  { id: 'chase', name: 'Chase Bank', country: 'US' },
  { id: 'bofa', name: 'Bank of America', country: 'US' },
  { id: 'wells', name: 'Wells Fargo', country: 'US' },
  { id: 'deutsche', name: 'Deutsche Bank', country: 'EU' },
  { id: 'bnp', name: 'BNP Paribas', country: 'EU' },
  { id: 'ing', name: 'ING Bank', country: 'EU' }
]

export const CountryBankSelector = ({
  selectedCountry,
  selectedBank,
  onCountryChange,
  onBankChange
}: ICountryBankSelectorProps) => {
  const [isCountryOpen, setIsCountryOpen] = useState(false)
  const [isBankOpen, setIsBankOpen] = useState(false)

  const currentCountry = countries.find((c) => c.code === selectedCountry)
  const availableBanks = banks.filter((b) => b.country === selectedCountry)
  const currentBank = availableBanks.find((b) => b.id === selectedBank)

  const handleCountryChange = (countryCode: string) => {
    onCountryChange(countryCode)
    // Сбрасываем выбранный банк при смене страны
    const newAvailableBanks = banks.filter((b) => b.country === countryCode)
    if (newAvailableBanks.length > 0) {
      onBankChange(newAvailableBanks[0].id)
    }
    setIsCountryOpen(false)
  }

  const handleBankChange = (bankId: string) => {
    onBankChange(bankId)
    setIsBankOpen(false)
  }

  return (
    <div className={styles.container}>
      {/* Селектор страны */}
      <div className={styles.selector}>
        <div className={styles.selectorWrapper}>
          <button
            className={`${styles.selectorButton} ${
              isCountryOpen ? styles.open : ''
            }`}
            onClick={() => setIsCountryOpen(!isCountryOpen)}
          >
            <span className={styles.flag}>{currentCountry?.flag}</span>
            <span className={styles.text}>{currentCountry?.name}</span>
            <Image
              src={dropdownIcon}
              alt='dropdown'
              width={12}
              height={12}
              className={`${styles.dropdownIcon} ${
                isCountryOpen ? styles.rotated : ''
              }`}
            />
          </button>

          {isCountryOpen && (
            <div className={styles.dropdown}>
              {countries.map((country) => (
                <button
                  key={country.code}
                  className={`${styles.option} ${
                    country.code === selectedCountry ? styles.selected : ''
                  }`}
                  onClick={() => handleCountryChange(country.code)}
                >
                  <span className={styles.flag}>{country.flag}</span>
                  <span className={styles.text}>{country.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Селектор банка */}
      <div className={styles.selector}>
        <div className={styles.selectorWrapper}>
          <button
            className={`${styles.selectorButton} ${
              isBankOpen ? styles.open : ''
            }`}
            onClick={() => setIsBankOpen(!isBankOpen)}
          >
            <span className={styles.text}>
              {currentBank?.name || 'Выберите банк'}
            </span>
            <Image
              src={dropdownIcon}
              alt='dropdown'
              width={12}
              height={12}
              className={`${styles.dropdownIcon} ${
                isBankOpen ? styles.rotated : ''
              }`}
            />
          </button>

          {isBankOpen && (
            <div className={styles.dropdown}>
              {availableBanks.map((bank) => (
                <button
                  key={bank.id}
                  className={`${styles.option} ${
                    bank.id === selectedBank ? styles.selected : ''
                  }`}
                  onClick={() => handleBankChange(bank.id)}
                >
                  <span className={styles.text}>{bank.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
