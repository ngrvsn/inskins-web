'use client'

import { useState } from 'react'
import { IUserTransaction, EPaymentMethod } from '@/api/users/types'
import { TransactionDetails } from '../TransactionDetails/TransactionDetails'
import Image from 'next/image'
import dropdownIcon from '@/assets/icons/white-dropdown-arrow.svg'
import styles from './TransactionRow.module.scss'

interface ITransactionRowProps {
  transaction: IUserTransaction
}

export const TransactionRow = ({ transaction }: ITransactionRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // Показываем только продажи скинов
  if (transaction.type !== 'order_payout') {
    return null
  }

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'order_payout':
        return 'Продажа скинов'
      default:
        return type
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Завершено'
      case 'cancelled':
        return 'Отменено'
      case 'pending':
        return 'В обработке'
      case 'failed':
        return 'Ошибка'
      default:
        return status
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'completed':
        return styles.statusCompleted
      case 'cancelled':
        return styles.statusCancelled
      case 'pending':
        return styles.statusPending
      default:
        return ''
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const formatAmount = (amount: number, currency: string) => {
    return `${amount.toFixed(2)} ${currency}`
  }

  const getPaymentMethodLabel = (method?: EPaymentMethod | string) => {
    if (!method) return 'Не указан'

    switch (method) {
      case EPaymentMethod.CARD:
        return 'Банковская карта'
      case EPaymentMethod.SBP:
        return 'СБП'
      case EPaymentMethod.USDT_TRC20:
        return 'USDT TRC20'
      case EPaymentMethod.BNB:
        return 'BNB'
      case EPaymentMethod.USDC_TRC20:
        return 'USDC TRC20'
      case EPaymentMethod.BTC:
        return 'Bitcoin'
      case EPaymentMethod.ETH:
        return 'Ethereum'
      case EPaymentMethod.SOLANA:
        return 'Solana'
      case EPaymentMethod.TON:
        return 'TON'
      case EPaymentMethod.USDT_ERC20:
        return 'USDT ERC20'
      case EPaymentMethod.INSKINS:
        return 'INSKINS'
      default:
        return method
    }
  }

  const getDestination = (type: string, method?: string) => {
    switch (type) {
      case 'order_payout':
        return getPaymentMethodLabel(method)
      case 'deposit':
        return 'Баланс INSKINS'
      case 'withdrawal':
        return getPaymentMethodLabel(method)
      case 'purchase':
        return 'Инвентарь Steam'
      default:
        return 'Не указано'
    }
  }

  const getBalanceChange = (type: string, amount: number) => {
    const isPositive = [
      'deposit',
      'order_payout',
      'referral_reward',
      'promo_bonus'
    ].includes(type)
    const change = isPositive ? amount : -amount
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(2)}`
  }

  return (
    <>
      <div className={styles.transactionRow} onClick={handleToggle}>
        <div className={styles.cell}>
          <div className={styles.typeWithExpand}>
            <div className={styles.typeInfo}>
              <div className={styles.type}>
                {getTypeLabel(transaction.type)}
                <Image
                  src={dropdownIcon}
                  alt='dropdown'
                  width={12}
                  height={12}
                  className={`${styles.expandIcon} ${
                    isExpanded ? styles.expanded : ''
                  }`}
                />
              </div>
              <div className={styles.date}>
                {formatDate(transaction.createdAt)}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.cell}>
          <span className={styles.transactionId}>{transaction.id}</span>
        </div>
        <div className={styles.cell}>
          <div
            className={`${styles.statusTag} ${getStatusClass(
              transaction.status
            )}`}
          >
            <span className={styles.statusText}>
              {getStatusLabel(transaction.status)}
            </span>
          </div>
        </div>
        <div className={styles.cell}>
          <span className={styles.amount}>
            {formatAmount(transaction.amount, transaction.currency)}
          </span>
        </div>
        <div className={styles.cell}>
          <span className={styles.paymentSystem}>
            {getPaymentMethodLabel(transaction.method)}
          </span>
        </div>
        <div className={styles.cell}>
          <span className={styles.destination}>
            {getDestination(transaction.type, transaction.method)}
          </span>
        </div>
        <div className={styles.cell}>
          <span
            className={`${styles.balanceChange} ${
              [
                'deposit',
                'order_payout',
                'referral_reward',
                'promo_bonus'
              ].includes(transaction.type)
                ? styles.positive
                : styles.negative
            }`}
          >
            {getBalanceChange(transaction.type, transaction.amount)}{' '}
            {transaction.currency}
          </span>
        </div>
      </div>

      {isExpanded && <TransactionDetails transaction={transaction} />}
    </>
  )
}
