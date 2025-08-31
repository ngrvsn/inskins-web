'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  PaymentCard,
  PAYMENT_METHODS,
  type PaymentMethodId
} from '../../ui/PaymentCard/PaymentCard'
import { Button } from '../../ui/Button/Button'
import { ISkinItem } from '@/types/skin'
import { getDeclination } from '@/utils/getDeclination'
import { EPaymentMethod } from '@/api/users/types'
import Link from 'next/link'
import { PaymentForm } from './PaymentForm'
import styles from './PaymentSidebar.module.scss'
import dropdownIcon from '@/assets/icons/white-dropdown.svg'
import greenWarnIcon from '@/assets/icons/small-green-warn.svg'
import whiteInfoIcon from '@/assets/icons/white-small-info.svg'

interface IPaymentFormData {
  country: string
  bank: string
  cardNumber: string
  telegram: string
  email?: string
}

interface IPaymentSidebarProps {
  selectedSkins: ISkinItem[]
  selectedPaymentMethod?: PaymentMethodId
  onPaymentMethodChange?: (method: PaymentMethodId) => void
  onProceed?: () => void
  currency?: string
}

// Мок данные валют
const currencies = [
  { code: 'RUB', name: 'Рубль', symbol: '₽' },
  { code: 'USD', name: 'Доллар', symbol: '$' },
  { code: 'EUR', name: 'Евро', symbol: '€' }
]

export const PaymentSidebar = ({
  selectedSkins = [],
  selectedPaymentMethod = EPaymentMethod.SBP,
  onPaymentMethodChange,
  onProceed,
  currency = 'RUB'
}: IPaymentSidebarProps) => {
  const [selectedMethod, setSelectedMethod] = useState(selectedPaymentMethod)
  const [selectedCurrency, setSelectedCurrency] = useState(currency)
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false)
  const [mode, setMode] = useState<'selection' | 'form'>('selection')

  const currentCurrency =
    currencies.find((c) => c.code === selectedCurrency) || currencies[0]

  // Подсчет общей суммы
  const totalAmount = selectedSkins.reduce((sum, skin) => sum + skin.price, 0)
  const selectedCount = selectedSkins.length

  const handlePaymentMethodChange = (method: PaymentMethodId) => {
    setSelectedMethod(method)
    onPaymentMethodChange?.(method)
  }

  const handleCurrencyChange = (currencyCode: string) => {
    setSelectedCurrency(currencyCode)
    setIsCurrencyOpen(false)
  }

  const handleProceed = () => {
    setMode('form')
    onProceed?.()
  }

  const handleBackToSelection = () => {
    setMode('selection')
  }

  const handleFormSubmit = (data: IPaymentFormData) => {
    console.log('Форма отправлена:', data)
    // Здесь будет логика отправки данных на сервер
  }

  return (
    <div className={styles.sidebar}>
      {/* Заголовок с информацией о выбранных скинах - всегда отображается */}
      <div className={styles.selectionHeader}>
        <div className={styles.selectionInfo}>
          <span className={styles.selectionText}>
            Выбрано <span className={styles.count}> {selectedCount}</span>
            <span>
              {' '}
              {getDeclination(selectedCount, [
                'предметов',
                'предмет',
                'предмета'
              ])}
            </span>{' '}
            на сумму
          </span>
        </div>
        <div className={styles.divider}></div>
        {/* Селектор валюты */}
        <div className={styles.currencySelector}>
          <button
            className={`${styles.currencyButton} ${
              isCurrencyOpen ? styles.open : ''
            }`}
            onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
          >
            <div className={styles.currencyIcon}>{currentCurrency.symbol}</div>
            <div className={styles.currencyInfo}>
              <span className={styles.currencyName}>
                {currentCurrency.name}
              </span>
              <span className={styles.currencyCode}>
                {currentCurrency.code}
              </span>
            </div>
            <Image
              src={dropdownIcon}
              alt='dropdown'
              width={12}
              height={12}
              className={`${styles.dropdownIcon} ${
                isCurrencyOpen ? styles.rotated : ''
              }`}
            />
          </button>

          {isCurrencyOpen && (
            <div className={styles.currencyDropdown}>
              {currencies.map((curr) => (
                <button
                  key={curr.code}
                  className={`${styles.currencyOption} ${
                    curr.code === selectedCurrency ? styles.selected : ''
                  }`}
                  onClick={() => handleCurrencyChange(curr.code)}
                >
                  <div className={styles.currencyIcon}>{curr.symbol}</div>
                  <div className={styles.currencyInfo}>
                    <span className={styles.currencyName}>{curr.name}</span>
                    <span className={styles.currencyCode}>{curr.code}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Общая сумма - всегда отображается */}
      <div className={styles.totalSection}>
        <div className={styles.totalAmount}>
          {totalAmount.toLocaleString('ru-RU')} {currentCurrency.symbol}
        </div>
      </div>

      <div className={styles.content}>
        {mode === 'selection' ? (
          <>
            {/* Информация о Steam Trade Protection */}
            <div className={styles.protectionInfo}>
              <Image
                src={greenWarnIcon}
                alt='info'
                width={24}
                height={24}
                className={styles.protectionIcon}
              />
              <div className={styles.protectionTextContainer}>
                <p className={styles.protectionText}>
                  Из-за новых правил{' '}
                  <Link href='#' className={styles.protectionLink}>
                    Steam Trade Protection
                  </Link>
                  , выплата за скины будет произведена через 8 дней (после
                  5.08.2025 14:00)
                </p>
              </div>
            </div>

            {/* Способы оплаты */}
            <div className={styles.paymentSection}>
              <h4 className={styles.sectionTitle}>Выберите способ оплаты:</h4>
              <div className={styles.paymentMethods}>
                {PAYMENT_METHODS.map((methodId) => (
                  <PaymentCard
                    key={methodId}
                    methodId={methodId}
                    isSelected={selectedMethod === methodId}
                    onClick={() => handlePaymentMethodChange(methodId)}
                  />
                ))}
              </div>
            </div>

            {/* К выплате */}
            <div className={styles.payoutSection}>
              <span className={styles.payoutLabel}>К выплате:</span>
              <span className={styles.payoutAmount}>
                {totalAmount.toLocaleString('ru-RU')} {currentCurrency.symbol}
                <Image
                  src={whiteInfoIcon}
                  alt='info'
                  width={16}
                  height={16}
                  className={styles.infoIcon}
                />
              </span>
            </div>

            {/* Кнопка продолжить */}
            <Button
              variant={selectedCount === 0 ? 'disabled' : 'primary'}
              size='large'
              onClick={handleProceed}
              disabled={selectedCount === 0}
              className={styles.proceedButton}
            >
              ПРОДОЛЖИТЬ
            </Button>
          </>
        ) : (
          <PaymentForm
            selectedPaymentMethod={selectedMethod}
            onBack={handleBackToSelection}
            onSubmit={handleFormSubmit}
            totalAmount={totalAmount}
            currency={currentCurrency.symbol}
          />
        )}
      </div>
    </div>
  )
}
