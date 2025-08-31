'use client'

import Image from 'next/image'
import { IUserTransaction } from '@/api/users/types'
import mockCard from '@/assets/images/mockCard.png'
import styles from './TransactionDetails.module.scss'

interface ITransactionDetailsProps {
  transaction: IUserTransaction
}

export const TransactionDetails = ({
  transaction
}: ITransactionDetailsProps) => {
  // Показываем детали только для продажи скинов
  if (transaction.type !== 'order_payout') {
    return null
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Обмен отменен, таймаут'
      case 'cancelled':
        return 'Обмен отменен, таймаут'
      case 'pending':
        return 'Транзакция находится в обработке'
      default:
        return 'Обмен отменен, таймаут'
    }
  }

  return (
    <div className={styles.transactionDetails}>
      {/* Статус в строчку */}
      <div className={styles.status}>
        Статус: • {getStatusText(transaction.status)}
      </div>

      {/* Заголовки */}
      <div className={styles.headers}>
        <div className={styles.headerItem}>НАЗВАНИЕ СКИНА</div>
        <div className={styles.headerItem}>ИГРА</div>
        <div className={styles.headerItem}>ЦЕНА</div>
      </div>

      {/* Значения */}
      <div className={styles.values}>
        <div className={styles.skinInfo}>
          <Image
            src={mockCard}
            alt="Скин"
            width={58}
            height={44}
            className={styles.skinImage}
          />
          <span className={styles.skinName}>StatTrak™ Desert Eagle | Light Rail (Field-Tested)</span>
        </div>
        <div className={styles.gameValue}>CS:GO</div>
        <div className={styles.priceValue}>185.42 ₽</div>
      </div>
    </div>
  )
}
