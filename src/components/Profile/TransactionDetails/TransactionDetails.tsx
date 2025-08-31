'use client'

import Image from 'next/image'
import { IOrder, TOrderStatus } from '@/api/orders/types'
import mockCard from '@/assets/images/mockCard.png'
import styles from './TransactionDetails.module.scss'

interface ITransactionDetailsProps {
  order: IOrder
}

export const TransactionDetails = ({ order }: ITransactionDetailsProps) => {
  const getStatusText = (status: TOrderStatus) => {
    switch (status) {
      case 'paid':
        return 'Заказ успешно оплачен'
      case 'declined':
        return 'Заказ отклонен'
      case 'withdrawn':
        return 'Заказ отозван пользователем'
      case 'stopped':
        return 'Заказ остановлен'
      case 'created':
        return 'Заказ создан, ожидает получения предметов'
      case 'received':
        return 'Предметы получены, ожидает оплаты'
      default:
        return 'Неизвестный статус заказа'
    }
  }

  const getStatusReason = () => {
    if (order.statusChangeReason) {
      return ` • ${order.statusChangeReason}`
    }
    return ''
  }

  return (
    <div className={styles.transactionDetails}>
      {/* Статус в строчку */}
      <div className={styles.status}>
        Статус: • {getStatusText(order.status)}
        {getStatusReason()}
      </div>

      {/* Заголовки */}
      <div className={styles.headers}>
        <div className={styles.headerItem}>НАЗВАНИЕ ПРЕДМЕТА</div>
        <div className={styles.headerItem}>ИГРА</div>
        <div className={styles.headerItem}>ОБЩАЯ СУММА</div>
      </div>

      {/* Значения - показываем все предметы из заказа */}
      {order.itemNames.map((itemName, index) => (
        <div key={index} className={styles.values}>
          <div className={styles.skinInfo}>
            <Image
              src={mockCard}
              alt='Предмет'
              width={58}
              height={44}
              className={styles.skinImage}
            />
            <span className={styles.skinName}>{itemName}</span>
          </div>
          <div className={styles.gameValue}>CS:GO</div>
          {/* Показываем общую сумму только для первого предмета */}
          <div className={styles.priceValue}>
            {index === 0 ? `${order.payoutAmount.toFixed(2)} ₽` : ''}
          </div>
        </div>
      ))}
    </div>
  )
}
