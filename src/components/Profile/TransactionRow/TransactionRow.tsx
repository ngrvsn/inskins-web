'use client'

import { useState } from 'react'
import { IProfileTransaction } from '@/types/transaction'
import { TransactionDetails } from '../TransactionDetails'
import styles from './TransactionRow.module.scss'

interface ITransactionRowProps {
  transaction: IProfileTransaction
}

export const TransactionRow = ({ transaction }: ITransactionRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'sale':
        return 'Продажа'
      case 'purchase':
        return 'Покупка'
      case 'deposit':
        return 'Пополнение'
      case 'withdrawal':
        return 'Вывод'
      default:
        return type
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Оплачено'
      case 'cancelled':
        return 'Отменено'
      case 'pending':
        return 'В обработке'
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

  const formatDate = (date: Date) => {
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

  const formatBalanceChange = (change: number, currency: string) => {
    const sign = change >= 0 ? '+' : ''
    return `${sign}${change.toFixed(2)} ${currency}`
  }

  return (
    <>
      <div className={styles.transactionRow} onClick={handleToggle}>
        <div className={styles.cell}>
          <div className={styles.typeWithExpand}>
            <div className={styles.typeInfo}>
              <div className={styles.type}>
                {getTypeLabel(transaction.type)}
              </div>
              <div className={styles.date}>{formatDate(transaction.date)}</div>
            </div>
            <div className={styles.expandButton}>
              <svg
                className={`${styles.expandIcon} ${
                  isExpanded ? styles.expanded : ''
                }`}
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
              >
                <path
                  d='M4 6L8 10L12 6'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          </div>
        </div>
        <div className={styles.cell}>
          <span className={styles.transactionId}>#{transaction.id}</span>
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
            {transaction.paymentSystem}
          </span>
        </div>
        <div className={styles.cell}>
          <span className={styles.destination}>{transaction.destination}</span>
        </div>
        <div className={styles.cell}>
          <span
            className={`${styles.balanceChange} ${
              transaction.balanceChange >= 0 ? styles.positive : styles.negative
            }`}
          >
            {formatBalanceChange(
              transaction.balanceChange,
              transaction.currency
            )}
          </span>
        </div>
      </div>

      {isExpanded && <TransactionDetails transaction={transaction} />}
    </>
  )
}
