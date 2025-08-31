'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Button,
  Input,
  CountryBankSelector,
  FraudWarningModal,
  InfoBanner
} from '../../ui'
import {
  PaymentCard,
  type PaymentMethodId
} from '../../ui/PaymentCard/PaymentCard'
import { getPayoutProtectionText } from '@/utils/calculatePayoutDate'
import Link from 'next/link'
import { type ITransaction } from '@/types/transaction'
import styles from './PaymentForm.module.scss'
import backIcon from '@/assets/icons/white-arrow-left.svg'
import checkSoloGreen from '@/assets/icons/check-solo-green.svg'
import whiteInfoIcon from '@/assets/icons/white-small-info.svg'

interface IPaymentFormData {
  country: string
  bank: string
  cardNumber: string
  telegram: string
  email?: string
}

interface IPaymentFormProps {
  selectedPaymentMethod: PaymentMethodId
  onBack: () => void
  onSubmit: (data: IPaymentFormData) => void
  totalAmount: number
  currency: string
}

export const PaymentForm = ({
  selectedPaymentMethod,
  onBack,
  onSubmit,
  totalAmount,
  currency
}: IPaymentFormProps) => {
  const router = useRouter()

  const [formData, setFormData] = useState<IPaymentFormData>({
    country: 'RU',
    bank: 'sber',
    cardNumber: '',
    telegram: '',
    email: ''
  })

  const [errors, setErrors] = useState<Partial<IPaymentFormData>>({})
  const [isFraudModalOpen, setIsFraudModalOpen] = useState(false)

  // Создание мок транзакции
  const createMockTransaction = (): ITransaction => {
    const transactionId = Math.floor(Math.random() * 90000000) + 10000000 // Генерируем 8-значный ID

    return {
      id: transactionId.toString(),
      status: 'pending-confirmation',
      createdAt: new Date().toISOString(),
      timeLeft: 600, // 10 минут в секундах
      botInfo: {
        level: 42,
        name: 'INSKINS Bot #1',
        avatar: '/bot-avatar.png'
      }
    }
  }

  // Валидация номера карты (16 цифр)
  const validateCardNumber = (cardNumber: string): boolean => {
    const cleanNumber = cardNumber.replace(/\s/g, '')
    return /^\d{16}$/.test(cleanNumber)
  }

  // Валидация Telegram username
  const validateTelegram = (telegram: string): boolean => {
    return /^@[a-zA-Z0-9_]{5,32}$/.test(telegram)
  }

  // Проверка заполненности обязательных полей
  const isFormValid = () => {
    return (
      formData.country &&
      formData.bank &&
      validateCardNumber(formData.cardNumber) &&
      validateTelegram(formData.telegram)
    )
  }

  const handleInputChange = (field: keyof IPaymentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Очищаем ошибку при изменении поля
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleCardNumberChange = (value: string) => {
    // Форматируем номер карты с пробелами
    const cleanValue = value.replace(/\s/g, '')
    const formattedValue = cleanValue.replace(/(\d{4})(?=\d)/g, '$1 ')
    handleInputChange('cardNumber', formattedValue)
  }

  const handleTelegramChange = (value: string) => {
    // Автоматически добавляем @ если его нет
    let formattedValue = value
    if (value && !value.startsWith('@')) {
      formattedValue = '@' + value
    }
    handleInputChange('telegram', formattedValue)
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<IPaymentFormData> = {}

    if (!validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = 'Введите корректный номер карты (16 цифр)'
    }

    if (!validateTelegram(formData.telegram)) {
      newErrors.telegram = 'Введите корректный Telegram username (@username)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validateForm() && isFormValid()) {
      setIsFraudModalOpen(true)
    }
  }

  const handleFraudModalConfirm = () => {
    setIsFraudModalOpen(false)

    // Создаем мок транзакцию
    const transaction = createMockTransaction()

    // Вызываем оригинальный обработчик (для совместимости)
    onSubmit(formData)

    // Перенаправляем на страницу отслеживания транзакции
    router.push(`/sell/transaction/${transaction.id}`)
  }

  return (
    <div className={styles.form}>
      {/* Кнопка возврата */}
      <button className={styles.backButton} onClick={onBack}>
        <Image src={backIcon} alt='back' width={16} height={16} />
        <span className={styles.backText}>Вернуться к способам оплаты</span>
      </button>

      {/* Информация о Steam Trade Protection */}
      <InfoBanner
        variant='warning'
        grayBackground
        className={styles.protectionBanner}
      >
        Из-за новых правил{' '}
        <Link href='#' className={styles.protectionLink}>
          Steam Trade Protection
        </Link>
        , {getPayoutProtectionText()}
      </InfoBanner>

      {/* Выбранный способ оплаты */}
      <div className={styles.selectedMethod}>
        <div className={styles.methodCard}>
          <PaymentCard
            methodId={selectedPaymentMethod}
            isSelected={false}
            onClick={() => {}}
          />
          <Image
            src={checkSoloGreen}
            alt='selected'
            width={20}
            height={25}
            className={styles.checkmark}
          />
        </div>
      </div>

      {/* Форма ввода данных */}
      <div className={styles.formFields}>
        {/* Селектор страны и банка */}
        <div className={styles.fieldGroup}>
          <CountryBankSelector
            selectedCountry={formData.country}
            selectedBank={formData.bank}
            onCountryChange={(country) => handleInputChange('country', country)}
            onBankChange={(bank) => handleInputChange('bank', bank)}
          />
        </div>

        {/* Номер карты */}
        <div className={styles.fieldGroup}>
          <Input
            placeholder='Введите номер карты'
            value={formData.cardNumber}
            onChange={(e) => handleCardNumberChange(e.target.value)}
            error={errors.cardNumber}
            maxLength={19} // 16 цифр + 3 пробела
          />
        </div>

        {/* Telegram */}
        <div className={styles.fieldGroup}>
          <Input
            placeholder='@username'
            value={formData.telegram}
            onChange={(e) => handleTelegramChange(e.target.value)}
            error={errors.telegram}
          />
        </div>

        {/* Email (необязательно) */}
        <div className={styles.fieldGroup}>
          <Input
            placeholder='E-mail (Необязательно)'
            type='email'
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </div>
      </div>

      {/* К выплате */}
      <div className={styles.payoutSection}>
        <span className={styles.payoutLabel}>К выплате:</span>
        <span className={styles.payoutAmount}>
          {totalAmount.toLocaleString('ru-RU')} {currency}
          <Image
            src={whiteInfoIcon}
            alt='info'
            width={16}
            height={16}
            className={styles.infoIcon}
          />
        </span>
      </div>

      {/* Предупреждение о политике конфиденциальности */}
      <div className={styles.privacyWarning}>
        <p className={styles.privacyText}>
          Нажав кнопку ниже, Вы соглашаетесь с{' '}
          <Link href='#' className={styles.privacyLink}>
            политикой конфиденциальности
          </Link>{' '}
          и{' '}
          <Link href='#' className={styles.privacyLink}>
            правилами использования
          </Link>{' '}
        </p>
      </div>

      {/* Кнопка получить деньги */}
      <Button
        variant={isFormValid() ? 'primary' : 'disabled'}
        size='large'
        onClick={handleSubmit}
        disabled={!isFormValid()}
        className={styles.submitButton}
      >
        ПОЛУЧИТЬ ДЕНЬГИ
      </Button>

      {/* Модальное окно предупреждения о мошенничестве */}
      <FraudWarningModal
        isOpen={isFraudModalOpen}
        onClose={() => setIsFraudModalOpen(false)}
        onConfirm={handleFraudModalConfirm}
      />
    </div>
  )
}
