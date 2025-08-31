'use client'

import { useState } from 'react'
import { IOrder, TOrderStatus, TOrderPaymentMethod } from '@/api/orders/types'
import { TransactionDetails } from '../TransactionDetails/TransactionDetails'
import Image from 'next/image'
import dropdownIcon from '@/assets/icons/white-dropdown-arrow.svg'
import styles from './TransactionRow.module.scss'

interface ITransactionRowProps {
  order: IOrder
}

export const TransactionRow = ({ order }: ITransactionRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleToggle = () => {
    setIsExpanded(!isExpanded)
  }

  const getTypeLabel = () => {
    return 'Продажа скинов'
  }

  const getStatusLabel = (status: TOrderStatus) => {
    switch (status) {
      case 'paid':
        return 'Завершено'
      case 'declined':
      case 'withdrawn':
      case 'stopped':
        return 'Отменено'
      case 'created':
      case 'received':
        return 'В обработке'
      default:
        return status
    }
  }

  const getStatusClass = (status: TOrderStatus) => {
    switch (status) {
      case 'paid':
        return styles.statusCompleted
      case 'declined':
      case 'withdrawn':
      case 'stopped':
        return styles.statusCancelled
      case 'created':
      case 'received':
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

  const getPaymentMethodLabel = (method: TOrderPaymentMethod) => {
    switch (method) {
      case 'card_ru':
      case 'card_visa':
      case 'card_mastercard':
        return 'Банковская карта'
      case 'sbp':
        return 'СБП'
      case 'usdt_trc20':
        return 'USDT TRC20'
      case 'usdt_erc20':
        return 'USDT ERC20'
      case 'usdt_bsc':
        return 'USDT BSC'
      case 'bnb':
        return 'BNB'
      case 'btc':
        return 'Bitcoin'
      case 'eth':
        return 'Ethereum'
      case 'sol':
        return 'Solana'
      case 'ton':
        return 'TON'
      case 'sepa':
        return 'SEPA'
      case 'paypal':
        return 'PayPal'
      case 'qiwi':
        return 'Qiwi'
      case 'yandex_money':
        return 'ЮMoney'
      default:
        return method
    }
  }

  const getDestination = (method: TOrderPaymentMethod) => {
    return getPaymentMethodLabel(method)
  }

  const getBalanceChange = (amount: number, status: TOrderStatus) => {
    // Для заказов продажи скинов - это всегда положительное изменение баланса (если заказ оплачен)
    const change = status === 'paid' ? amount : 0
    const sign = change > 0 ? '+' : ''
    return `${sign}${change.toFixed(2)}`
  }

  return (
    <>
      <div className={styles.transactionRow} onClick={handleToggle}>
        <div className={styles.cell}>
          <div className={styles.typeWithExpand}>
            <div className={styles.typeInfo}>
              <div className={styles.type}>
                {getTypeLabel()}
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
              <div className={styles.date}>{formatDate(order.createdAt)}</div>
            </div>
          </div>
        </div>
        <div className={styles.cell}>
          <span className={styles.transactionId}>#{order.orderNumber}</span>
        </div>
        <div className={styles.cell}>
          <div
            className={`${styles.statusTag} ${getStatusClass(order.status)}`}
          >
            <span className={styles.statusText}>
              {getStatusLabel(order.status)}
            </span>
          </div>
        </div>
        <div className={styles.cell}>
          <span className={styles.amount}>
            {formatAmount(order.payoutAmount, 'RUB')}
          </span>
        </div>
        <div className={styles.cell}>
          <span className={styles.paymentSystem}>
            {getPaymentMethodLabel(order.paymentMethod)}
          </span>
        </div>
        <div className={styles.cell}>
          <span className={styles.destination}>
            {getDestination(order.paymentMethod)}
          </span>
        </div>
        <div className={styles.cell}>
          <span
            className={`${styles.balanceChange} ${
              order.status === 'paid' ? styles.positive : styles.neutral
            }`}
          >
            {getBalanceChange(order.payoutAmount, order.status)} RUB
          </span>
        </div>
      </div>

      {isExpanded && <TransactionDetails order={order} />}
    </>
  )
}
