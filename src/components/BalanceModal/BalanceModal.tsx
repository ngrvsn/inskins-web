'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { Overlay } from '../ui/Overlay/Overlay'
import { PaymentCard, PAYMENT_METHODS } from '../ui/PaymentCard/PaymentCard'
import { Button } from '../ui/Button/Button'
import { InfoBanner } from '../ui/InfoBanner/InfoBanner'
import styles from './BalanceModal.module.scss'
import infoIcon from '@/assets/icons/white-small-info.svg'
import greenInfoIcon from '@/assets/icons/green-small-info.svg'
import dropdownIcon from '@/assets/icons/icon-dropdown.svg'
import cancelIcon from '@/assets/icons/cancel-cross.svg'

interface IBalanceModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'deposit' | 'withdraw'
}

// Убираем константу, используем PAYMENT_METHODS из PaymentCard

interface IFormData {
  amount: string
  paymentData: string
}

// Мок данные баланса
const mockBalance = {
  total: 0.0,
  available: 0.0,
  pending: 0.0
}

export const BalanceModal = ({ isOpen, onClose, type }: IBalanceModalProps) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('sbp')

  const isDeposit = type === 'deposit'
  const title = isDeposit ? 'Пополнить баланс' : 'Вывод с баланса'
  const buttonText = isDeposit ? 'ОПЛАТИТЬ' : 'ПОЛУЧИТЬ'
  const inputLabel = isDeposit
    ? 'Введите сумму пополнения:'
    : 'Введите платежные данные:'
  const inputPlaceholder = isDeposit ? '' : 'Кошелек'
  const minDeposit = 10

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset
  } = useForm<IFormData>({
    defaultValues: {
      amount: '',
      paymentData: ''
    }
  })

  const watchedAmount = watch('amount')
  const amountValue = parseFloat(watchedAmount) || 0

  const onSubmit = (data: IFormData) => {
    console.log('Submit:', { type, selectedMethod, ...data })
    // Логика отправки формы
  }

  const handleClose = () => {
    reset()
    setSelectedMethod('sbp')
    onClose()
  }

  return (
    <Overlay isOpen={isOpen} onClose={handleClose}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            <Image src={cancelIcon} alt='cancel' width={24} height={24} />
          </button>
        </div>

        <form className={styles.content} onSubmit={handleSubmit(onSubmit)}>
          {isDeposit && (
            <div className={styles.amountSection}>
              <label className={styles.label}>{inputLabel}</label>
              <div
                className={`${styles.amountInput} ${
                  errors.amount ? styles.error : ''
                }`}
              >
                <span className={styles.currency}>₽</span>
                <input
                  type='number'
                  step='0.01'
                  {...register('amount', {
                    required: 'Введите сумму',
                    min: {
                      value: minDeposit,
                      message: `Минимальная сумма пополнения: ${minDeposit} ₽`
                    },
                    validate: (value) => {
                      const num = parseFloat(value)
                      if (isNaN(num)) return 'Введите корректную сумму'
                      return true
                    }
                  })}
                  className={styles.input}
                  placeholder='0'
                />
                <div className={styles.currencySelector}>
                  <div className={styles.currencyIcon}>₽</div>
                  <div className={styles.currencyInfo}>
                    <span className={styles.currencyName}>Рубль</span>
                    <span className={styles.currencyCode}>RUB</span>
                  </div>
                  <Image
                    src={dropdownIcon}
                    alt='dropdown'
                    width={12}
                    height={12}
                  />
                </div>
              </div>
              <div className={styles.minAmount}>
                Минимальная сумма пополнения: {minDeposit} ₽
              </div>
              {errors.amount && (
                <div className={styles.errorMessage}>
                  {errors.amount.message}
                </div>
              )}
            </div>
          )}

          {!isDeposit && (
            <div className={styles.balanceInfo}>
              <div className={styles.withdrawCurrencySelector}>
                <span className={styles.currency}>₽</span>
                <div className={styles.currencySelector}>
                  <div className={styles.currencyIcon}>₽</div>
                  <div className={styles.currencyInfo}>
                    <span className={styles.currencyName}>Рубль</span>
                    <span className={styles.currencyCode}>RUB</span>
                  </div>
                  <Image
                    src={dropdownIcon}
                    alt='dropdown'
                    width={12}
                    height={12}
                  />
                </div>
              </div>

              <div className={styles.balanceDetails}>
                <div className={styles.balanceItem}>
                  Итоговый баланс: {mockBalance.total.toFixed(2)} ₽
                </div>
                <div className={styles.balanceItem}>
                  Доступный баланс для вывода:{' '}
                  {mockBalance.available.toFixed(2)} ₽
                  <Image src={infoIcon} alt='info' width={16} height={16} />
                </div>
                <div
                  className={styles.balanceItem}
                  style={{ color: '#49AA19' }}
                >
                  В ожидании Steam Trade Protection:{' '}
                  {mockBalance.pending.toFixed(2)} ₽
                  <Image
                    src={greenInfoIcon}
                    alt='info'
                    width={16}
                    height={16}
                  />
                </div>
              </div>
            </div>
          )}

          <div className={styles.paymentMethods}>
            {PAYMENT_METHODS.map((methodId) => (
              <PaymentCard
                key={methodId}
                methodId={methodId}
                isSelected={selectedMethod === methodId}
                onClick={() => setSelectedMethod(methodId)}
              />
            ))}
          </div>

          {!isDeposit && (
            <div className={styles.paymentDataSection}>
              <label className={styles.label}>{inputLabel}</label>
              <input
                type='text'
                {...register('paymentData', {
                  required: 'Введите платежные данные'
                })}
                className={`${styles.paymentInput} ${
                  errors.paymentData ? styles.error : ''
                }`}
                placeholder={inputPlaceholder}
              />
              {errors.paymentData && (
                <div className={styles.errorMessage}>
                  {errors.paymentData.message}
                </div>
              )}
            </div>
          )}

          {isDeposit && (
            <InfoBanner
              variant='warning'
              grayBackground
              className={styles.warningBanner}
            >
              Обратите внимание, что средства полученные с депозитов можно
              только потратить на покупку скинов. Вывести или перевести на
              другой аккаунт - невозможно.
            </InfoBanner>
          )}

          <Button
            type='submit'
            variant={
              isDeposit && amountValue < minDeposit ? 'disabled' : 'primary'
            }
            size='large'
            disabled={isDeposit && amountValue < minDeposit}
            className={styles.submitButton}
          >
            {buttonText} {isDeposit ? (amountValue || 0).toFixed(2) : '0.00'} ₽
          </Button>

          {isDeposit && (
            <div className={styles.support}>
              Если у вас возникли сомнения или вопросы, свяжитесь с поддержкой
              через{' '}
              <a href='#' className={styles.telegramLink}>
                Telegram
              </a>
            </div>
          )}
        </form>
      </div>
    </Overlay>
  )
}
